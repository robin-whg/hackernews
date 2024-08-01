<script setup lang="ts">
import { useStorage } from '@vueuse/core'

const router = useRouter()
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

const openItemsInNewTab = useStorage('open-items-in-new-tab', false)
</script>

<template>
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

      <UPopover :popper="{ placement: 'bottom-end' }">
        <UButton color="gray" variant="ghost" icon="i-tabler-dots-vertical" />
        <template #panel>
          <div class="p-1">
            <div class="flex justify-between gap-3 w-full items-center">
              <label for="open-items-in-new-tab" class="cursor-pointer flex items-center gap-4 px-1.5 py-1.5 text-sm">
                Open items in new tab
                <UToggle id="open-items-in-new-tab" v-model="openItemsInNewTab" size="sm" />
              </label>
            </div>
          </div>
        </template>
      </UPopover>
    </div>
  </div>
</template>
