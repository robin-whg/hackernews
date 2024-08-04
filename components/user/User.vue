<script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{ user: User }>()
const { user } = toRefs(props)
</script>

<template>
  <div class="p-4 flex flex-col gap-4">
    <div
      class="flex flex-col gap-2"
    >
      <div class="h-6 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
        <UBadge variant="soft" size="xs" class="flex gap-1.5" color="pink">
          <div class="h-1.5 w-1.5 rounded-full bg-pink-500 dark:bg-pink-400" />
          User
        </UBadge>

        <p>{{ user.karma }} Karma</p>
      </div>

      <p class="line-clamp-2 md:text-lg font-semibold">
        {{ user.id }}
      </p>

      <!-- submitted -->

      <div class="h-6 flex items-center text-sm text-gray-700 dark:text-gray-200 gap-1.5 justify-between">
        <span class="truncate pr-1.5">
          Joined {{ timeAgo(user.created) }} ago
        </span>
      </div>
    </div>

    <div v-if="user.about" v-html="user.about" />
  </div>
</template>
