<script setup lang="ts">
import { PropType } from 'vue'
import { useDropzone } from 'vue3-dropzone'

const props = defineProps({
  onSubmit: {
    type: Function as PropType<(data: FormData) => void>,
    required: true,
  },
  formats: {
    type: Array as PropType<string[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const onDrop = (acceptFiles, rejectReasons) => {
  console.log(acceptFiles)
  console.log(rejectReasons)

  files.value = acceptFiles
}

const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
const format = ref(props.formats.at(0))
const ctaText = computed(() => (props.loading ? 'Loading...' : 'Upload'))

const files = ref<File[]>([])

const handleSubmit = (event: Event) => {
  //const formData = new FormData(event.target as HTMLFormElement)
  const formData = new FormData()

  files.value.forEach((file) => formData.append('files', file))
  formData.append('format', format.value || '')

  // Trigger the parent's submit handler
  props.onSubmit(formData)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-5">
    <UFormGroup label="Source file" name="source">
      <!-- <UInput type="file" name="source" required /> -->
      <div v-bind="getRootProps()" class="cursor-pointer">
        <input v-bind="getInputProps()" name="source" />
        <div :class="['p-5 border border-gray-700 rounded-lg grid flex-1 text-center leading-tight', isDragActive ? 'border-gray-600 bg-gray-800 border-dashed' : '']">
          <p v-if="files.length" class="truncate">{{ files.at(0)?.name }}</p>
          <p v-else-if="isDragActive">Drop the files here ...</p>
          <p v-else>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
    </UFormGroup>
    <fieldset class="flex gap-3 items-end">
      <UFormGroup label="Convert to" name="format" class="w-full">
        <USelect name="format" :options="formats" v-model="format"></USelect>
      </UFormGroup>
      <UButton
        type="submit"
        class="w-40 block text-center h-8"
        :disabled="loading"
        >{{ ctaText }}</UButton
      >
    </fieldset>
  </form>
</template>
