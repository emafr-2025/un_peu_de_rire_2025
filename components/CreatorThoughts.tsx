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
            発達障害の息子がいて、学校からは何をしでかした、と毎日のように電話がかかってきました。
            フルタイムで働いていても、学校の問題解決は母親が対応すべき、という暗黙のルール。納得できない気持ちを抱えながらも、私は「気丈にふるまうお母さん」を演じ続けていました。
          </p>
          <p>
            心配して声をかけてくれる友達も、よかれと思って「がんばりなさいよ！」と言ってくれたのでしょう。けれど、すでに充分がんばっている状況では、その言葉はとどめの一撃のように胸に刺さりました。
            「どうして誰も分かってくれないの？」――そんな気持ちでいっぱいでした。
          </p>
          <p>
            本もたくさん読みましたが、その多くはいわゆる Gifted の成功ストーリーで、「見守っていれば大丈夫、東大へ」というような話。
            でも私が知りたかったのはそうじゃない。「いま困っている状況をどうしたらいいか」 だったのです。
          </p>
          <p>
            当時の私は、「同じ気持ちを少し先に経験した先輩」の話を聞きたくて、必死にそういう場を探していました。
          </p>
          <p>
            あの頃、もし AI があって安全に相談できる場所があったなら、どんなに心強かっただろう。
            だからこそ、一人で悩みを抱えるお母さんに、少しでも笑顔を届けたい――そんな想いでこのサイトを作りました。
          </p>
          <p>
            そしてもうひとつ。サラリーマンを辞めて、50代から「AIをどこまで活用できるか」に挑戦しています。学んだことをアウトプットしながら、同じ悩みを持つ誰かの役に立てたらと思っています。
          </p>
        </div>
      </div>
    </div>
  );
}