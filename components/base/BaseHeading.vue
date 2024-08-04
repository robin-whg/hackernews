<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import type { FeedType, Item, User } from '~/types'

const props = defineProps<{ type: 'feed' | 'item' | 'user', item?: Item, user?: User }>()
const { type, item, user } = toRefs(props)

const route = useRoute()
const router = useRouter()

const feedType: FeedType | undefined = route?.params?.feed ? route.params.feed.toString() as FeedType : undefined
const selected = ref<FeedType>(feedType ?? 'top')
const options = [...FEED_TYPES]
const selectIconColor = computed(() => {
  switch (feedType) {
    case 'ask':
      return 'blue'
    case 'show':
      return 'green'
    case 'job':
      return 'purple'
    case 'saved':
      return 'yellow'
    default:
      return 'orange'
  }
})
watch(selected, (value) => {
  router.push(value)
})

function goBack() {
  router.back()
  router.push('/')
}

const { y } = useWindowScroll()
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const openItemsInNewTab = useStorage('open-items-in-new-tab', true)
const openCommentsInNewTab = useStorage('open-comments-in-new-tab', false)
</script>

<template>
  <div class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 flex justify-between gap-1.5">
    <div v-if="type === 'feed'" class="flex items-center gap-1.5">
      <USelectMenu v-if="type === 'feed'" v-model="selected" :options class="w-24" :ui-menu="{ option: { selectedIcon: { base: `h-5 w-5 text-${selectIconColor}-500 dark:text-${selectIconColor}-400 flex-shrink-0` } } }" />
    </div>

    <div v-else class="flex items-center gap-1.5 overflow-hidden">
      <UButton icon="i-tabler-arrow-left" variant="ghost" color="gray" @click="goBack()" />

      <p v-if="y > 48" class="truncate md:text-lg font-semibold">
        {{ item?.title ?? user?.id }}
      </p>
    </div>

    <div class="flex gap-1.5">
      <UButton v-if="y > 48" icon="i-tabler-arrow-up" color="gray" variant="ghost" aria-label="Scroll to top" @click="scrollToTop()" />

      <UButton
        :icon="isDark ? 'i-tabler-moon' : 'i-tabler-sun'"
        color="gray"
        variant="ghost"
        aria-label="Theme"
        @click="isDark = !isDark"
      />

      <UPopover :popper="{ placement: 'bottom-end' }">
        <UButton color="gray" variant="ghost" icon="i-tabler-dots-vertical" />

        <template #panel>
          <div class="p-1 flex flex-col">
            <label for="open-items-in-new-tab" class="cursor-pointer flex items-center gap-4 px-1.5 py-1.5 text-sm justify-between w-full">
              Open items in new tab
              <UToggle id="open-items-in-new-tab" v-model="openItemsInNewTab" size="sm" />
            </label>
            <label for="open-comments-in-new-tab" class="cursor-pointer flex items-center gap-4 px-1.5 py-1.5 text-sm justify-between w-full">
              Open comments in new tab
              <UToggle id="open-comments-in-new-tab" v-model="openCommentsInNewTab" size="sm" />
            </label>
          </div>
        </template>
      </UPopover>
    </div>
  </div>
</template>
