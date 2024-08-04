import type { FeedType, Item, User } from '~/types'

export default function () {
  const baseUrl = 'https://hacker-news.firebaseio.com/v0'

  function fetchItem(id: number): Promise<Item | null> {
    return $fetch<Item>(`${baseUrl}/item/${id}.json`)
  }

  async function fetchItems(ids: number[]): Promise<(Item | null)[]> {
    return Promise.all(ids.map(id => fetchItem(id)))
  }

  async function fetchFeed(feedType: FeedType): Promise<number[]> {
    return $fetch<number[]>(`${baseUrl}/${feedType}stories.json`)
  }

  async function fetchUser(id: string): Promise<User | null> {
    return $fetch<User>(`${baseUrl}/user/${id}.json`)
  }

  return {
    fetchItem,
    fetchItems,
    fetchFeed,
    fetchUser,
  }
}
