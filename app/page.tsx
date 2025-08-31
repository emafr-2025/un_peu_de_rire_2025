// app/page.tsx
"use client";
import { useEffect, useState } from "react";

type Ep = { id:string; title:string; desc:string; url:string; duration:number; tags:string[] };

export default function Page(){
  const [eps, setEps] = useState<Ep[]>([]);
  const [current, setCurrent] = useState<Ep|null>(null);

  useEffect(()=>{
    fetch("/podcasts.json")
      .then(r=>r.json())
      .then((j)=>{
        const arr = Array.isArray(j) ? j : (j?.episodes ?? []);
        setEps(arr);
      })
      .catch(()=>setEps([]));
  },[]);

  return (
    <main style={{padding:24}}>
      <h1>あんぷうどり</h1>

      {current && (
        <div style={{position:"sticky", top:0, zIndex:10, background:"#fff", border:"1px solid #eee", borderRadius:12, padding:12, marginBottom:16}}>
          <strong>{current.title}</strong>
          <audio controls preload="metadata" src={current.url} style={{width:"100%", marginTop:8}}/>
        </div>
      )}

      <h2>あんぷうどりカフェ</h2>
      <ul style={{listStyle:"none", padding:0, display:"grid", gap:12}}>
        {eps.map(ep=>(
          <li key={ep.id}>
            <button
              type="button"
              onClick={()=>setCurrent(ep)}
              style={{
                border:"1px solid #ddd", borderRadius:12, padding:16, cursor:"pointer",
                display:"grid", gap:6, width:"100%", textAlign:"left", background:"#fff"
              }}
            >
              <strong>{ep.title}</strong>
              <small style={{opacity:0.7}}>
                {Math.round(ep.duration/60)}分／{(ep.tags||[]).join("・")}
              </small>
              <p style={{margin:0}}>{ep.desc}</p>
              <span style={{marginTop:6, fontSize:13, opacity:0.8}}>クリックでプレイヤーにセット ▶</span>
            </button>
          </li>
        ))}
      </ul>
      <h2 style={{marginTop:32}}>しゅえっとくん</h2>
<div style={{
  width:"100%", maxWidth:"900px", height:"80vh",
  border:"1px solid #ccc", borderRadius:8, overflow:"hidden"
}}>
  <iframe
    src="https://udify.app/chatbot/BvR9OpA4JxXlHd5X"
    style={{ width:"100%", height:"100%", minHeight:"700px" }}
    frameBorder={0}
    allow="microphone"
    title="Dify chatbot"
  />
</div>

    </main>
  );
}
