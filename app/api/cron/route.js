import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import webpush from "../../../lib/push.js";
const PERSPECTIVES = [
  { stat: "55,000", context: "people were diagnosed with cancer today.", question: "You're healthy and you spent today complaining about your boss." },
  { stat: "5,600", context: "people in the US were diagnosed with cancer today.", question: "One of them was in the car you honked at this morning." },
  { stat: "295 million", context: "people faced acute hunger across 53 countries this year.", question: "You threw out leftovers this week." },
  { stat: "700 million", context: "people survive on less than $2.15 a day. Not per meal. Per day.", question: "You spent more than that on coffee this morning." },
  { stat: "45 million", context: "children under 5 suffer from wasting due to severe malnutrition.", question: "You skipped lunch because you 'weren't in the mood.'" },
  { stat: "3.2 million", context: "people die every year from household air pollution.", question: "You complain about your house. Theirs is killing them." },
  { stat: "730 million", context: "people live without any access to electricity.", question: "You're mad about a loading screen." },
  { stat: "2.2 billion", context: "people lack access to safely managed drinking water.", question: "You left clean water running while you brushed your teeth." },
  { stat: "3.4 billion", context: "people don't have access to safely managed sanitation.", question: "You're on your phone in the bathroom right now. 3.4 billion people don't have one." },
  { stat: "138 million", context: "children are engaged in child labour globally.", question: "They're in mines and fields. Your kid's biggest problem is homework." },
  { stat: "54 million", context: "children are in hazardous work that could kill or permanently injure them.", question: "Your kid complained about chores. These kids are losing fingers in factories." },
  { stat: "12 million", context: "girls under 18 are forced into marriage every year.", question: "You spent 10 minutes deciding what to eat tonight. They never got to decide anything." },
  { stat: "122 million", context: "people have been forcibly displaced from their homes.", question: "You have a bed tonight. Millions would trade everything for that." },
  { stat: "1,000", context: "children under 5 die every day from unsafe water and sanitation.", question: "A kid died from dirty water in the time it took you to read this." },
  { stat: "22 million", context: "people are in forced marriages globally.", question: "You swiped left 50 times today because nobody was good enough." },
  { stat: "1,700", context: "Americans died from cancer today.", question: "The driver you swore at might be racing to say goodbye to one of them." },
  { stat: "27,000", context: "people die from cancer every single day globally.", question: "You complained about a headache today." },
  { stat: "49,000", context: "people died from heart disease today.", question: "You said you'd start exercising 'next Monday' for the third time." },
  { stat: "55 million", context: "people are living with dementia worldwide.", question: "You forgot to reply to a text. They're forgetting their own children's names." },
  { stat: "6,300", context: "newborns die every single day. Most from preventable causes.", question: "You moaned about broken sleep last night. A parent held their baby for the first and last time today." },
  { stat: "1,600", context: "people died from malaria today. Most of them were children under 5.", question: "They died from a mosquito bite. Your biggest problem today was a slow elevator." },
  { stat: "783 million", context: "people went hungry in 2022.", question: "You scrolled past three food delivery apps trying to decide what you were 'in the mood for.'" },
  { stat: "28 million", context: "people are in forced labour right now.", question: "Someone made the clothes you're wearing. They might not have had a choice." },
  { stat: "356 million", context: "children live in extreme poverty.", question: "They've never had a birthday cake. Your kid cried because theirs was the wrong colour." },
  { stat: "168,000", context: "people died today. Not one of them saw it coming.", question: "You assume you'll wake up tomorrow. 168,000 people made that same assumption this morning." },
  { stat: "650 million", context: "women alive today were married before they turned 18.", question: "You look back on your teenage years fondly. 650 million women never got to have them." },
  { stat: "137", context: "women are killed by a family member every single day.", question: "You locked your door tonight and felt safe. 137 women were killed by the person inside theirs." },
  { stat: "2", context: "famines were officially declared in the last year. In Sudan and Gaza.", question: "You said you were 'starving' before dinner." },
  { stat: "800", context: "women died in childbirth today.", question: "Giving birth killed them. You complained about a doctor's waiting room." },
  { stat: "150,000", context: "people died today from illness, accidents, and violence.", question: "You ignored a call from someone who loves you because you couldn't be bothered." },
  { stat: "50 million", context: "people are in modern slavery — forced labour or forced marriage.", question: "You complained about your boss today. 50 million people can't quit. Can't leave. Can't say no." },
  { stat: "2,000 parents", context: "buried their child today.", question: "You yelled at yours for spilling something." },
  { stat: "13,400", context: "children under 5 died today from preventable causes.", question: "Most of them from diseases you got vaccinated for as a kid." },
  { stat: "106 million", context: "people drink water directly from untreated rivers and lakes.", question: "Your tap water is cleaner than what entire countries dream of." },
  { stat: "617 million", context: "children and adolescents worldwide cannot read a simple sentence or do basic maths.", question: "You have a library in your pocket. You used it to watch cat videos." },
  { stat: "1.2 billion", context: "people live in acute multidimensional poverty.", question: "They lack basic health, education, and living standards. You have all three and still found something to moan about." },
  { stat: "43 million", context: "people worldwide are completely blind and will never see again.", question: "They would give anything to see their family's face one more time. You looked at yours and reached for your phone." },
  { stat: "87 million", context: "children in Sub-Saharan Africa are in child labour.", question: "You complained about your workload today. 87 million children would trade their job for yours." }
];
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const perspective = PERSPECTIVES[Math.floor(Math.random() * PERSPECTIVES.length)];
    const keys = await redis.keys("sub:*");
    let sent = 0, failed = 0;
    for (const key of keys) {
      try {
        const sub = await redis.get(key);
        const subscription = typeof sub === "string" ? JSON.parse(sub) : sub;
        await webpush.sendNotification(subscription, JSON.stringify({ title: "TruthTap", body: perspective.stat + " — " + perspective.context + " " + perspective.question }));
        sent++;
      } catch (err) { if (err.statusCode === 404 || err.statusCode === 410) await redis.del(key); failed++; }
    }
    return NextResponse.json({ sent, failed, total: keys.length });
  } catch (error) { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}