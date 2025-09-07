import Image from "next/image";
import styles from "./page.module.css";

export default function RequestPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.pageHeader}>
          <div className={styles.headerWithIcon}>
            <Image 
              src="/images/あんぷうどり_メモ.png" 
              alt="あんぷうどりメモ" 
              width={60} 
              height={60}
              className={styles.headerIcon}
            />
            <div className={styles.titleSection}>
              <h1 className={styles.pageTitle}>エピソード募集・ご意見</h1>
              <p className={styles.pageSubtitle}>
                エピソード募集やご意見・ご感想をお聞かせください
              </p>
            </div>
          </div>
        </header>

        <div className={styles.description}>
          <p>
            発達障害のお子さんの予想外の発想や行動で、
            「困った！」が「面白い！」に変わった瞬間はありませんか？
          </p>
          <p>
            エピソードの募集はもちろん、番組への感想やご意見も大歓迎です。
            皆さんの体験談やお声が、他のお母さんたちの笑顔と学びにつながります。
          </p>
        </div>

        <div className={styles.formContainer}>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfG9ZwWsUa9wUtjjO0ptuujngx6hN-uQnz7vMnCtVTDsMioTg/viewform?embedded=true"
            className={styles.iframe}
            frameBorder={0}
            title="エピソード募集・ご意見フォーム"
            aria-label="エピソード募集・ご意見のGoogleフォーム"
          >
            読み込んでいます...
          </iframe>
        </div>

        <div className={styles.notice}>
          <h2 className={styles.noticeTitle}>ご投稿について</h2>
          <ul className={styles.noticeList}>
            <li>投稿いただいた内容は、ポッドキャストで紹介させていただく場合があります</li>
            <li>個人情報は適切に管理し、本来の目的以外では使用いたしません</li>
            <li>匿名でのご投稿も可能です</li>
          </ul>
        </div>
      </div>
    </div>
  );
}