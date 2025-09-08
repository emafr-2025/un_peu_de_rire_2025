"use client";
import { useEffect, useState } from "react";
import { fetchPodcasts } from "@/lib/fetchJson";
import type { Episode } from "@/types";
import AudioPlayer from "@/components/AudioPlayer";
import PodcastList from "@/components/PodcastList";
import DifyChat from "@/components/DifyChat";
import CreatorThoughts from "@/components/CreatorThoughts";
import Image from "next/image";
import styles from "./page.module.css";

export default function HomePage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const data = await fetchPodcasts();
        setEpisodes(data);
      } finally {
        setLoading(false);
      }
    };

    loadEpisodes();
  }, []);

  const handleEpisodeSelect = (episode: Episode) => {
    setCurrentEpisode(episode);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>エピソードを読み込んでいます...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Welcome Section */}
        <header className={styles.pageHeader}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.pageTitle}>あんぷうどり</h1>
            <p className={styles.pageSubtitle}>
              「良妻賢母」じゃなくていい。<br/>
               私は ―― 勤勉な妻で、笑う母でありたい。
            </p>
            
            {/* Site Description */}
            <div className={styles.siteDescription}>
              <h2 className={styles.siteDescriptionTitle}></h2>
              <p className={styles.siteDescriptionText}>
                ここは、そんな想いを持つお母さんに元気を届ける場です。<br/>
                ① <strong>しゅえっとくん</strong> ― 誰かに話を聞いてほしい！<br/>
                 ② <strong>おこっちゃうんです道場</strong> ― 「どう言えばよかった？」の壁打ち練習<br/>
                 ③ <strong>あんぷうどりカフェ</strong> ― いつか武勇伝になる笑いを！<br/>
                 ④ <strong>エピソード募集</strong> ― あなたの逸話をぜひ取り上げさせてください！
              </p>
            </div>
            
            {/* Creator Thoughts */}
            <CreatorThoughts />
          </div>
        </header>

        {/* Podcast Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Image 
              src="/images/あんぷうどり_DJ.png" 
              alt="あんぷうどりDJ" 
              width={60} 
              height={60}
              className={styles.sectionIcon}
            />
            <div className={styles.cafeTitle}>
              <h2 className={styles.sectionTitle}>あんぷうどりカフェ</h2>
              <Image 
                src="/images/coffee.svg" 
                alt="コーヒー" 
                width={32} 
                height={32}
                className={styles.coffeeIcon}
              />
            </div>
          </div>
          <AudioPlayer episode={currentEpisode} />
          <PodcastList 
            episodes={episodes} 
            onEpisodeSelect={handleEpisodeSelect} 
          />
        </section>

        {/* Chat Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Image 
              src="/images/しゅえっとくん_1号.png" 
              alt="しゅえっとくん" 
              width={60} 
              height={60}
              className={styles.sectionIcon}
            />
            <div className={styles.titleGroup}>
              <h2 className={styles.sectionTitle}>しゅえっとくん</h2>
              <p className={styles.sectionSubtitle}>お気軽にご相談ください（gpt-4o-miniのエキスパートが回答します）</p>
            </div>
          </div>
          <DifyChat />
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <Image 
              src="/images/あんぷうどり_1号.png" 
              alt="あんぷうどり" 
              width={50} 
              height={50}
              className={styles.footerIcon}
            />
            <span className={styles.footerText}>あんぷうどり</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
