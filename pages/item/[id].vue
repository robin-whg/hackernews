<script lang='ts' setup>
const itemId = useRouteParams('id', undefined, { transform: Number })

const store = useContentStore()
const item = computed(() => store.getItem(itemId.value))

const { isReady } = useAsyncState(
  store.fetchItem(itemId.value),
  null,
)

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

const storage = useStorageStore()
const dropDownItems = [[{
  label: 'Open items in new tab',
  click: () => {
    storage.openItemsInNewTab = !storage.openItemsInNewTab
  },
  slot: 'open-items-in-new-tab',
}]]

const router = useRouter()
function goBack() {
  router.back()
  router.push('/')
}
</script>

<template>
  <div>
    <div class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 flex justify-between">
      <div>
        <UButton icon="i-tabler-arrow-left" variant="ghost" color="gray" @click="goBack()" />
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
              <UToggle v-model="storage.openItemsInNewTab" />
            </div>
          </template>
        </UDropdown>
      </div>
    </div>
    <div v-if="isReady && item">
      <Item :item expanded />
    </div>
    <div v-else>
      loading
    </div>
  </div>
</template>
