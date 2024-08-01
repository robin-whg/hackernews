<script setup lang="ts">
definePageMeta({
  middleware: (from) => {
    if (from.path === '/')
      return navigateTo(`/${FEED_TYPES[0]}`)
  },
})
</script>
