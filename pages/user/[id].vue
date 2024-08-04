<script lang='ts' setup>
const userId = useRouteParams('id', undefined, { transform: String })

const store = useStore()
const { isReady, error, state: user } = store.fetchUser(userId.value)
</script>

<template>
  <div>
    <BaseHeading type="user" :user="user ?? undefined" />

    <template v-if="!error">
      <div v-if="isReady && user">
        <User :user />
      </div>
      <div v-else>
        <UserSkeleton />
      </div>
    </template>

    <template v-else>
      <p class="my-4 text-center">
        Error :(
      </p>
    </template>
  </div>
</template>
