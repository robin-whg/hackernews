<template>
  <div class="mx-auto max-w-2xl border-zinc-800 md:border-x">
    <TheNavbar />
    <div class="min-h-screen flex flex-col">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>
