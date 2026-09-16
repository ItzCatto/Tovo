import type { AppEntry, ContinueWatchingItem } from './types'

export const apps: AppEntry[] = [
  { id: 'a-netflix', name: 'Netflix', accent: '#B93B3B', glyph: 'N', category: 'Streaming', installed: true },
  { id: 'a-youtube', name: 'YouTube', accent: '#C4373B', glyph: '▶', category: 'Video', installed: true },
  { id: 'a-hulu', name: 'Hulu', accent: '#3BB08F', glyph: 'H', category: 'Streaming', installed: true },
  { id: 'a-disney', name: 'Disney+', accent: '#3B5BC4', glyph: 'D+', category: 'Streaming', installed: true },
  { id: 'a-prime', name: 'Prime Video', accent: '#3BA7C4', glyph: 'P', category: 'Streaming', installed: true },
  { id: 'a-spotify', name: 'Spotify', accent: '#3BC46A', glyph: '♪', category: 'Music', installed: true },
  { id: 'a-hbo', name: 'MaxStream', accent: '#8B5BD6', glyph: 'M', category: 'Streaming', installed: false },
  { id: 'a-apple', name: 'Apple TV', accent: '#6D6D6D', glyph: '', category: 'Streaming', installed: false },
  { id: 'a-paramount', name: 'Paramount+', accent: '#3B6FC4', glyph: '+', category: 'Streaming', installed: false },
  { id: 'a-twitch', name: 'Twitch', accent: '#8B5BD6', glyph: 'T', category: 'Live', installed: true },
  { id: 'a-plex', name: 'Plex', accent: '#C4A23B', glyph: 'X', category: 'Media Server', installed: true },
  { id: 'a-podcasts', name: 'Podcasts', accent: '#C87532', glyph: '•)', category: 'Audio', installed: true },
]

export const continueWatching: ContinueWatchingItem[] = [
  { contentId: 'm-01', progress: 0.62, remaining: '47 min left' },
  { contentId: 's-01', progress: 0.28, remaining: '38 min left' },
  { contentId: 'm-07', progress: 0.85, remaining: '18 min left' },
  { contentId: 's-05', progress: 0.12, remaining: '51 min left' },
  { contentId: 'm-09', progress: 0.44, remaining: '1h 05m left' },
]
