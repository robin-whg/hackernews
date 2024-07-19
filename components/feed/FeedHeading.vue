<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const options = feedTypes.map(feedType => feedType)
const selectedFeedType = ref<FeedType>(route.params.feed as FeedType)
watch(selectedFeedType, (newSelectedFeedType, oldSelectedFeedType) => {
  if (newSelectedFeedType !== oldSelectedFeedType)
    router.push(`/${selectedFeedType.value}`)
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
  <div class="sticky top-0 z-10 border-b border-gray-800 bg-gray-900/75 p-3 flex justify-between">
    <div>
      <USelectMenu v-model="selectedFeedType" :options class="w-24" />
    </div>
    <div>
      <UDropdown :items="items" :popper="{ placement: 'bottom-end' }" :close-delay="500" :ui="{ width: 'w-56' }">
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
