<script lang="ts" setup>
const props = defineProps<{ items: Item[] }>()
const { items } = toRefs(props)
</script>

<template>
  <div>
    <ol class="flex flex-col">
      <template v-for="item in items" :key="item.id">
        <li>
          <ItemListItem :item="item" />
        </li>
      </template>
    </ol>
  </div>
</template>
