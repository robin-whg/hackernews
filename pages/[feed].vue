<script lang='ts' setup>
definePageMeta({
  middleware: 'feed',
})

const route = useRoute()

const feedType = computed(() => route.params.feed as FeedType)

useHead({
  title: feedType.value,
})
</script>

<template>
  <Feed :feed-type="feedType" />
</template>
