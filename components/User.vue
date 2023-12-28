<script setup lang="ts">
const props = defineProps<{ user: User }>()
const { user } = toRefs(props)

const created = computed(() => new Date(user.value?.created * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
</script>

<template>
  <div class="mx-auto max-w-2xl flex flex-col gap-6 container">
    <div class="flex flex-col">
      <h1 class="text-2xl font-semibold md:text-4xl">
        {{ user.id }}
      </h1>
      <div class="flex items-center gap-1.5 text-sm text-zinc-400 md:text-base">
        <span class="truncate">
          created {{ created }}
        </span>

        <div class="py-.5">
          <div class="i-tabler-slash h-4 w-4 flex-none" />
        </div>

        <span class="truncate">
          {{ user.karma }} karma
        </span>
      </div>
    </div>

    <p class="break-words hyphens-auto prose prose-zinc prose-invert" lang="en" v-html="user.about" />
  </div>
</template>
