<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const options = feedTypes.map(feedType => feedType)
const selectedFeedType = ref<FeedType>(route.params.feed as FeedType)
const selectedFeedTypeIconColor = computed(() => {
  switch (selectedFeedType.value) {
    case 'top':
      return 'orange'
    case 'new':
      return 'orange'
    case 'best':
      return 'orange'
    case 'ask':
      return 'blue'
    case 'show':
      return 'green'
    case 'job':
      return 'purple'
    case 'bookmarks':
      return 'yellow'
    default:
      return 'orange'
  }
})
watch(selectedFeedType, (newSelectedFeedType, oldSelectedFeedType) => {
  if (newSelectedFeedType !== oldSelectedFeedType)
    router.push(`/${selectedFeedType.value}`)
})

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const storage = useStorageStore()
const items = [[{
  label: 'Open items in new tab',
  click: () => {
    storage.openItemsInNewTab = !storage.openItemsInNewTab
  },
  slot: 'open-items-in-new-tab',
}]]
</script>

<template>
  <div class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 flex justify-between">
    <div>
      <USelectMenu v-model="selectedFeedType" :options class="w-28" :ui-menu="{ option: { selectedIcon: { base: `h-5 w-5 text-${selectedFeedTypeIconColor}-500 dark:text-${selectedFeedTypeIconColor}-400 flex-shrink-0` } } }" />
    </div>
    <div class="flex gap-1.5">
      <UButton
        :icon="isDark ? 'i-tabler-moon' : 'i-tabler-sun'"
        color="gray"
        variant="ghost"
        aria-label="Theme"
        @click="isDark = !isDark"
      />

      <UDropdown :items="items" :popper="{ placement: 'bottom-end' }" :close-delay="500" :ui="{ width: 'w-50' }">
        <UButton color="gray" variant="ghost" icon="i-tabler-dots-vertical" />

        <template #open-items-in-new-tab="{ item }">
          <div class="flex justify-between gap-3 w-full">
            <span class="w-max">
              {{ item.label }}
            </span>
            <UToggle v-model="storage.openItemsInNewTab" />
          </div>
        </template>
      </UDropdown>
    </div>
  </div>
</template>
