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

const isSlotEmpty = computed(() => !useSlots().default)

const style = computed(() => {
  const padding = isSlotEmpty.value ? (sm.value ? 'p-.5' : 'p-1.5') : (sm.value ? 'px-1.5 py-.5' : 'px-3 py-1.5')
  const radius = sm.value ? 'rounded-md' : 'rounded-lg'
  const gap = sm.value ? 'gap-0.5' : 'gap-1.5'

  return `${padding} ${radius} ${gap}`
})
</script>

<template>
  <component :is="componentType" class="flex items-center text-sm font-medium transition duration-100 ease-in-out hover:bg-orange-600/5 hover:text-orange-600" :class="style">
    <div v-if="icon" class="flex-none" :class="[icon, sm ? 'h-4 w-4' : 'h-5 w-5']" />
    <slot />
  </component>
</template>
