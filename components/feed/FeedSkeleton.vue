<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')
</script>

<template>
  <div class="w-full animate-pulse p-3">
    <div>
      <div class="h-6 flex items-center gap-1.5">
        <span class="h-5 flex items-center">
          <div class="h-4 w-10 rounded-md bg-zinc-700" />
        </span>

        <div class="i-tabler-slash h-4 w-4 flex-none bg-zinc-700" />

        <span class="h-5 flex items-center pr-1.5">
          <div class="h-4 w-20 rounded-md bg-zinc-700" />
        </span>
      </div>

      <div class="h-6 flex items-center md:h-7">
        <div class="h-4 max-w-80 w-full rounded-md bg-zinc-700 md:h-5 md:max-w-none" />
      </div>

      <div class="h-6 flex items-center gap-1.5">
        <span class="h-5 flex items-center">
          <div class="h-4 w-48 rounded-md bg-zinc-700" />
        </span>

        <template v-if="mdAndLarger">
          <div class="i-tabler-slash h-4 w-4 flex-none bg-zinc-700" />

          <span class="h-5 flex items-center gap-3">
            <div class="h-4 w-24 rounded-md bg-zinc-700" />
            <div class="h-4 w-20 rounded-md bg-zinc-700" />
          </span>
        </template>
      </div>
    </div>

    <div v-if="!mdAndLarger" class="flex justify-end gap-1.5">
      <div class="p-1.5 px-3">
        <div class="h-5 w-10 rounded-md bg-zinc-700" />
      </div>

      <div class="p-1.5">
        <div class="h-5 w-5 rounded-md bg-zinc-700" />
      </div>
    </div>
  </div>
</template>
