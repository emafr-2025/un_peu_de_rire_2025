import type { Episode } from "@/types";
import Image from "next/image";
import styles from "./PodcastList.module.css";

interface PodcastListProps {
  episodes: Episode[];
  onEpisodeSelect: (episode: Episode) => void;
}

export default function PodcastList({ episodes, onEpisodeSelect }: PodcastListProps) {
  if (episodes.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>エピソードが見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {episodes.map((episode, index) => (
          <li key={episode.id}>
            <button
              type="button"
              onClick={() => onEpisodeSelect(episode)}
              className={styles.episodeButton}
              aria-label={`${episode.title}をプレイヤーで再生する`}
            >
              <div className={styles.episodeContent}>
                <div className={styles.recordContainer}>
                  <Image 
                    src="/images/record.svg" 
                    alt="レコード" 
                    width={32} 
                    height={32}
                    className={styles.recordIcon}
                  />
                  <span className={styles.episodeNumber}>Episode {index + 1}</span>
                </div>
                <div className={styles.episodeInfo}>
                  <h3 className={styles.episodeTitle}>{episode.title}</h3>
                  <span className={styles.duration}>
                    ({Math.round(episode.duration / 60)}分)
                  </span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}