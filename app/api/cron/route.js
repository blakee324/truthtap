import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import webpush from "../../../lib/push.js";

const PERSPECTIVES = [
  { stat: "55,000", context: "people were diagnosed with cancer today.", question: "You're healthy and you spent today complaining about your boss." },
  { stat: "5,600", context: "people in the US were diagnosed with cancer today.", question: "One of them was in the car you honked at this morning." },
  { stat: "168,000", context: "people died today across the world.", question: "Every one of them had plans for tomorrow. You got yours. Use it." },
  { stat: "150,000", context: "families lost someone they love today.", question: "Everyone you love is still breathing. Act like it." },
  { stat: "2,000", context: "people took their own life today.", question: "If you're struggling, say something. If you're not, ask someone." },
  { stat: "2.2 billion", context: "people worldwide have a vision impairment.", question: "You're reading this on a device that costs more than some of them earn in a year." },
  { stat: "1 in 8", context: "people globally live with a mental health disorder.", question: "Someone near you is drowning and smiling. Ask them how they're really doing." },
  { stat: "3.2 million", context: "people die every year from household air pollution.", question: "You complain about your house. Theirs is killing them." },
  { stat: "1,700", context: "people in the US died from cancer today. One every 50 seconds.", question: "Someone's parent didn't come home tonight. Hug yours." },
  { stat: "295 million", context: "people faced acute hunger across 53 countries this year.", question: "You threw out leftovers this week." },
  { stat: "700 million", context: "people survive on less than $2.15 a day. Not per meal. Per day.", question: "You spent more than that on coffee this morning." },
  { stat: "45 million", context: "children under 5 suffer from wasting due to severe malnutrition.", question: "You skipped lunch because you 'weren't in the mood.'" },
  { stat: "730 million", context: "people live without any access to electricity.", question: "You're mad about a loading screen." },
  { stat: "2.2 billion", context: "people lack access to safely managed drinking water.", question: "You left clean water running while you brushed your teeth." },
  { stat: "3.4 billion", context: "people don't have access to safely managed sanitation.", question: "You're on your phone in the bathroom right now and don't even think about it." },
  { stat: "273 million", context: "children and young people worldwide are out of school.", question: "You had every opportunity to learn and you scrolled your phone for 4 hours today." },
  { stat: "138 million", context: "children are engaged in child labour globally.", question: "They're in mines and fields. Your kid's biggest problem is homework." },
  { stat: "54 million", context: "children are in hazardous work that could kill or permanently injure them.", question: "They're not old enough to drive, but they're old enough to die at work." },
  { stat: "12 million", context: "girls under 18 are forced into marriage every year.", question: "You chose what to have for dinner tonight. That's a luxury they'll never have." },
  { stat: "50 million", context: "people are in modern slavery — forced labour or forced marriage.", question: "You're free and you're wasting it." },
  { stat: "122 million", context: "people have been forcibly displaced from their homes.", question: "You have a bed tonight. Millions would trade everything for that." },
  { stat: "44,000+", context: "species are threatened with extinction on the IUCN Red List.", question: "Your problems are temporary. Extinction isn't." },
  { stat: "1 in 3", context: "women worldwide have experienced physical or sexual violence.", question: "She might be someone you know. She probably is." },
  { stat: "5,600", context: "people found out they have cancer today in the US alone.", question: "You called one of them an idiot for driving too slow this morning." },
  { stat: "2,000", context: "people died by suicide today.", question: "You don't know what that person you were rude to is going home to." },
  { stat: "150,000", context: "people died today.", question: "You ignored a call from someone who loves you because you couldn't be bothered." },
  { stat: "55,000", context: "people were told they have cancer today.", question: "The cashier you snapped at might have been one of them." },
  { stat: "168,000", context: "people died today.", question: "You walked past someone without a second look. It might have been their last day." },
  { stat: "2,000", context: "people ended their own life today.", question: "That person you cut off in traffic might be barely holding on." },
  { stat: "1 in 8", context: "people are living with a mental health condition right now.", question: "Your coworker asked how you were. You said 'fine' and didn't ask back." },
  { stat: "1,700", context: "Americans died from cancer today.", question: "The driver you swore at might be racing to say goodbye to one of them." },
];

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const perspective = PERSPECTIVES[Math.floor(Math.random() * PERSPECTIVES.length)];

    const keys = await redis.keys("sub:*");
    let sent = 0;
    let failed = 0;

    for (const key of keys) {
      try {
        const sub = await redis.get(key);
        const subscription = typeof sub === "string" ? JSON.parse(sub) : sub;

        await webpush.sendNotification(
          subscription,
          JSON.stringify({
            title: perspective.stat,
            body: perspective.context + " " + perspective.question,
          })
        );
        sent++;
      } catch (err) {
        if (err.statusCode === 404 || err.statusCode === 410) {
          await redis.del(key);
        }
        failed++;
      }
    }

    return NextResponse.json({ sent, failed, total: keys.length });
  } catch (error) {
    console.error("Cron error:", error);
    return NextResponse.json({ error: "Failed to send notifications" }, { status: 500 });
  }
}