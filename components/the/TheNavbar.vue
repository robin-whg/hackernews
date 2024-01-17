<template>
  <HeadlessDisclosure v-slot="{ open }" as="nav" class="z-10 mx-auto bg-zinc-900 px-3">
    <div class="mx-auto container">
      <div class="h-12 flex items-center justify-between gap-3">
        <div class="flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <HeadlessDisclosureButton as="template">
            <BaseButton :icon="!open ? 'i-tabler-menu' : 'i-tabler-x'" />
          </HeadlessDisclosureButton>
        </div>

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

        <TheSettingsMenu />
      </div>

      <HeadlessDisclosurePanel v-slot="{ close }" class="sm:hidden">
        <div class="px-3">
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
