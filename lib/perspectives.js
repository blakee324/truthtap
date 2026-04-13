// All stats are verified and sourced from major international organizations.
// Context = FACT ONLY. Question = the gut-punch.
// © 2026 TruthTap. All rights reserved.
// Last updated: April 2026

const PERSPECTIVES = [
  // ═══════════════════════════════════════
  // HEALTH & MORTALITY
  // ═══════════════════════════════════════
  {
    id: 1,
    stat: "55,000",
    context: "people were diagnosed with cancer today.",
    question: "You're healthy and you spent today complaining about your boss.",
    source: "WHO/IARC — 20M new cases per year globally (2022)",
    category: "health",
  },
  {
    id: 2,
    stat: "5,600",
    context: "people in the US were diagnosed with cancer today.",
    question: "One of them was in the car you honked at this morning.",
    source: "American Cancer Society — 2,041,910 new US cases in 2025",
    category: "health",
  },
  {
    id: 3,
    stat: "168,000",
    context: "people died today across the world.",
    question: "Every one of them had plans for tomorrow. You got yours. Use it.",
    source: "UN Population Division — global daily mortality",
    category: "health",
  },
  {
    id: 4,
    stat: "150,000",
    context: "families lost someone they love today.",
    question: "Everyone you love is still breathing. Act like it.",
    source: "UN Population Division — ~150K global deaths per day",
    category: "health",
  },
  {
    id: 5,
    stat: "2,000",
    context: "people took their own life today.",
    question: "If you're struggling, say something. If you're not, ask someone.",
    source: "WHO — 727,000 suicides per year (2021)",
    category: "health",
  },
  {
    id: 6,
    stat: "2.2 billion",
    context: "people worldwide have a vision impairment.",
    question: "You're reading this on a device that costs more than some of them earn in a year.",
    source: "WHO — 2.2B with vision impairment globally",
    category: "health",
  },
  {
    id: 7,
    stat: "1 in 8",
    context: "people globally live with a mental health disorder.",
    question: "Someone near you is drowning and smiling. Ask them how they're really doing.",
    source: "WHO — 970M+ people worldwide (2022)",
    category: "health",
  },
  {
    id: 8,
    stat: "3.2 million",
    context: "people die every year from household air pollution.",
    question: "You complain about your house. Theirs is killing them.",
    source: "WHO — deaths from household air pollution annually",
    category: "health",
  },
  {
    id: 9,
    stat: "1,700",
    context: "people in the US died from cancer today. One every 50 seconds.",
    question: "Someone's parent didn't come home tonight. Hug yours.",
    source: "ACS — 618,120 US cancer deaths projected in 2025",
    category: "health",
  },

  // ═══════════════════════════════════════
  // HUNGER & POVERTY
  // ═══════════════════════════════════════
  {
    id: 10,
    stat: "295 million",
    context: "people faced acute hunger across 53 countries this year.",
    question: "You threw out leftovers this week.",
    source: "UN World Food Programme — 295M across 53 countries (2024)",
    category: "poverty",
  },
  {
    id: 11,
    stat: "700 million",
    context: "people survive on less than $2.15 a day. Not per meal. Per day.",
    question: "You spent more than that on coffee this morning.",
    source: "World Bank — extreme poverty line (2024)",
    category: "poverty",
  },
  {
    id: 12,
    stat: "45 million",
    context: "children under 5 suffer from wasting due to severe malnutrition.",
    question: "You skipped lunch because you 'weren't in the mood.'",
    source: "WHO — child wasting, global nutrition report",
    category: "poverty",
  },
  {
    id: 13,
    stat: "2",
    context: "famines were officially declared in the last year. In Sudan and Gaza.",
    question: "You said you were 'starving' before dinner.",
    source: "IPC — confirmed famines in Sudan and Gaza (2024-2025)",
    category: "poverty",
  },

  // ═══════════════════════════════════════
  // BASIC NEEDS
  // ═══════════════════════════════════════
  {
    id: 14,
    stat: "730 million",
    context: "people live without any access to electricity.",
    question: "You're mad about a loading screen.",
    source: "IEA — 730M without access (2024)",
    category: "poverty",
  },
  {
    id: 15,
    stat: "2.2 billion",
    context: "people lack access to safely managed drinking water.",
    question: "You left clean water running while you brushed your teeth.",
    source: "WHO/UNICEF — 2.2B lack safely managed water (2024)",
    category: "poverty",
  },
  {
    id: 16,
    stat: "3.4 billion",
    context: "people don't have access to safely managed sanitation.",
    question: "You're on your phone in the bathroom right now and don't even think about it.",
    source: "WHO/UNICEF — 3.4B lack safely managed sanitation (2024)",
    category: "poverty",
  },

  // ═══════════════════════════════════════
  // EDUCATION & CHILDREN
  // ═══════════════════════════════════════
  {
    id: 17,
    stat: "273 million",
    context: "children and young people worldwide are out of school.",
    question: "You had every opportunity to learn and you scrolled your phone for 4 hours today.",
    source: "UNESCO — 273M out of school (2024)",
    category: "freedom",
  },
  {
    id: 18,
    stat: "138 million",
    context: "children are engaged in child labour globally.",
    question: "They're in mines and fields. Your kid's biggest problem is homework.",
    source: "ILO/UNICEF — 138M in child labour (2024)",
    category: "freedom",
  },
  {
    id: 19,
    stat: "54 million",
    context: "children are in hazardous work that could kill or permanently injure them.",
    question: "They're not old enough to drive, but they're old enough to die at work.",
    source: "ILO/UNICEF — 54M in hazardous child labour (2024)",
    category: "freedom",
  },
  {
    id: 20,
    stat: "12 million",
    context: "girls under 18 are forced into marriage every year.",
    question: "You chose what to have for dinner tonight. That's a luxury they'll never have.",
    source: "UNICEF — 12M child marriages annually",
    category: "freedom",
  },

  // ═══════════════════════════════════════
  // FREEDOM & DISPLACEMENT
  // ═══════════════════════════════════════
  {
    id: 21,
    stat: "50 million",
    context: "people are in modern slavery — forced labour or forced marriage.",
    question: "You're free and you're wasting it.",
    source: "ILO — 50M in forced labour or forced marriage (2021)",
    category: "freedom",
  },
  {
    id: 22,
    stat: "122 million",
    context: "people have been forcibly displaced from their homes.",
    question: "You have a bed tonight. Millions would trade everything for that.",
    source: "UNHCR — 122M+ forcibly displaced (2024)",
    category: "freedom",
  },
  {
    id: 23,
    stat: "43 million",
    context: "forcibly displaced people are children.",
    question: "Kids with no home, no school, no safety. Your kid complained about their bedroom.",
    source: "UNHCR — refugee children (2024)",
    category: "freedom",
  },

  // ═══════════════════════════════════════
  // ENVIRONMENT
  // ═══════════════════════════════════════
  {
    id: 24,
    stat: "44,000+",
    context: "species are threatened with extinction on the IUCN Red List.",
    question: "Your problems are temporary. Extinction isn't.",
    source: "IUCN Red List — 44,000+ threatened species",
    category: "environment",
  },
  {
    id: 25,
    stat: "1 million",
    context: "animal and plant species are at risk of extinction due to human activity.",
    question: "We're the asteroid. Let that sink in.",
    source: "IPBES — 1M species at risk (2019 Global Assessment)",
    category: "environment",
  },

  // ═══════════════════════════════════════
  // DAILY REALITY CHECKS
  // ═══════════════════════════════════════
  {
    id: 26,
    stat: "1 in 3",
    context: "women worldwide have experienced physical or sexual violence.",
    question: "She might be someone you know. She probably is.",
    source: "WHO — violence against women (2021)",
    category: "health",
  },
  {
    id: 27,
    stat: "10 million",
    context: "people contracted tuberculosis last year. It is a curable disease.",
    question: "They're dying because they can't afford $20 worth of medicine.",
    source: "WHO — Global TB Report (2024)",
    category: "health",
  },
  {
    id: 28,
    stat: "39 million",
    context: "people are living with HIV globally.",
    question: "You put off that doctor's appointment again, didn't you?",
    source: "UNAIDS — people living with HIV globally (2023)",
    category: "health",
  },
  {
    id: 29,
    stat: "1,000",
    context: "children under 5 die every day from unsafe water and sanitation.",
    question: "A kid died from dirty water in the time it took you to read this.",
    source: "WHO — preventable child deaths from unsafe WASH",
    category: "poverty",
  },
  {
    id: 30,
    stat: "22 million",
    context: "people are in forced marriages globally.",
    question: "You swiped left 50 times today because nobody was good enough.",
    source: "ILO — forced marriages within modern slavery estimate (2021)",
    category: "freedom",
  },
  {
    id: 31,
    stat: "87 million",
    context: "children in Sub-Saharan Africa are in child labour.",
    question: "That's nearly the population of Germany. Working. Not learning. Not playing.",
    source: "ILO — Sub-Saharan Africa child labour (2024)",
    category: "freedom",
  },

  // ═══════════════════════════════════════
  // HOW YOU TREAT OTHERS
  // ═══════════════════════════════════════
  {
    id: 32,
    stat: "5,600",
    context: "people found out they have cancer today in the US alone.",
    question: "You called one of them an idiot for driving too slow this morning.",
    source: "American Cancer Society — 2,041,910 new US cases in 2025",
    category: "health",
  },
  {
    id: 33,
    stat: "1 in 8",
    context: "people live with a mental health disorder.",
    question: "You told one of them to 'just get over it' last week.",
    source: "WHO — 970M+ people worldwide (2022)",
    category: "health",
  },
  {
    id: 34,
    stat: "2,000",
    context: "people died by suicide today.",
    question: "You don't know what that person you were rude to is going home to.",
    source: "WHO — 727,000 suicides per year (2021)",
    category: "health",
  },
  {
    id: 35,
    stat: "150,000",
    context: "people died today.",
    question: "You ignored a call from someone who loves you because you couldn't be bothered.",
    source: "UN Population Division — ~150K global deaths per day",
    category: "health",
  },
  {
    id: 36,
    stat: "1 in 3",
    context: "women have experienced physical or sexual violence in their lifetime.",
    question: "You laughed at a joke about one of them yesterday.",
    source: "WHO — violence against women (2021)",
    category: "health",
  },
  {
    id: 37,
    stat: "55,000",
    context: "people were told they have cancer today.",
    question: "The cashier you snapped at might have been one of them.",
    source: "WHO/IARC — 20M new cases per year globally (2022)",
    category: "health",
  },
  {
    id: 38,
    stat: "168,000",
    context: "people died today.",
    question: "You walked past someone without a second look. It might have been their last day.",
    source: "UN Population Division — global daily mortality",
    category: "health",
  },
  {
    id: 39,
    stat: "2,000",
    context: "people ended their own life today.",
    question: "That person you cut off in traffic might be barely holding on.",
    source: "WHO — 727,000 suicides per year (2021)",
    category: "health",
  },
  {
    id: 40,
    stat: "1 in 8",
    context: "people are living with a mental health condition right now.",
    question: "Your coworker asked how you were. You said 'fine' and didn't ask back.",
    source: "WHO — 970M+ people worldwide (2022)",
    category: "health",
  },
  {
    id: 41,
    stat: "55,000",
    context: "families received a cancer diagnosis today.",
    question: "You left someone on read for 6 hours because you 'forgot.'",
    source: "WHO/IARC — 20M new cases per year globally (2022)",
    category: "health",
  },
  {
    id: 42,
    stat: "150,000",
    context: "people took their last breath today.",
    question: "The stranger you gave a dirty look to on the train is someone's whole world.",
    source: "UN Population Division — ~150K global deaths per day",
    category: "health",
  },
  {
    id: 43,
    stat: "39 million",
    context: "people are living with HIV.",
    question: "You judged someone today without knowing a single thing about their life.",
    source: "UNAIDS — people living with HIV globally (2023)",
    category: "health",
  },
  {
    id: 44,
    stat: "1,700",
    context: "Americans died from cancer today.",
    question: "The driver you swore at might be racing to say goodbye to one of them.",
    source: "ACS — 618,120 US cancer deaths projected in 2025",
    category: "health",
  },
];

export const CATEGORIES = ["All", "Health", "Poverty", "Freedom", "Environment"];

export const getCategoryKey = (label) => {
  const map = { All: "all", Health: "health", Poverty: "poverty", Freedom: "freedom", Environment: "environment" };
  return map[label] || "all";
};

export const getFilteredPerspectives = (category) => {
  if (category === "all" || category === "All") return PERSPECTIVES;
  return PERSPECTIVES.filter((p) => p.category === getCategoryKey(category));
};

export default PERSPECTIVES;
