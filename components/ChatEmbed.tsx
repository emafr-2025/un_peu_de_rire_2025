import styles from "./ChatEmbed.module.css";

interface ChatEmbedProps {
  title?: string;
}

export default function ChatEmbed({ title = "Dify chatbot" }: ChatEmbedProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>しゅえっとくん</h2>
      <div className={styles.container}>
        <iframe
          src="https://udify.app/chatbot/BvR9OpA4JxXlHd5X"
          className={styles.iframe}
          frameBorder={0}
          allow="microphone"
          title={title}
          aria-label="チャットボット - しゅえっとくん"
        />
      </div>
    </section>
  );
}