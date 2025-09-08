"use client";
import { useState, useEffect } from "react";
import styles from "./SiteIntro.module.css";

export default function SiteIntro() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleExpanded = () => {
    if (!isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <section className={styles.siteIntro}>
      <h2 
        className={styles.heading}
        onClick={toggleExpanded}
        onKeyDown={handleKeyDown}
        tabIndex={isMobile ? -1 : 0}
        role={isMobile ? undefined : "button"}
        aria-expanded={isMobile ? undefined : isExpanded}
        aria-controls={isMobile ? undefined : "site-intro-content"}
      >
        {!isMobile && (
          <span 
            className={styles.expandIcon} 
            data-expanded={isExpanded}
            aria-hidden="true"
          >
            ▼
          </span>
        )}
      </h2>
      <div 
        id="site-intro-content"
        className={styles.content}
        data-expanded={isExpanded}
      >
        <p className={styles.description}>
          ここは、そんな想いを持つお母さんに元気を届ける場です。<br/>
          ① <strong>あんぷうどりカフェ</strong> ― いつか武勇伝になる笑いを！<br/>
           ② <strong>しゅえっとくん</strong> ― 誰かに話を聞いてほしい！<br/>
           ③ <strong>おこっちゃうんです道場</strong> ― 「どう言えばよかった？」の壁打ち練習<br/>
           ④ <strong>エピソード募集</strong> ― あなたの逸話をぜひ取り上げさせてください！
          </p>
      </div>
    </section>
  );
}
