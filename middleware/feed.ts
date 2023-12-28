export default defineNuxtRouteMiddleware((to) => {
  if (to.params.feed && !feedTypes.includes(to.params.feed as FeedType))
    return navigateTo(`/${feedTypes[0]}`)
})
