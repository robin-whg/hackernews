<script setup lang="ts">
const route = useRoute()

const id = computed(() => +route.params.id)

const hackerStore = useHackerStore()
const { getItem } = storeToRefs(hackerStore)

await hackerStore.fetchItem(id.value)

const item = computed(() => getItem.value(id.value))
</script>

<template>
  <div class="mx-auto max-w-2xl py-3 container">
    <Item v-if="item" :item="item" />
  </div>
</template>
