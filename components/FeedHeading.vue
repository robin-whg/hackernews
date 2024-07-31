<script setup lang="ts">
const feedType = useRouteParams<FeedType>('feed', undefined, { transform: String })
const feedTypeColor = computed(() => {
  switch (feedType.value) {
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

const storage = useStorageHandler()
const dropDownItems = [[{
  label: 'Open items in new tab',
  click: () => {
    storage.toggleOpenItemsInNewTab()
  },
  slot: 'open-items-in-new-tab',
}]]
</script>

<template>
  <div class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 flex justify-between">
    <div>
      <USelectMenu v-model="feedType" :options="feedTypes" class="w-28" :ui-menu="{ option: { selectedIcon: { base: `h-5 w-5 text-${feedTypeColor}-500 dark:text-${feedTypeColor}-400 flex-shrink-0` } } }" />
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

      <UDropdown :items="dropDownItems" :popper="{ placement: 'bottom-end' }" :close-delay="500" :ui="{ width: 'w-50' }">
        <UButton color="gray" variant="ghost" icon="i-tabler-dots-vertical" />

        <template #open-items-in-new-tab="{ item: dropdownItem }">
          <div class="flex justify-between gap-3 w-full">
            <span class="w-max">
              {{ dropdownItem.label }}
            </span>
            <UToggle :value="storage.openItemsInNewTab" />
          </div>
        </template>
      </UDropdown>
    </div>
  </div>
</template>
