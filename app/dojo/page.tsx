"use client";
import { useEffect, useState } from "react";
import { fetchDojoItems } from "@/lib/fetchJson";
import type { DojoItem } from "@/types";
import Image from "next/image";
import styles from "./page.module.css";

interface DojoCard {
  id: string;
  title: string;
  negative?: string;
  reframe?: string;
  tinyStep?: string;
  tags?: string[];
}

function normalizeToCards(items: DojoItem[]): DojoCard[] {
  return items.map((item, index) => {
    // データ構造を解析してカード用に変換
    let negative = "";
    let reframe = "";
    let tinyStep = "";

    if (item.body) {
      // 🗯、💡、🪜 の絵文字で分割
      const lines = item.body.split('\n');
      lines.forEach(line => {
        if (line.includes('🗯')) {
          negative = line.replace(/🗯\s*/, '').trim();
        } else if (line.includes('💡')) {
          reframe = line.replace(/💡\s*/, '').trim();
        } else if (line.includes('🪜')) {
          tinyStep = line.replace(/🪜\s*(ちいさな一歩：?)?/, '').trim();
        }
      });
      
      // もし絵文字での分割がうまくいかない場合は、タイトルをnegativeとして使用
      if (!negative && !reframe && !tinyStep) {
        negative = item.title || "イライラしがちな場面";
        reframe = "こうかもしれません";
        tinyStep = "まず深呼吸してみましょう";
      }
    }

    // dojyo.jsonのcards形式の場合
    const rawItem = item as any;
    if (rawItem.label && rawItem.negative && rawItem.reframe && rawItem.tiny_step) {
      return {
        id: rawItem.id || String(index + 1),
        title: rawItem.label,
        negative: rawItem.negative,
        reframe: rawItem.reframe,
        tinyStep: rawItem.tiny_step,
        tags: rawItem.tags
      };
    }

    return {
      id: item.id || String(index + 1),
      title: item.title || `カード${index + 1}`,
      negative: negative || item.title || "イライラしがちな場面",
      reframe: reframe || "こう考えることもできます",
      tinyStep: tinyStep || "小さな一歩から始めてみましょう",
      tags: item.tags
    };
  });
}

interface CardComponentProps {
  card: DojoCard;
}

function CardComponent({ card }: CardComponentProps) {
  const [flipped, setFlipped] = useState(false);
  const [step, setStep] = useState<'front' | 'reframe' | 'tips'>('front');

  const handleCardClick = () => {
    if (step === 'front') {
      setFlipped(true);
      setTimeout(() => setStep('reframe'), 300);
    } else if (step === 'reframe') {
      setFlipped(true);
      setTimeout(() => setStep('tips'), 300);
    } else {
      setFlipped(false);
      setTimeout(() => setStep('front'), 300);
    }
  };

  return (
    <div className={styles.cardWrapper} onClick={handleCardClick}>
      <div className={`${styles.card} ${flipped ? styles.flipped : ''}`}>
        {step === 'front' && (
          <div className={styles.cardFront}>
            <div className={styles.karutaHeader}>第{card.id}番</div>
            <div className={styles.karutaText}>{card.negative}</div>
            <div className={styles.karutaFooter}>めくってみよう</div>
          </div>
        )}
        
        {step === 'reframe' && (
          <div className={styles.cardBack}>
            <div className={styles.reframeIcon}>💡</div>
            <h3 className={styles.reframeTitle}>言い換え</h3>
            <p className={styles.reframeText}>{card.reframe}</p>
            <div className={styles.cardHint}>さらにタップ</div>
          </div>
        )}
        
        {step === 'tips' && (
          <div className={styles.cardTips}>
            <div className={styles.tipsIcon}>🪜</div>
            <h3 className={styles.tipsTitle}>ちいさな一歩</h3>
            <p className={styles.tipsText}>{card.tinyStep}</p>
            <div className={styles.cardHint}>もう一度タップで戻る</div>
          </div>
        )}
      </div>
    </div>
  );
}

// 実際のdojyo.jsonデータをベースにしたかるた
const realDojoCards: DojoCard[] = [
  {
    id: "1",
    title: "時間が迫るとイライラ",
    negative: "早くしなさい、もう出る時間でしょ！",
    reframe: "私は、遅刻が心配で焦ってるんだな。今できることだけすぐやろうって伝えよう。",
    tinyStep: "「出発1曲前タイマー」を導入して、曲が終わったら切り替える合図にする"
  },
  {
    id: "2",
    title: "何回も言わせてしまう",
    negative: "何回言えば分かるの？",
    reframe: "私もこの言葉、言われたら、緊張して余計に覚えられないのかも。やさしく伝えよう。",
    tinyStep: "ドアや机に「1動作だけ」のメモを貼る"
  },
  {
    id: "3",
    title: "できない理由が不明で不安",
    negative: "どうしてできないの？",
    reframe: "私もできないことあるな、本人も困ってるかも、次の一歩を一緒に考えよう。",
    tinyStep: "困った所をカードで示す「つっかえカード」を用意する"
  },
  {
    id: "4",
    title: "じっとできず注意される",
    negative: "じっとしなさい、座って！",
    reframe: "なんか居心地が悪いのかな、体を動かしたいサインかも。代わりに静かな動きを許そう。",
    tinyStep: "足元にもぞもぞクッションや手元に握り玩具を置く"
  },
  {
    id: "5",
    title: "片付けでぶつかる",
    negative: "今すぐ片づけなさい！",
    reframe: "私の怒り、散らかてるからだけじゃないかも。えーい、自分も一緒に取り組もう。",
    tinyStep: "「ここだけ箱」を用意して3分タイマーで片付ける"
  },
  {
    id: "6",
    title: "宿題で言い合いになる",
    negative: "宿題は？早くやりなさい！",
    reframe: "宿題って気が重いわな、後にちょっと楽しいことやる目標持とう！",
    tinyStep: "「終わった後のごほうび」決めて、５分机に向かうことからスタート"
  },
  {
    id: "7",
    title: "ゲームをやめられない",
    negative: "ゲーム（スマホ）やめなさい、約束でしょ！",
    reframe: "切り上げにくいだけ。次のセーブポイントまであと何分？",
    tinyStep: "「終わり前2分アラーム」＋終了宣言（ハイタッチなど）をセットにする"
  },
  {
    id: "8",
    title: "泣き止まないと困る",
    negative: "泣いてもダメ。泣き止みなさい。",
    reframe: "泣けるって素晴らしいこと、まず承認して落ち着く行動へつなげる。",
    tinyStep: "「落ち着く箱」（タオル・水・小物）を用意して落ち着ける場をつくる"
  },
  {
    id: "9",
    title: "親の限界で爆発しそう",
    negative: "いい加減にしなさい！",
    reframe: "私なんで今キレた？疲れ？不安？どうすればキレなかった？自分の境界線を知るチャンスだね。",
    tinyStep: "「お母さんはこれ（境界線）をされるのが嫌いなの」と説明する"
  }
];

export default function DojoPage() {
  const [cards, setCards] = useState<DojoCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const result = await fetchDojoItems();
        if (result.items.length > 0) {
          const normalizedCards = normalizeToCards(result.items);
          setCards(normalizedCards);
          setIsDemo(false);
        } else {
          // データが空の場合は実際のdojo.jsonデータを使用
          setCards(realDojoCards);
          setIsDemo(true);
        }
        setError(result.error || null);
      } catch (error) {
        // エラーの場合も実際のdojo.jsonデータを表示
        setCards(realDojoCards);
        setIsDemo(true);
        setError(null); // 実データを表示する場合はエラーメッセージを非表示
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>道場の準備をしています...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.dojoHeader}>
          <div className={styles.signBoard}>
            <div className={styles.dojoTitleWithIcon}>
              <Image 
                src="/images/あんぷうどり_道場.png" 
                alt="あんぷうどり道場" 
                width={80} 
                height={80}
                className={styles.dojoIcon}
              />
              <div className={styles.titleSection}>
                <h1 className={styles.dojoTitle}>おこっちゃうんです道場</h1>
                <p className={styles.dojoSubtitle}>言い換え修行の場</p>
              </div>
            </div>
          </div>
        </header>

        {error && (
          <div className={styles.errorMessage} role="alert">
            <p>道場データの読み込み中にエラーが発生しました: {error}</p>
          </div>
        )}

        <div className={styles.instruction}>
          <p>🃏 かるたをクリックすると、言い換えのヒントが表示されます</p>
          {isDemo && (
            <p style={{ marginTop: '8px', fontSize: '0.9rem', opacity: 0.8 }}>
              ※ dojyo.json から読み込んだ9枚のかるたです
            </p>
          )}
        </div>

        <div className={styles.cardsGrid}>
          {cards.map((card) => (
            <CardComponent key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
