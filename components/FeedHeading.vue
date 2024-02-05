<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const selectedFeedType = ref<FeedType>(route.params.feed as FeedType)

watch(selectedFeedType, (newSelectedFeedType, oldSelectedFeedType) => {
  if (newSelectedFeedType !== oldSelectedFeedType)
    router.push(`/${selectedFeedType.value}`)
})
</script>

<template>
  <div class="sticky top-0 z-10 bg-zinc-900/75 backdrop-blur">
    <div class="mx-auto max-w-2xl flex flex justify-between px-3 py-1.5">
      <div>
        <HeadlessListbox v-slot="{ open }" v-model="selectedFeedType">
          <div class="relative w-32">
            <HeadlessListboxButton as="template">
              <BaseButton class="relative w-full justify-between" icon="i-tabler-selector" icon-right :class="{ 'bg-zinc-800/75': open }">
                {{ selectedFeedType }}
              </BaseButton>
            </HeadlessListboxButton>
            <transition
              enter-active-class="transition-opacity duration-100 ease-out"
              enter-from-class="transform opacity-0"
              enter-to-class="transform opacity-100"
              leave-active-class="transition-opacity duration-75 ease-in"
              leave-from-class="transform opacity-100"
              leave-to-class="transform opacity-0"
            >
              <HeadlessListboxOptions

                class="absolute z-20 mt-1.5 w-full overflow-auto rounded-xl rounded-xl bg-zinc-800/75 py-3 shadow-md backdrop-blur focus:outline-none"
              >
                <HeadlessListboxOption
                  v-for="feedType in feedTypes" :key="feedType" v-slot="{ active, selected }" as="template"
                  :value="feedType"
                >
                  <li
                    class="relative cursor-pointer select-none py-2 pl-6 pr-6" :class="[
                      active ? 'bg-orange-600/5 text-orange-600' : 'text-zinc-400',
                    ]"
                  >
                    <span
                      class="block truncate text-sm font-medium" :class="{ 'text-zinc-50': open }"
                    >{{ feedType }}</span>
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-600"
                    >
                      <div class="h-1.5 w-1.5 rounded-full bg-orange-600" />
                    </span>
                  </li>
                </HeadlessListboxOption>
              </HeadlessListboxOptions>
            </transition>
          </div>
        </HeadlessListbox>
      </div>
      <div>
        <FeedHeadingSettings />
      </div>
    </div>
  </div>
</template>
