"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./DifyChat.module.css";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  icon?: string;
}

interface DifyChatProps {
  className?: string;
}

const selectShuettoIcon = (content: string): string => {
  const lowerContent = content.toLowerCase();
  
  // キーワードベースでアイコンを選択
  if (lowerContent.includes('おめでと') || lowerContent.includes('素晴らし') || lowerContent.includes('よかった') || lowerContent.includes('楽しい')) {
    return '/images/しゅえっとくん_笑顔.png';
  }
  if (lowerContent.includes('がんば') || lowerContent.includes('頑張') || lowerContent.includes('応援') || lowerContent.includes('大丈夫')) {
    return '/images/しゅえっとくん_がんばるぞ.png';
  }
  if (lowerContent.includes('こんにちは') || lowerContent.includes('はじめまして') || lowerContent.includes('よろしく') || lowerContent.includes('手をあげ')) {
    return '/images/しゅえっとくん_片手上げ.png';
  }
  if (lowerContent.includes('応援') || lowerContent.includes('サポート') || lowerContent.includes('支援')) {
    return '/images/しゅえっとくん_応援.png';
  }
  
  // デフォルト
  return '/images/しゅえっとくん_1号.png';
};

export default function DifyChat({ className }: DifyChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
        }),
      });

      if (!response.ok) {
        throw new Error("チャットボットからの応答を取得できませんでした");
      }

      const data = await response.json();

      // モデル情報をコンソールに出力（開発用）
      if (data.model) {
        console.log("使用モデル:", data.model);
      }

      const responseContent = data.answer || "申し訳ございません。応答を生成できませんでした。";
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
        icon: selectShuettoIcon(responseContent),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorContent = "申し訳ございません。エラーが発生しました。もう一度お試しください。";
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: errorContent,
        role: "assistant",
        timestamp: new Date(),
        icon: selectShuettoIcon(errorContent),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`${styles.chatContainer} ${className || ""}`}>
      <div className={styles.messagesContainer}>
        {messages.length === 0 && (
          <div className={styles.welcomeMessage}>
            <p>しゅえっとです！</p>
            <p>お子さんの発達やご自身のお仕事、介護など、なんでもお聞かせください。</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.role === "user" ? styles.userMessage : styles.assistantMessage
            }`}
          >
            {message.role === "assistant" && message.icon && (
              <div className={styles.messageIcon}>
                <Image 
                  src={message.icon} 
                  alt="しゅえっとくん" 
                  width={32} 
                  height={32}
                  className={styles.shuettoIcon}
                />
              </div>
            )}
            <div className={styles.messageContent}>
              <p>{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className={`${styles.message} ${styles.assistantMessage}`}>
            <div className={styles.messageContent}>
              <div className={styles.typing}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="メッセージを入力してください..."
          className={styles.input}
          rows={2}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          className={styles.sendButton}
        >
          送信
        </button>
      </div>
    </div>
  );
}