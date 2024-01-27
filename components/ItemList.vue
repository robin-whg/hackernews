<script lang="ts" setup>
const props = defineProps<{ items: Item[] }>()
const { items } = toRefs(props)
</script>

<template>
  <div class="w-full">
    <ol v-if="items.length" class="flex flex-col">
      <template v-for="item in items" :key="item.id">
        <li>
          <ItemListItem :item="item" />
        </li>
      </template>
    </ol>
    <p v-else class="my-6 text-center">
      This list is empty :(
    </p>
  </div>
</template>
