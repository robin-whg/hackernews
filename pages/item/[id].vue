<script lang='ts' setup>
const itemId = useRouteParams('id', undefined, { transform: Number })

const store = useStore()
const item = computed(() => store.getItem(itemId.value))
const { isReady, error } = store.fetchItem(itemId.value)
</script>

<template>
  <div>
    <ItemHeading />
    <template v-if="!error">
      <div v-if="isReady && item">
        <Item :item expanded />
      </div>
      <div v-else>
        <ItemSkeleton />
      </div>
    </template>
    <template v-else>
      <p class="my-4 text-center">
        Error :(
      </p>
    </template>
  </div>
</template>
