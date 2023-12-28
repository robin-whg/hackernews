<template>
  <HeadlessDisclosure v-slot="{ open }" as="nav" class="z-10 mx-auto bg-zinc-900 px-3">
    <div class="mx-auto container">
      <div class="relative h-12 flex items-center justify-between">
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
          <div class="flex flex-shrink-0 items-center">
            <NuxtLink to="/top" class="font-semibold">
              Y-News
            </NuxtLink>
          </div>
          <div class="hidden sm:block">
            <div class="flex space-x-3">
              <NuxtLink
                v-for="feedType in feedTypes" :key="feedType" :to="`/${feedType}`"
                class="rounded-lg px-3 py-1.5 font-semibold transition duration-100 hover:text-orange-600"
              >
                {{ feedType }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <HeadlessDisclosureButton
            class="relative inline-flex items-center justify-center rounded-lg p-1.5 text-zinc-400 transition duration-100 hover:bg-zinc-800 hover:text-zinc-50"
          >
            <span class="sr-only">Open main menu</span>
            <div v-if="!open" class="i-tabler-menu block h-6 w-6" aria-hidden="true" />
            <div v-else class="i-tabler-x block h-6 w-6" aria-hidden="true" />
          </HeadlessDisclosureButton>
        </div>
      </div>

      <HeadlessDisclosurePanel v-slot="{ close }" class="sm:hidden">
        <div class="px-2 pb-3 pt-2 space-y-1">
          <NuxtLink
            v-for="feedType in feedTypes"
            :key="feedType" :to="`/${feedType}`"
            class="block rounded-lg px-3 py-1.5 text-center font-semibold transition duration-100 hover:text-orange-600"
            @click="close"
          >
            {{ feedType }}
          </NuxtLink>
        </div>
      </HeadlessDisclosurePanel>
    </div>
  </HeadlessDisclosure>
</template>
