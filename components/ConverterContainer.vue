<script setup lang="ts">
import { formatRepository } from '~/modules/converter/repositories/format'

const { data: formatsData } = await useAsyncData(
  'file-formats',
  async () => await formatRepository.list(),
  { server: true }
)
const formData = ref<FormData | null>(null)
const { data, status, error, execute } = await useAsyncData(
  'img-convertion',
  async () => await formatRepository.convert(formData.value!),
  {
    server: false,
    immediate: false,
  }
)

const convertedImg = computed(() => {
  if (!data.value) return []

  const name = [
    formData.value?.get('source')?.name.split('.').slice(0, -1),
    formData.value?.get('format'),
  ].join('.')

  return [
    {
      image: data.value,
      name,
    },
  ]
})

async function handleFormSubmit(data: FormData) {
  formData.value = data
  execute()
}

</script>

<template>
  <div class="lg:w-[450px]">
    <UCard>
      <template #header>
        <h1 class="text-lg font-semibold">Convert any image format</h1>
      </template>

      <ConverterForm :onSubmit="handleFormSubmit" :formats="formatsData" :loading="status === 'pending'" />

      <!-- <template #footer>
                <Placeholder class="h-8" />
            </template> -->
    </UCard>

    <div class="mt-5 flex justify-center">
        <ConvertedImagesList :images="convertedImg" />
        <SkeletonsConvertedImageSkeleton v-if="status === 'pending'" />
    </div>
    <div class="w-full text-center">
        <small v-if="error && status !== 'pending'" class="text-red-500">Unexpected convertion error</small>
    </div>
  </div>
</template>
