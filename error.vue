<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

useHead({
  bodyAttrs: {
    class: 'bg-white dark:bg-gray-900 text-black dark:text-white font-sans',
  },
})

const { error } = toRefs(props)
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col gap-4 mx-auto text-center items-center my-4">
      <div v-if="error">
        <h1 v-if="props.error" class="text-lg">
          {{ error.statusCode }}
        </h1>
        <p class="text-sm text-gray-700 dark:text-gray-200">
          {{ error.statusMessage }}
        </p>
      </div>
      <UButton color="white" to="/" trailing-icon="i-tabler-arrow-right">
        Go back home
      </UButton>
    </div>
  </NuxtLayout>
</template>
