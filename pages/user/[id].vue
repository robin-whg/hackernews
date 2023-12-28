<script setup lang="ts">
const route = useRoute()

const id = computed(() => route.params.id as string)

const hackerStore = useHackerStore()
const { getUser } = storeToRefs(hackerStore)

await hackerStore.fetchUser(id.value)

const user = computed(() => getUser.value(id.value))
</script>

<template>
  <div class="mx-auto max-w-2xl py-3 container">
    <User v-if="user" :user="user" />
  </div>
</template>
