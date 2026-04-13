"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const PERSPECTIVES = [
  { id:1, stat:"55,000", context:"people were diagnosed with cancer today.", question:"You're healthy and you spent today complaining about your boss.", source:"verified", category:"health" },
  { id:2, stat:"5,600", context:"people in the US were diagnosed with cancer today.", question:"One of them was in the car you honked at this morning.", source:"verified", category:"health" },
  { id:3, stat:"295 million", context:"people faced acute hunger across 53 countries this year.", question:"You threw out leftovers this week.", source:"verified", category:"health" },
  { id:4, stat:"700 million", context:"people survive on less than $2.15 a day. Not per meal. Per day.", question:"You spent more than that on coffee this morning.", source:"verified", category:"health" },
  { id:5, stat:"45 million", context:"children under 5 suffer from wasting due to severe malnutrition.", question:"You skipped lunch because you 'weren't in the mood.'", source:"verified", category:"health" },
  { id:6, stat:"3.2 million", context:"people die every year from household air pollution.", question:"You complain about your house. Theirs is killing them.", source:"verified", category:"health" },
  { id:7, stat:"730 million", context:"people live without any access to electricity.", question:"You're mad about a loading screen.", source:"verified", category:"health" },
  { id:8, stat:"2.2 billion", context:"people lack access to safely managed drinking water.", question:"You left clean water running while you brushed your teeth.", source:"verified", category:"health" },
  { id:9, stat:"3.4 billion", context:"people don't have access to safely managed sanitation.", question:"You're on your phone in the bathroom right now. 3.4 billion people don't have one.", source:"verified", category:"health" },
  { id:10, stat:"138 million", context:"children are engaged in child labour globally.", question:"They're in mines and fields. Your kid's biggest problem is homework.", source:"verified", category:"health" },
  { id:11, stat:"54 million", context:"children are in hazardous work that could kill or permanently injure them.", question:"Your kid complained about chores. These kids are losing fingers in factories.", source:"verified", category:"health" },
  { id:12, stat:"12 million", context:"girls under 18 are forced into marriage every year.", question:"You spent 10 minutes deciding what to eat tonight. They never got to decide anything.", source:"verified", category:"health" },
  { id:13, stat:"122 million", context:"people have been forcibly displaced from their homes.", question:"You have a bed tonight. Millions would trade everything for that.", source:"verified", category:"health" },
  { id:14, stat:"1,000", context:"children under 5 die every day from unsafe water and sanitation.", question:"A kid died from dirty water in the time it took you to read this.", source:"verified", category:"health" },
  { id:15, stat:"22 million", context:"people are in forced marriages globally.", question:"You swiped left 50 times today because nobody was good enough.", source:"verified", category:"health" },
  { id:16, stat:"1,700", context:"Americans died from cancer today.", question:"The driver you swore at might be racing to say goodbye to one of them.", source:"verified", category:"health" },
  { id:17, stat:"27,000", context:"people die from cancer every single day globally.", question:"You complained about a headache today.", source:"verified", category:"health" },
  { id:18, stat:"49,000", context:"people died from heart disease today.", question:"You said you'd start exercising 'next Monday' for the third time.", source:"verified", category:"health" },
  { id:19, stat:"55 million", context:"people are living with dementia worldwide.", question:"You forgot to reply to a text. They're forgetting their own children's names.", source:"verified", category:"health" },
  { id:20, stat:"6,300", context:"newborns die every single day. Most from preventable causes.", question:"You moaned about broken sleep last night. A parent held their baby for the first and last time today.", source:"verified", category:"health" },
  { id:21, stat:"1,600", context:"people died from malaria today. Most of them were children under 5.", question:"They died from a mosquito bite. Your biggest problem today was a slow elevator.", source:"verified", category:"health" },
  { id:22, stat:"783 million", context:"people went hungry in 2022.", question:"You scrolled past three food delivery apps trying to decide what you were 'in the mood for.'", source:"verified", category:"health" },
  { id:23, stat:"28 million", context:"people are in forced labour right now.", question:"Someone made the clothes you're wearing. They might not have had a choice.", source:"verified", category:"health" },
  { id:24, stat:"356 million", context:"children live in extreme poverty.", question:"They've never had a birthday cake. Your kid cried because theirs was the wrong colour.", source:"verified", category:"health" },
  { id:25, stat:"168,000", context:"people died today. Not one of them saw it coming.", question:"You assume you'll wake up tomorrow. 168,000 people made that same assumption this morning.", source:"verified", category:"health" },
  { id:26, stat:"650 million", context:"women alive today were married before they turned 18.", question:"You look back on your teenage years fondly. 650 million women never got to have them.", source:"verified", category:"health" },
  { id:27, stat:"137", context:"women are killed by a family member every single day.", question:"You locked your door tonight and felt safe. 137 women were killed by the person inside theirs.", source:"verified", category:"health" },
  { id:28, stat:"2", context:"famines were officially declared in the last year. In Sudan and Gaza.", question:"You said you were 'starving' before dinner.", source:"verified", category:"health" },
  { id:29, stat:"800", context:"women died in childbirth today.", question:"Giving birth killed them. You complained about a doctor's waiting room.", source:"verified", category:"health" },
  { id:30, stat:"150,000", context:"people died today from illness, accidents, and violence.", question:"You ignored a call from someone who loves you because you couldn't be bothered.", source:"verified", category:"health" },
  { id:31, stat:"50 million", context:"people are in modern slavery — forced labour or forced marriage.", question:"You complained about your boss today. 50 million people can't quit. Can't leave. Can't say no.", source:"verified", category:"health" },
  { id:32, stat:"2,000 parents", context:"buried their child today.", question:"You yelled at yours for spilling something.", source:"verified", category:"health" },
  { id:33, stat:"13,400", context:"children under 5 died today from preventable causes.", question:"Most of them from diseases you got vaccinated for as a kid.", source:"verified", category:"health" },
  { id:34, stat:"106 million", context:"people drink water directly from untreated rivers and lakes.", question:"Your tap water is cleaner than what entire countries dream of.", source:"verified", category:"health" },
  { id:35, stat:"617 million", context:"children and adolescents worldwide cannot read a simple sentence or do basic maths.", question:"You have a library in your pocket. You used it to watch cat videos.", source:"verified", category:"health" },
  { id:36, stat:"1.2 billion", context:"people live in acute multidimensional poverty.", question:"They lack basic health, education, and living standards. You have all three and still found something to moan about.", source:"verified", category:"health" },
  { id:37, stat:"43 million", context:"people worldwide are completely blind and will never see again.", question:"They would give anything to see their family's face one more time. You looked at yours and reached for your phone.", source:"verified", category:"health" },
  { id:38, stat:"87 million", context:"children in Sub-Saharan Africa are in child labour.", question:"You complained about your workload today. 87 million children would trade their job for yours.", source:"verified", category:"health" }
];

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

function PinIcon({ filled, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "var(--accent)" : "none"} stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 17v5" />
      <path d="M9 11V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7" />
      <path d="M6 11h12l-1.5 6h-9z" />
    </svg>
  );
}

function Modal({ perspective, visible, onDismiss, pinned, onTogglePin }) {
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    if (visible) {
      setShowQuestion(false);
      const t = setTimeout(() => setShowQuestion(true), 800);
      return () => clearTimeout(t);
    }
  }, [visible, perspective]);

  if (!visible || !perspective) return null;

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:20, animation:"fadeIn 0.3s ease" }}>
      <div style={{ background:"var(--bg-card)", border:"1px solid var(--accent-border)", borderRadius:24, padding:"44px 40px", maxWidth:420, width:"100%", textAlign:"center", position:"relative", overflow:"hidden", animation:"slideUp 0.4s ease" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"var(--accent)", opacity:0.6 }} />

        <button onClick={onTogglePin} style={{ position:"absolute", top:16, right:16, background:"none", border:"none", cursor:"pointer", padding:8 }}>
          <PinIcon filled={pinned} size={22} />
        </button>

        <div style={{ fontFamily:"var(--font-body)", fontSize:11, letterSpacing:4, color:"var(--accent)", opacity:0.8, marginBottom:28 }}>TRUTHTAP</div>
        <div style={{ fontFamily:"var(--font-display)", fontSize:48, fontWeight:700, color:"var(--white)", marginBottom:12 }}>{perspective.stat}</div>
        <div style={{ fontFamily:"var(--font-body)", fontSize:15, color:"var(--text-secondary)", lineHeight:1.6, marginBottom:28, maxWidth:300, margin:"0 auto 28px" }}>{perspective.context}</div>

        {showQuestion && (
          <div style={{ animation:"fadeIn 0.5s ease" }}>
            <div style={{ width:40, height:1, background:"rgba(232,148,90,0.3)", margin:"0 auto 20px" }} />
            <div style={{ fontFamily:"var(--font-display)", fontSize:19, fontStyle:"italic", color:"var(--accent)", lineHeight:1.5, marginBottom:12 }}>{perspective.question}</div>
            {perspective.source && <div style={{ fontFamily:"var(--font-body)", fontSize:9, color:"var(--text-muted)", maxWidth:280, margin:"0 auto" }}>Source: {perspective.source}</div>}
          </div>
        )}

        <button onClick={onDismiss} style={{ marginTop:32, background:"none", border:"1px solid rgba(255,255,255,0.15)", borderRadius:100, padding:"12px 32px", color:"var(--text-tertiary)", fontFamily:"var(--font-body)", fontSize:12, letterSpacing:2, cursor:"pointer" }}>I HEAR YOU</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState("loading");
  const [modalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const [seenToday, setSeenToday] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [pinned, setPinned] = useState([]);
  const [history, setHistory] = useState([]);
  const [notifEnabled, setNotifEnabled] = useState(true);
  const tapCount = useRef(0);
  const tapTimer = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("tt_pinned");
      if (stored) setPinned(JSON.parse(stored));
      const hist = localStorage.getItem("tt_history");
      if (hist) setHistory(JSON.parse(hist));
      const daily = localStorage.getItem("tt_daily");
      if (daily) {
        const d = JSON.parse(daily);
        if (d.date === getTodayKey()) setSeenToday(true);
      }
      const onboarded = localStorage.getItem("tt_onboarded");
      setScreen(onboarded ? "home" : "splash");
    } catch(e) { setScreen("splash"); }

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => {
        console.log("[TruthTap] SW registered");
      });
    }
  }, []);

  const subscribeToPush = useCallback(async () => {
    try {
      if (!("Notification" in window)) return;
      const perm = await Notification.requestPermission();
      if (perm !== "granted") return;
      setNotifEnabled(true);

      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });
      console.log("[TruthTap] Push subscription saved");
    } catch (e) {
      console.error("Push subscription failed:", e);
    }
  }, []);

  const handleOnboard = useCallback(async () => {
    localStorage.setItem("tt_onboarded", "true");
    await subscribeToPush();
    setScreen("home");
  }, [subscribeToPush]);

  const handleLogoTap = useCallback(() => {
    tapCount.current += 1;
    clearTimeout(tapTimer.current);
    if (tapCount.current >= 5) {
      tapCount.current = 0;
      const next = !demoMode;
      setDemoMode(next);
      alert(next ? "Demo mode on — unlimited truths." : "Demo mode off — one truth per day.");
    } else {
      tapTimer.current = setTimeout(() => { tapCount.current = 0; }, 2000);
    }
  }, [demoMode]);

  const triggerTruth = useCallback(() => {
    if (!demoMode && seenToday) {
      const d = JSON.parse(localStorage.getItem("tt_daily") || "{}");
      if (d.perspective) { setCurrent(d.perspective); setModalVisible(true); }
      return;
    }
    const seen = JSON.parse(localStorage.getItem("tt_seen") || "[]");
    let pool = PERSPECTIVES.filter(p => !seen.includes(p.id));
    if (pool.length === 0) { pool = PERSPECTIVES; localStorage.setItem("tt_seen", "[]"); }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setCurrent(pick);
    setModalVisible(true);
    if (!demoMode) {
      localStorage.setItem("tt_daily", JSON.stringify({ date: getTodayKey(), perspective: pick }));
      setSeenToday(true);
    }
    const newSeen = [...seen, pick.id];
    localStorage.setItem("tt_seen", JSON.stringify(newSeen));
    const newHist = [{ ...pick, viewedAt: new Date().toISOString() }, ...history].slice(0, 30);
    setHistory(newHist);
    localStorage.setItem("tt_history", JSON.stringify(newHist));
  }, [demoMode, seenToday, history]);

  const togglePin = useCallback(() => {
    if (!current) return;
    const exists = pinned.some(p => p.id === current.id);
    let next;
    if (exists) {
      next = pinned.filter(p => p.id !== current.id);
    } else {
      next = [{ ...current, savedAt: new Date().toISOString() }, ...pinned];
    }
    setPinned(next);
    localStorage.setItem("tt_pinned", JSON.stringify(next));
  }, [current, pinned]);

  const isPinned = current && pinned.some(p => p.id === current.id);

  if (screen === "loading") return <div style={{ minHeight:"100dvh", background:"var(--bg)" }} />;

  if (screen === "splash") {
    return (
      <div style={{ minHeight:"100dvh", background:"var(--bg)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:40 }}>
        <div style={{ width:72, height:72, borderRadius:"50%", border:"2px solid var(--accent-border)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:40 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>
        </div>
        <h1 style={{ fontFamily:"var(--font-display)", fontSize:48, fontWeight:700, color:"var(--white)", marginBottom:16, letterSpacing:-1 }}>TruthTap</h1>
        <p style={{ fontFamily:"var(--font-body)", fontSize:14, color:"var(--text-tertiary)", letterSpacing:3, textTransform:"uppercase", marginBottom:60 }}>A daily reality check</p>
        <button onClick={handleOnboard} style={{ background:"linear-gradient(135deg, var(--accent), var(--accent-dark))", border:"none", borderRadius:100, padding:"18px 48px", color:"var(--white)", fontFamily:"var(--font-body)", fontSize:14, fontWeight:500, letterSpacing:3, textTransform:"uppercase", cursor:"pointer" }}>HIT ME</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100dvh", background:"var(--bg)" }}>
      {/* Header */}
      <div style={{ padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid var(--border)", position:"sticky", top:0, background:"var(--bg)", zIndex:10, paddingTop:"env(safe-area-inset-top, 16px)" }}>
        <div onClick={handleLogoTap} style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer" }}>
          <div style={{ width:36, height:36, borderRadius:"50%", border:"1.5px solid var(--accent-border)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>
          </div>
          <span style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:700, color:"var(--white)" }}>TruthTap</span>
          {demoMode && <span style={{ fontSize:9, letterSpacing:1, color:"var(--bg)", background:"var(--accent)", padding:"2px 6px", borderRadius:4 }}>DEMO</span>}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background: notifEnabled ? "var(--green)" : "#666" }} />
          <span style={{ fontFamily:"var(--font-body)", fontSize:11, letterSpacing:1, color:"var(--text-tertiary)" }}>{notifEnabled ? "ACTIVE" : "PAUSED"}</span>
        </div>
      </div>

      <div style={{ maxWidth:520, margin:"0 auto", padding:"36px 24px 40px" }}>
        {/* Hero */}
        <div style={{ textAlign:"center", marginBottom:48, animation:"slideUp 0.6s ease" }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:30, fontWeight:400, lineHeight:1.35, marginBottom:16 }}>
            Get over <em style={{ color:"var(--accent)" }}>yourself.</em>
          </h2>
          <p style={{ fontFamily:"var(--font-body)", fontSize:14, color:"var(--text-tertiary)", lineHeight:1.6 }}>
            One notification. Once a day.<br />A fact that'll make you feel stupid for complaining.
          </p>
        </div>

        {/* Truth Button */}
        <button onClick={triggerTruth} style={{ width:"100%", padding:20, background: seenToday && !demoMode ? "rgba(255,255,255,0.03)" : "var(--accent-faint)", border: `1px solid ${seenToday && !demoMode ? "var(--border-light)" : "var(--accent-border)"}`, borderRadius:20, cursor:"pointer", display:"flex", alignItems:"center", gap:16, marginBottom:44, textAlign:"left", color:"var(--white)" }}>
          <div style={{ width:48, height:48, borderRadius:14, background:"rgba(232,148,90,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
            {seenToday && !demoMode ? "✓" : "🔔"}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"var(--font-body)", fontSize:15, fontWeight:500, marginBottom:3 }}>
              {demoMode ? "Demo — tap for another truth" : seenToday ? "Today's truth" : "Get today's truth"}
            </div>
            <div style={{ fontFamily:"var(--font-body)", fontSize:13, color:"var(--text-tertiary)" }}>
              {demoMode ? "Unlimited mode active" : seenToday ? "Tap to revisit. Next truth tomorrow." : "Tap to get hit with reality"}
            </div>
          </div>
          <span style={{ fontSize:24, color:"var(--text-muted)" }}>›</span>
        </button>

        {/* Pinned */}
        {pinned.length > 0 && (
          <>
            <div style={{ fontFamily:"var(--font-body)", fontSize:11, letterSpacing:3, color:"var(--text-muted)", marginBottom:16 }}>PINNED TRUTHS</div>
            {pinned.map((s, i) => (
              <div key={`pin-${s.id}-${i}`} onClick={() => { setCurrent(s); setModalVisible(true); }} style={{ display:"flex", alignItems:"center", padding:"18px 18px 18px 0", borderRadius:16, background:"rgba(232,148,90,0.06)", border:"1px solid rgba(232,148,90,0.12)", marginBottom:10, cursor:"pointer", overflow:"hidden", gap:14 }}>
                <div style={{ width:4, alignSelf:"stretch", background:"var(--accent)", borderRadius:"16px 0 0 16px", flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, color:"var(--accent)", marginBottom:4 }}>{s.stat}</div>
                  <div style={{ fontFamily:"var(--font-body)", fontSize:13, color:"var(--text-tertiary)", lineHeight:1.5, overflow:"hidden", textOverflow:"ellipsis", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{s.context}</div>
                </div>
                <PinIcon filled size={16} />
              </div>
            ))}
          </>
        )}

        {/* History */}
        {history.length > 0 && (
          <>
            <div style={{ fontFamily:"var(--font-body)", fontSize:11, letterSpacing:3, color:"var(--text-muted)", marginBottom:16, marginTop:40 }}>RECENT TRUTHS</div>
            {history.slice(0, 15).map((h, i) => (
              <div key={`h-${h.id}-${i}`} onClick={() => { setCurrent(h); setModalVisible(true); }} style={{ padding:18, borderRadius:16, background:"rgba(255,255,255,0.03)", border:"1px solid var(--border)", marginBottom:10, cursor:"pointer" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <span style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:"var(--accent)" }}>{h.stat}</span>
                  <span style={{ fontFamily:"var(--font-body)", fontSize:10, color:"var(--text-muted)" }}>{new Date(h.viewedAt).toLocaleDateString([], { month:"short", day:"numeric" })}</span>
                </div>
                <div style={{ fontFamily:"var(--font-body)", fontSize:13, color:"var(--text-tertiary)", lineHeight:1.5, overflow:"hidden", textOverflow:"ellipsis", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{h.context}</div>
              </div>
            ))}
          </>
        )}

        <div style={{ textAlign:"center", padding:"48px 0 24px", color:"var(--text-ghost)", fontFamily:"var(--font-body)", fontSize:9, letterSpacing:2 }}>
          © {new Date().getFullYear()} TRUTHTAP. ALL RIGHTS RESERVED.
        </div>
      </div>

      <Modal visible={modalVisible} perspective={current} onDismiss={() => setModalVisible(false)} pinned={isPinned} onTogglePin={togglePin} />
    </div>
  );
}
