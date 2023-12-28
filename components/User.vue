<script setup lang="ts">
const props = defineProps<{ user: User }>()
const { user } = toRefs(props)

const created = computed(() => new Date(user.value?.created * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <div class="h-7 flex items-center gap-1.5 text-sm text-zinc-400">
        <div class="flex items-center gap-1">
          <div class="h-1.5 w-1.5 rounded-full bg-cyan-600" />
          User
        </div>
      </div>

      <p class="md:text-lg">
        {{ user.id }}
      </p>

      <div class="h-7 flex items-center gap-1.5 text-sm text-zinc-400">
        <span class="truncate">
          {{ created }}
        </span>

        <div class="i-tabler-slash h-4 w-4 flex-none" />

        <span class="truncate">
          {{ user.karma }} karma
        </span>
      </div>
    </div>

    <p class="break-words hyphens-auto prose prose-zinc prose-invert" lang="en" v-html="user.about" />
  </div>
</template>
