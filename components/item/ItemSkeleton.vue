<template>
  <div class="w-full animate-pulse p-4 gap-2 flex flex-col">
    <div class="h-6 flex items-center gap-2">
      <USkeleton class="h-5 w-14" />
      <USkeleton class="h-5 w-24" />
    </div>

    <USkeleton class="h-6 md:h-7 md:max-w-96 w-full" />

    <div class="h-6 flex items-center gap-2 justify-between">
      <USkeleton class="h-5 w-56" />
      <USkeleton class="h-5 w-16" />
    </div>
  </div>
</template>
