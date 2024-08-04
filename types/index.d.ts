export type FeedType = typeof FEED_TYPES[number]

export interface Item {
  id: number
  deleted?: boolean
  type: 'story' | 'comment' | 'job' | 'poll' | 'pollopt'
  by: string
  time: number
  text?: string
  dead?: boolean
  parent?: number
  poll?: number
  kids?: number[]
  url?: string
  score?: number
  title?: string
  parts?: number[]
  descendants?: number
}

export interface Bookmark {
  id: number
  timestamp: number
}

export interface User {
  id: string
  created: number
  karma: number
  submitted: number[]
  about?: string
}
