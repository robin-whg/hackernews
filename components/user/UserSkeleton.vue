<template>
  <div class="w-full animate-pulse p-4 gap-2 flex flex-col">
    <div class="h-6 flex items-center gap-2">
      <USkeleton class="h-5 w-12" />
      <USkeleton class="h-5 w-20" />
    </div>

    <USkeleton class="h-6 md:h-7 md:max-w-48 w-full" />

    <div class="h-6 flex items-center gap-2 justify-between">
      <USkeleton class="h-5 w-32" />
    </div>
  </div>
</template>
