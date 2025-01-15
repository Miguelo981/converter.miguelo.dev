<script setup lang="ts">
import { PropType } from 'vue';

type ConvertedImage = {
  name: string
  image: Blob
}
const props = defineProps({
  images: {
    type: Array as PropType<ConvertedImage[]>,
    default: () => [],
  },
  className: String,
})
</script>

<template>
  <ul :class="[className]">
    <li v-for="image in images" :key="image.name">
      <ConvertedImageCard :image="image.image" :name="image.name" />
    </li>
  </ul>
</template>