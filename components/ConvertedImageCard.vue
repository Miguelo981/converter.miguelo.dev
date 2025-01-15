<script setup lang="ts">
const props = defineProps({
  image: { type: Blob, required: true },
  name: { type: String, required: true },
  className: String,
})

const source = computed(() => URL.createObjectURL(props.image))
</script>

<template>
  <a :href="source" :download="name" class="relative group">
    <p class="hidden group-hover:flex absolute inset-0 items-center justify-center text-white z-10 font-semibold">Download</p>
    <img
      :class="['h-48 w-auto p-2.5 object-cover group-hover:bg-slate-800/70 rounded-sm group-hover:opacity-50 relative z-0', className]"
      :src="source"
    />
  </a>
</template>