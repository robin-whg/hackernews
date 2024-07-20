<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')
</script>

<template>
  <div class="w-full animate-pulse p-3 gap-1.5 flex flex-col">
    <div class="h-6 flex items-center gap-1.5">
      <USkeleton class="h-5 w-10" />

      <UIcon name="i-tabler-slash" class="text-gray-300" />

      <USkeleton class="h-5 w-20" />
    </div>

    <div class="h-6 flex items-center md:h-7">
      <USkeleton class="h-4 md:h-5 max-w-80 w-full md:max-w-none" />
    </div>

    <div class="h-6 flex items-center gap-1.5">
      <USkeleton class="h-5 w-48" />

      <template v-if="mdAndLarger">
        <UIcon name="i-tabler-slash" class="text-gray-300" />

        <USkeleton class="h-5 w-24" />
        <USkeleton class="h-5 w-20" />
      </template>
    </div>

    <div v-if="!mdAndLarger" class="flex justify-end gap-1.5">
      <USkeleton class="h-5 w-10 m-1.5 mx-3" />

      <USkeleton class="h-5 w-5 m-1.5" />
    </div>
  </div>
</template>
