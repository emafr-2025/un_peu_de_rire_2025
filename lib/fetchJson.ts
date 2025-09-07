import type { PodcastResponse, DojoResponse, Episode, DojoItem } from '@/types';

export async function fetchPodcasts(): Promise<Episode[]> {
  try {
    const response = await fetch('/podcasts.json');
    if (!response.ok) {
      console.error('Failed to fetch podcasts:', response.statusText);
      return [];
    }
    
    const data: PodcastResponse = await response.json();
    
    if (Array.isArray(data)) {
      return data;
    } else if (data.episodes) {
      return data.episodes;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    return [];
  }
}

export async function fetchDojoItems(): Promise<{ items: DojoItem[]; error?: string }> {
  try {
    const response = await fetch('/dojyo.json');
    if (!response.ok) {
      return {
        items: [],
        error: `道場データの読み込みに失敗しました (${response.status})`
      };
    }
    
    const data: DojoResponse = await response.json();
    
    let items: DojoItem[] = [];
    if (Array.isArray(data)) {
      items = data;
    } else if (data.items) {
      items = data.items;
    } else if ((data as any).cards) {
      // dojyo.json の cards 形式に対応
      items = (data as any).cards;
    }
    
    return { items };
  } catch (error) {
    return {
      items: [],
      error: `道場データの読み込み中にエラーが発生しました: ${error}`
    };
  }
}