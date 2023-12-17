export default function () {
  const baseUrl = 'https://hacker-news.firebaseio.com/v0'

  async function fetchItem(id: number): Promise<Item> {
    return $fetch(`${baseUrl}/item/${id}.json`)
  }

  async function fetchItems(ids: number[]): Promise<Item[]> {
    return Promise.all(ids.map(id => fetchItem(id)))
  }

  async function fetchUser(id: string): Promise<User> {
    return $fetch(`${baseUrl}/user/${id}.json`)
  }

  async function fetchFeed(feedType: typeof FeedType): Promise<number[]> {
    return $fetch(`${baseUrl}/${feedType}stories.json`)
  }

  return {
    fetchItem,
    fetchItems,
    fetchUser,
    fetchFeed,
  }
}
