import type { Episode } from "@/types";
import styles from "./AudioPlayer.module.css";

interface AudioPlayerProps {
  episode: Episode | null;
}

export default function AudioPlayer({ episode }: AudioPlayerProps) {
  if (!episode) {
    return null;
  }

  return (
    <div className={styles.player}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h3 className={styles.title}>{episode.title}</h3>
          <div className={styles.meta}>
            <span className={styles.duration}>
              {Math.round(episode.duration / 60)}分
            </span>
            {episode.tags && episode.tags.length > 0 && (
              <span className={styles.tags}>
                {episode.tags.join("・")}
              </span>
            )}
          </div>
        </div>
        <audio 
          controls 
          preload="metadata" 
          src={episode.url} 
          className={styles.audio}
          aria-label={`${episode.title}を再生`}
        />
      </div>
    </div>
  );
}