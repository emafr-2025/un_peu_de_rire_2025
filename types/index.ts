export interface Episode {
  id: string;
  title: string;
  desc: string;
  url: string;
  duration: number;
  tags: string[];
}

export interface DojoItem {
  id?: string;
  title?: string;
  body?: string;
  tags?: string[];
}

export interface PodcastData {
  episodes?: Episode[];
}

export interface DojoData {
  items?: DojoItem[];
}

export type PodcastResponse = Episode[] | PodcastData;
export type DojoResponse = DojoItem[] | DojoData;