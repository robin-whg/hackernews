import type { FeedType, Item } from '~/types'

export default function () {
  const baseUrl = 'https://hacker-news.firebaseio.com/v0'

  function fetchItem(id: number): Promise<Item> {
    return $fetch<Item>(`${baseUrl}/item/${id}.json`)
  }

  async function fetchItems(ids: number[]): Promise<Item[]> {
    return Promise.all(ids.map(id => fetchItem(id)))
  }

  async function fetchFeed(feedType: FeedType): Promise<number[]> {
    return $fetch<number[]>(`${baseUrl}/${feedType}stories.json`)
  }

  return {
    fetchItem,
    fetchItems,
    fetchFeed,
  }
}
