<script setup lang="ts">
const settings = useSettingsStore()
</script>

<template>
  <HeadlessMenu v-slot="{ open }" as="div" class="relative inline-block text-left">
    <HeadlessMenuButton as="template">
      <BaseButton icon="i-tabler-dots-vertical" :class="{ 'bg-zinc-800': open }" />
    </HeadlessMenuButton>

    <transition
      enter-active-class="transition-opacity duration-100 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition-opacity duration-75 ease-in"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <HeadlessMenuItems
        class="absolute right-0 mt-3 w-64 origin-top-right rounded-xl bg-zinc-800/75 shadow-md backdrop-blur focus:outline-none"
      >
        <div class="p-1.5">
          <HeadlessMenuItem as="div" @click.prevent>
            <HeadlessSwitch
              v-slot="{ checked }"
              v-model="settings.openItemsInNewTab"
              class="w-full flex items-center justify-between px-3 py-1.5 text-sm font-medium"
            >
              Open items in new tab
              <div
                :class="checked ? 'bg-orange-600 border-orange-600' : 'bg-zinc-600 border-zinc-600'"
                class="base-disabled base-focus relative h-[20px] w-[40px] inline-flex shrink-0 cursor-pointer items-center border-2 rounded-full"
              >
                <span
                  aria-hidden="true" :class="checked ? 'translate-x-[20px]' : 'translate-x-0'"
                  class="pointer-events-none inline-block h-[16px] w-[16px] transform transform rounded-full bg-zinc-50 shadow ring-0 transition duration-100 ease-in-out"
                />
              </div>
            </HeadlessSwitch>
          </HeadlessMenuItem>
        </div>
      </HeadlessMenuItems>
    </transition>
  </HeadlessMenu>
</template>
