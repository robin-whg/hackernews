<script setup lang="ts">
definePageMeta({
  middleware: (from) => {
    if (from.path === '/')
      return navigateTo(`/${feedTypes[0]}`)
  },
})
</script>
