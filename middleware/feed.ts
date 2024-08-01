import type { FeedType } from '~/types'

export default defineNuxtRouteMiddleware((to) => {
  if (to.params.feed && !FEED_TYPES.includes(to.params.feed as FeedType))
    return navigateTo(`/${FEED_TYPES[0]}`)
})
