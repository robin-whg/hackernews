<template>
  <div>
    <Suspense>
      <slot />
      <template #fallback>
        <slot name="fallback">
          loading…
        </slot>
      </template>
    </Suspense>
  </div>
</template>
