"use client";
import { useState } from "react";
import styles from "./CreatorThoughts.module.css";

export default function CreatorThoughts() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <div className={styles.creatorThoughts}>
      <h2 
        className={styles.heading}
        onClick={toggleExpanded}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
        aria-controls="creator-thoughts-content"
      >
        制作者の想い
        <span 
          className={styles.expandIcon} 
          data-expanded={isExpanded}
          aria-hidden="true"
        >
          ▼
        </span>
      </h2>
      <div 
        id="creator-thoughts-content"
        className={styles.content}
        data-expanded={isExpanded}
      >
        <div className={styles.thoughtsText}>
          <p>
            子育て中の女性の悩みは、子どものことに限りません。
            キャリア、家庭、そして時に親の介護まで――重くのしかかることがあります。
          </p>
          <p>
            私も、発達障害の息子がいて、毎日のように学校から電話がかかってきました。
            フルタイムで働きながらも「母親が対応すべき」という空気の中、私は"気丈にふるまうお母さん"を演じ続けていました。
          </p>
          <p>
            でも本当は、誰かに聞いてほしかった。
            「同じ気持ちを少し先に経験した先輩」と話したかったのです。
          </p>
          <p>
            あの頃、もしAIがあって安全に相談できる場所があったなら、どんなに心強かっただろう。
            だからこそ、一人で悩みを抱えるお母さんに少しでも笑顔を届けたい――そんな想いでこのサイトを作りました。
          </p>
          <p>
            そしてもうひとつ。
            私は50代から会社員を辞め、「AIをどこまで活用できるか」に挑戦しています。
            学びをアウトプットしながら、同じ悩みを持つ誰かの役に立てたらと思っています。
          </p>
        </div>
      </div>
    </div>
  );
}