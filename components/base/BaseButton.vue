<script setup lang="ts">
interface Props {
  as?: 'button' | 'NuxtLink'
  sm?: boolean
  icon?: string
}
const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  sm: false,
})
const { as, sm, icon } = toRefs(props)

const componentType = computed(() => {
  if (as.value === 'NuxtLink')
    return resolveComponent('NuxtLink')
  return 'button'
})
</script>

<template>
  <component :is="componentType" class="flex items-center gap-1 text-sm transition duration-100 hover:bg-zinc-800 hover:text-white" :class="[sm ? 'rounded-md px-1.5 py-.5 ' : 'px-3 py-1.5 rounded-lg']">
    <div v-if="icon" :class="icon" class="h-4 w-4 flex-none" />
    <slot />
  </component>
</template>
