"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const PERSPECTIVES = [
  { id:1, stat:"55,000", context:"people were diagnosed with cancer today.", question:"You're healthy and you spent today complaining about your boss.", source:"WHO/IARC — 20M new cases per year globally (2022)", category:"health" },
  { id:2, stat:"5,600", context:"people in the US were diagnosed with cancer today.", question:"One of them was in the car you honked at this morning.", source:"American Cancer Society — 2,041,910 new US cases in 2025", category:"health" },
  { id:3, stat:"168,000", context:"people died today across the world.", question:"Every one of them had plans for tomorrow. You got yours. Use it.", source:"UN Population Division — global daily mortality", category:"health" },
  { id:4, stat:"150,000", context:"families lost someone they love today.", question:"Everyone you love is still breathing. Act like it.", source:"UN Population Division — ~150K global deaths per day", category:"health" },
  { id:5, stat:"2,000", context:"people took their own life today.", question:"You spent today complaining about your commute. They spent today trying to survive it.", source:"WHO — 727,000 suicides per year (2021)", category:"health" },
  { id:6, stat:"2.2 billion", context:"people worldwide have a vision impairment.", question:"You're reading this on a device that costs more than some of them earn in a year.", source:"WHO — 2.2B with vision impairment globally", category:"health" },
  { id:7, stat:"1 in 8", context:"people globally live with a mental health disorder.", question:"You walked past one of them today. You didn't notice. Nobody does.", source:"WHO — 970M+ people worldwide (2022)", category:"health" },
  { id:8, stat:"3.2 million", context:"people die every year from household air pollution.", question:"You complain about your house. Theirs is killing them.", source:"WHO — deaths from household air pollution annually", category:"health" },
  { id:9, stat:"1,700", context:"people in the US died from cancer today. One every 50 seconds.", question:"You argued with yours over something you won't remember next week.", source:"ACS — 618,120 US cancer deaths projected in 2025", category:"health" },
  { id:10, stat:"295 million", context:"people faced acute hunger across 53 countries this year.", question:"You threw out leftovers this week.", source:"UN World Food Programme — 295M across 53 countries (2024)", category:"poverty" },
  { id:11, stat:"700 million", context:"people survive on less than $2.15 a day. Not per meal. Per day.", question:"You spent more than that on coffee this morning.", source:"World Bank — extreme poverty line (2024)", category:"poverty" },
  { id:12, stat:"45 million", context:"children under 5 suffer from wasting due to severe malnutrition.", question:"You skipped lunch because you 'weren't in the mood.'", source:"WHO — child wasting, global nutrition report", category:"poverty" },
  { id:13, stat:"2", context:"famines were officially declared in the last year. In Sudan and Gaza.", question:"You said you were 'starving' before dinner.", source:"IPC — confirmed famines in Sudan and Gaza (2024-2025)", category:"poverty" },
  { id:14, stat:"730 million", context:"people live without any access to electricity.", question:"You're mad about a loading screen.", source:"IEA — 730M without access (2024)", category:"poverty" },
  { id:15, stat:"2.2 billion", context:"people lack access to safely managed drinking water.", question:"You left clean water running while you brushed your teeth.", source:"WHO/UNICEF — 2.2B lack safely managed water (2024)", category:"poverty" },
  { id:16, stat:"3.4 billion", context:"people don't have access to safely managed sanitation.", question:"You're on your phone in the bathroom right now and don't even think about it.", source:"WHO/UNICEF — 3.4B lack safely managed sanitation (2024)", category:"poverty" },
  { id:17, stat:"273 million", context:"children and young people worldwide are out of school.", question:"You had every opportunity to learn and you scrolled your phone for 4 hours today.", source:"UNESCO — 273M out of school (2024)", category:"freedom" },
  { id:18, stat:"138 million", context:"children are engaged in child labour globally.", question:"They're in mines and fields. Your kid's biggest problem is homework.", source:"ILO/UNICEF — 138M in child labour (2024)", category:"freedom" },
  { id:19, stat:"54 million", context:"children are in hazardous work that could kill or permanently injure them.", question:"They're not old enough to drive, but they're old enough to die at work.", source:"ILO/UNICEF — 54M in hazardous child labour (2024)", category:"freedom" },
  { id:20, stat:"12 million", context:"girls under 18 are forced into marriage every year.", question:"You chose what to have for dinner tonight. That's a luxury they'll never have.", source:"UNICEF — 12M child marriages annually", category:"freedom" },
  { id:21, stat:"50 million", context:"people are in modern slavery — forced labour or forced marriage.", question:"You're free and you're wasting it.", source:"ILO — 50M in forced labour or forced marriage (2021)", category:"freedom" },
  { id:22, stat:"122 million", context:"people have been forcibly displaced from their homes.", question:"You have a bed tonight. Millions would trade everything for that.", source:"UNHCR — 122M+ forcibly displaced (2024)", category:"freedom" },
  { id:23, stat:"43 million", context:"forcibly displaced people are children.", question:"Kids with no home, no school, no safety. Your kid complained about their bedroom.", source:"UNHCR — refugee children (2024)", category:"freedom" },
  { id:24, stat:"13", context:"people in the US died today waiting for an organ transplant.", question:"You haven't registered as a donor. It costs you nothing and saves 8 lives.", source:"UNOS — US transplant waitlist deaths (2023)", category:"health" },
  { id:25, stat:"3,200", context:"people were killed in road crashes today. One every 27 seconds.", question:"You checked your phone while driving this week.", source:"WHO — 1.19M road deaths/year (2021)", category:"health" },
  { id:26, stat:"1 in 3", context:"women worldwide have experienced physical or sexual violence.", question:"She might be someone you know. She probably is.", source:"WHO — violence against women (2021)", category:"health" },
  { id:27, stat:"10 million", context:"people contracted tuberculosis last year. It is a curable disease.", question:"They're dying because they can't afford $20 worth of medicine.", source:"WHO — Global TB Report (2024)", category:"health" },
  { id:28, stat:"39 million", context:"people are living with HIV globally.", question:"You put off that doctor's appointment again, didn't you?", source:"UNAIDS — people living with HIV globally (2023)", category:"health" },
  { id:29, stat:"1,000", context:"children under 5 die every day from unsafe water and sanitation.", question:"A kid died from dirty water in the time it took you to read this.", source:"WHO — preventable child deaths from unsafe WASH", category:"poverty" },
  { id:30, stat:"22 million", context:"people are in forced marriages globally.", question:"You swiped left 50 times today because nobody was good enough.", source:"ILO — forced marriages within modern slavery estimate (2021)", category:"freedom" },
  { id:31, stat:"87 million", context:"children in Sub-Saharan Africa are in child labour.", question:"That's nearly the population of Germany. Working. Not learning. Not playing.", source:"ILO — Sub-Saharan Africa child labour (2024)", category:"freedom" },
  { id:32, stat:"5,600", context:"people found out they have cancer today in the US alone.", question:"You called one of them an idiot for driving too slow this morning.", source:"American Cancer Society — 2,041,910 new US cases in 2025", category:"health" },
  { id:33, stat:"1 in 8", context:"people live with a mental health disorder.", question:"You told one of them to 'just get over it' last week.", source:"WHO — 970M+ people worldwide (2022)", category:"health" },
  { id:34, stat:"2,000", context:"people died by suicide today.", question:"You don't know what that person you were rude to is going home to.", source:"WHO — 727,000 suicides per year (2021)", category:"health" },
  { id:35, stat:"150,000", context:"people died today.", question:"You ignored a call from someone who loves you because you couldn't be bothered.", source:"UN Population Division — ~150K global deaths per day", category:"health" },
  { id:36, stat:"1 in 3", context:"women have experienced physical or sexual violence in their lifetime.", question:"You laughed at a joke about one of them yesterday.", source:"WHO — violence against women (2021)", category:"health" },
  { id:37, stat:"55,000", context:"people were told they have cancer today.", question:"The cashier you snapped at might have been one of them.", source:"WHO/IARC — 20M new cases per year globally (2022)", category:"health" },
  { id:38, stat:"168,000", context:"people died today.", question:"You walked past someone without a second look. It might have been their last day.", source:"UN Population Division — global daily mortality", category:"health" },
  { id:39, stat:"2,000", context:"people ended their own life today.", question:"That person you cut off in traffic might be barely holding on.", source:"WHO — 727,000 suicides per year (2021)", category:"health" },
  { id:40, stat:"1 in 8", context:"people are living with a mental health condition right now.", question:"Your coworker asked how you were. You said 'fine' and didn't ask back.", source:"WHO — 970M+ people worldwide (2022)", category:"health" },
  { id:41, stat:"55,000", context:"families received a cancer diagnosis today.", question:"You left someone on read for 6 hours because you 'forgot.'", source:"WHO/IARC — 20M new cases per year globally (2022)", category:"health" },
  { id:42, stat:"150,000", context:"people took their last breath today.", question:"The stranger you gave a dirty look to on the train is someone's whole world.", source:"UN Population Division — ~150K global deaths per day", category:"health" },
  { id:43, stat:"39 million", context:"people are living with HIV.", question:"You judged someone today without knowing a single thing about their life.", source:"UNAIDS — people living with HIV globally (2023)", category:"health" },
  { id:44, stat:"1,700", context:"Americans died from cancer today.", question:"The driver you swore at might be racing to say goodbye to one of them.", source:"ACS — 618,120 US cancer deaths projected in 2025", category:"health" },
  { id:45, stat:"27,000", context:"people die from cancer every single day globally.", question:"You complained about a headache today.", source:"WHO — 9.7M cancer deaths/year (2022)", category:"health" },
  { id:46, stat:"3,200", context:"people were killed in road crashes today. One every 27 seconds.", question:"Someone's kid didn't come home from school because a driver wasn't paying attention.", source:"WHO — 1.19M road deaths/year (2021)", category:"health" },
  { id:47, stat:"1.19 million", context:"people are killed in road crashes every year.", question:"Road crashes are the leading cause of death for people aged 5-29. Think about that next time you speed.", source:"WHO — Global Status Report on Road Safety (2023)", category:"health" },
  { id:48, stat:"49,000", context:"people died from heart disease today.", question:"You said you'd start exercising 'next Monday' for the third time.", source:"WHO — 17.9M cardiovascular deaths/year", category:"health" },
  { id:49, stat:"537 million", context:"adults are living with diabetes worldwide.", question:"You complained about having to cook dinner tonight.", source:"IDF — Diabetes Atlas (2021)", category:"health" },
  { id:50, stat:"55 million", context:"people are living with dementia worldwide.", question:"Someone is forgetting their own child's name right now.", source:"WHO/ADI — 55M with dementia (2020)", category:"health" },
  { id:51, stat:"1", context:"person develops dementia every 3 seconds.", question:"By the time you finish reading this, someone just lost a piece of who they are.", source:"Alzheimer's Disease International", category:"health" },
  { id:52, stat:"280 million", context:"people worldwide suffer from depression.", question:"Some of them smiled at you today and you had no idea.", source:"WHO — depression global estimates (2023)", category:"health" },
  { id:53, stat:"301 million", context:"people live with an anxiety disorder.", question:"That person who cancelled plans on you might be fighting to leave their house.", source:"WHO — anxiety disorders global (2023)", category:"health" },
  { id:54, stat:"800", context:"women die every day from preventable causes related to pregnancy and childbirth.", question:"Having a baby shouldn't be a death sentence. For 800 women today, it was.", source:"WHO — maternal mortality (2023)", category:"health" },
  { id:55, stat:"6,300", context:"newborns die every single day. Most from preventable causes.", question:"A parent is holding their baby for the first and last time right now.", source:"WHO/UNICEF — 2.3M neonatal deaths/year", category:"health" },
  { id:56, stat:"13,400", context:"children under 5 died today.", question:"Most of them from diseases you got vaccinated for as a kid.", source:"WHO/UNICEF — 4.9M under-5 deaths/year (2022)", category:"health" },
  { id:57, stat:"13", context:"people in the US died today waiting for an organ transplant.", question:"You haven't registered as an organ donor. It costs you nothing and saves 8 lives.", source:"UNOS — US transplant waitlist deaths (2023)", category:"health" },
  { id:58, stat:"100,000+", context:"people in the US are on the organ transplant waiting list right now.", question:"One donor can save 8 lives. You could be that person and it costs you nothing.", source:"UNOS — US transplant waiting list (2024)", category:"health" },
  { id:59, stat:"1,600", context:"people died from malaria today. Most of them were children under 5.", question:"They died from a mosquito bite. Your biggest problem today was a slow elevator.", source:"WHO — ~600,000 malaria deaths/year (2022)", category:"health" },
  { id:60, stat:"137", context:"women are killed by a family member every single day.", question:"Home isn't safe for everyone.", source:"UNODC — gender-related killings (2023)", category:"health" },
  { id:61, stat:"43 million", context:"people worldwide are blind.", question:"They would give anything to see their family's face one more time. You looked at yours and reached for your phone.", source:"WHO — global blindness estimates", category:"health" },
  { id:62, stat:"783 million", context:"people went hungry in 2022.", question:"You scrolled past three food delivery apps trying to decide what you were 'in the mood for.'", source:"FAO — State of Food Security (2023)", category:"poverty" },
  { id:63, stat:"295 million", context:"people are facing acute food insecurity right now.", question:"You let fruit go bad in your fridge this week.", source:"WFP — 295M across 53 countries (2024)", category:"poverty" },
  { id:64, stat:"700 million", context:"people wouldn't be able to buy what's in your shopping basket.", question:"Your 'budget' is their fantasy.", source:"World Bank — extreme poverty line (2024)", category:"poverty" },
  { id:65, stat:"106 million", context:"people drink water directly from untreated rivers and lakes.", question:"Your tap water is cleaner than what entire countries dream of.", source:"WHO/UNICEF — JMP Report (2025)", category:"poverty" },
  { id:66, stat:"730 million", context:"people have never charged a phone, turned on a light, or opened a fridge.", question:"You got frustrated because your battery dropped to 10%.", source:"IEA — 730M without access (2024)", category:"poverty" },
  { id:67, stat:"700 million", context:"people can't afford basic food, shelter, or medicine.", question:"You returned something online because it wasn't the right shade.", source:"World Bank — extreme poverty line (2024)", category:"poverty" },
  { id:68, stat:"1.2 billion", context:"people live in acute multidimensional poverty.", question:"They lack basic health, education, and living standards. All at once.", source:"UNDP/OPHI — Multidimensional Poverty Index (2023)", category:"poverty" },
  { id:69, stat:"273 million", context:"children have no access to education.", question:"Some of them walk hours just hoping to sit in a classroom. You complained about a meeting.", source:"UNESCO — 273M out of school (2024)", category:"freedom" },
  { id:70, stat:"617 million", context:"children and adolescents worldwide cannot read a simple sentence or do basic maths.", question:"You have a library in your pocket. You used it to watch cat videos.", source:"UNESCO — learning poverty (2022)", category:"freedom" },
  { id:71, stat:"138 million", context:"children are working instead of going to school.", question:"Your biggest childhood problem was being bored on a rainy day.", source:"ILO/UNICEF — 138M in child labour (2024)", category:"freedom" },
  { id:72, stat:"54 million", context:"children do work classified as hazardous by the ILO.", question:"A 10-year-old is breaking rocks in a quarry right now.", source:"ILO/UNICEF — 54M in hazardous child labour (2024)", category:"freedom" },
  { id:73, stat:"12 million", context:"girls are married off before their 18th birthday each year.", question:"She didn't get a first date. She got a contract.", source:"UNICEF — 12M child marriages annually", category:"freedom" },
  { id:74, stat:"650 million", context:"women alive today were married as children.", question:"Your freedom to choose who you love is not universal. It's a privilege.", source:"UNICEF — child marriage global database", category:"freedom" },
  { id:75, stat:"28 million", context:"people are in forced labour right now.", question:"Someone made the clothes you're wearing. They might not have had a choice.", source:"ILO — forced labour estimate (2021)", category:"freedom" },
  { id:76, stat:"3.3 million", context:"children are in forced labour.", question:"They don't get summer holidays. They don't get holidays at all.", source:"ILO — child forced labour estimates (2021)", category:"freedom" },
  { id:77, stat:"122 million", context:"people didn't choose to leave their homes. War or disaster chose for them.", question:"You moved for a better view. They moved to stay alive.", source:"UNHCR — 122M+ forcibly displaced (2024)", category:"freedom" },
  { id:78, stat:"43 million", context:"displaced children have no permanent home.", question:"Your child sleeps in the same bed every night. That's not normal for 43 million kids.", source:"UNHCR — refugee children (2024)", category:"freedom" },
  { id:79, stat:"356 million", context:"children live in extreme poverty.", question:"They've never had a birthday cake. Your kid cried because theirs was the wrong colour.", source:"UNICEF/World Bank — child poverty (2023)", category:"poverty" },
  { id:80, stat:"168,000", context:"people's alarms didn't go off this morning. They died.", question:"Your alarm went off and you hit snooze. That's a privilege.", source:"UN Population Division — global daily mortality", category:"health" },
  { id:81, stat:"2,000", context:"families lost someone to suicide today.", question:"You had time to scroll for two hours but not enough to reply to one message.", source:"WHO — 727,000 suicides/year (2021)", category:"health" },
  { id:82, stat:"55,000", context:"people heard 'you have cancer' today.", question:"You heard 'your order is ready.' Count your blessings.", source:"WHO/IARC — 20M new cases/year (2022)", category:"health" },
  { id:83, stat:"168,000", context:"hearts stopped beating today.", question:"Yours didn't. And you spent it angry about parking.", source:"UN Population Division — global daily mortality", category:"health" },
  { id:84, stat:"2,000", context:"people gave up on life today.", question:"You were too busy with your own problems to notice theirs.", source:"WHO — 727,000 suicides/year (2021)", category:"health" },
  { id:85, stat:"700 million", context:"people went to bed hungry tonight.", question:"You went to bed stressed about tomorrow. They went to bed not knowing if they'll eat.", source:"World Bank/FAO — extreme poverty and hunger", category:"poverty" },
  { id:86, stat:"43 million", context:"children fell asleep tonight without a home.", question:"Your pillow isn't comfortable enough? Noted.", source:"UNHCR — refugee children (2024)", category:"freedom" },
  { id:87, stat:"50 million", context:"people woke up today with no freedom.", question:"You woke up and chose to complain. At least you got to choose.", source:"ILO — 50M in modern slavery (2021)", category:"freedom" },
  { id:88, stat:"150,000", context:"people said their last words today.", question:"What were your last words to someone you love? Were they kind?", source:"UN Population Division — ~150K deaths/day", category:"health" },
  { id:89, stat:"2,000", context:"people died by suicide today.", question:"Some of them were surrounded by people and still felt completely alone.", source:"WHO — 727,000 suicides/year (2021)", category:"health" },
  { id:90, stat:"55 million", context:"people with dementia are losing their memories.", question:"You haven't visited in months because you've been 'too busy.' Busy doing what?", source:"WHO/ADI — 55M with dementia (2020)", category:"health" },
  { id:91, stat:"150,000", context:"people died today. Some of them alone.", question:"You know someone who's lonely. You know exactly who. And you still didn't reach out.", source:"UN Population Division — ~150K deaths/day", category:"health" },
  { id:92, stat:"137", context:"women were killed by someone they trusted today.", question:"'I love you' doesn't always mean safety. For some, it means danger.", source:"UNODC — gender-related killings (2023)", category:"health" },
  { id:93, stat:"28,000", context:"donated organs go unused in the US every year.", question:"People die waiting because hospitals won't accept imperfect organs.", source:"UNOS — unused organs estimate", category:"health" },
  { id:94, stat:"10 million", context:"people get tuberculosis every year. We've had the cure since 1944.", question:"80 years of having the cure and people still die from it because they're poor.", source:"WHO — Global TB Report (2024)", category:"health" },
  { id:95, stat:"1,600", context:"children died from malaria today.", question:"A mosquito net costs $2. Think about that.", source:"WHO — ~600,000 malaria deaths/year (2022)", category:"health" },
  { id:96, stat:"800", context:"women died in childbirth today.", question:"99% of maternal deaths happen in developing countries. Not because medicine doesn't exist. Because access doesn't.", source:"WHO — maternal mortality (2023)", category:"health" },
  { id:97, stat:"2", context:"people die every second.", question:"Two people died while you read this sentence. You're still here.", source:"UN Population Division — ~62M deaths/year", category:"health" },
  { id:98, stat:"7,000", context:"people died in the last hour.", question:"You spent that hour on social media.", source:"UN Population Division — global daily mortality", category:"health" },
  { id:99, stat:"105", context:"people die every minute.", question:"In the time it takes you to complain about your day, a life ends somewhere.", source:"UN Population Division — ~150K deaths/day", category:"health" },
  { id:100, stat:"55,000", context:"people were told their life might be cut short today.", question:"You have time. They might not. Stop wasting yours.", source:"WHO/IARC — 20M new cases/year (2022)", category:"health" },
  { id:101, stat:"168,000", context:"people ran out of time today.", question:"You said 'there's always tomorrow.' There isn't. Not for everyone.", source:"UN Population Division — global daily mortality", category:"health" },
  { id:102, stat:"295 million", context:"people don't have enough to eat.", question:"You complained about your meal being wrong at a restaurant.", source:"WFP — 295M (2024)", category:"poverty" },
  { id:103, stat:"2.2 billion", context:"people risk their health every time they take a drink of water.", question:"You poured a glass of water today without a single thought. That's a luxury.", source:"WHO/UNICEF — 2.2B (2024)", category:"poverty" },
  { id:104, stat:"700 million", context:"people live in extreme poverty.", question:"Your 'bad day' costs more than their entire week.", source:"World Bank — extreme poverty line (2024)", category:"poverty" },
  { id:105, stat:"50 million", context:"people have no freedom. No choice. No autonomy.", question:"You spent 20 minutes deciding which show to watch. That's freedom. Own it.", source:"ILO — 50M in modern slavery (2021)", category:"freedom" },
  { id:106, stat:"273 million", context:"children are denied an education.", question:"You have access to every book ever written on a device in your pocket. What did you learn today?", source:"UNESCO — 273M out of school (2024)", category:"freedom" },
  { id:107, stat:"1 in 4", context:"people globally will be affected by a mental health condition at some point.", question:"That includes you. And you probably don't even know it yet.", source:"WHO — mental health global burden", category:"health" },
  { id:108, stat:"2,000", context:"parents buried their child today.", question:"You yelled at yours for spilling something.", source:"WHO/UNICEF — child mortality estimates", category:"health" },
  { id:109, stat:"55,000", context:"people found out they have cancer today.", question:"You were rude to a stranger this morning. They might be processing the worst news of their life.", source:"WHO/IARC — 20M new cases/year (2022)", category:"health" },
  { id:110, stat:"5,600", context:"people in the US got a cancer diagnosis today.", question:"The person who accidentally bumped you might be walking out of an oncology ward.", source:"ACS — 2,041,910 new US cases (2025)", category:"health" },
  { id:111, stat:"27,000", context:"people died from cancer today.", question:"Someone sat in the car next to you at the lights today, knowing they won't see next Christmas.", source:"WHO — 9.7M cancer deaths/year (2022)", category:"health" },
  { id:112, stat:"280 million", context:"people live with depression.", question:"That person who seems 'lazy' might be fighting just to get out of bed.", source:"WHO — depression global estimates (2023)", category:"health" },
  { id:113, stat:"2,000", context:"people died by suicide today.", question:"The colleague you rolled your eyes at might be planning their goodbye.", source:"WHO — 727,000 suicides/year (2021)", category:"health" },
  { id:114, stat:"2,000", context:"people took their own life today.", question:"You told someone their problems aren't that bad this week. You were wrong.", source:"WHO — 727,000 suicides/year (2021)", category:"health" },
  { id:115, stat:"168,000", context:"people died today.", question:"You honked at someone in traffic. It might have been a father racing to the hospital.", source:"UN Population Division — global daily mortality", category:"health" },
  { id:116, stat:"150,000", context:"families are grieving right now.", question:"You complained about your family at dinner tonight. At least they were there.", source:"UN Population Division — ~150K global deaths/day", category:"health" },
  { id:117, stat:"3,200", context:"people died in road accidents today.", question:"You texted while driving this week. You could have been the reason someone didn't come home.", source:"WHO — 1.19M road deaths/year (2021)", category:"health" },
  { id:118, stat:"55,000", context:"people were told they have cancer today.", question:"That waiter you didn't tip might be paying for chemotherapy.", source:"WHO/IARC — 20M new cases/year (2022)", category:"health" },
  { id:119, stat:"1 in 3", context:"women have experienced violence.", question:"She's sitting next to you on the bus. She's in your office. She's your friend. And she never told you.", source:"WHO — violence against women (2021)", category:"health" },
  { id:120, stat:"150,000", context:"people died today.", question:"You ghosted someone. They might have needed you more than you'll ever know.", source:"UN Population Division — ~150K global deaths/day", category:"health" },
  { id:121, stat:"168,000", context:"people didn't get tomorrow.", question:"You said 'I'll do it later.' 168,000 people found out today that later doesn't always come.", source:"UN Population Division — global daily mortality", category:"health" },
  { id:122, stat:"730 million", context:"people live without electricity.", question:"You got angry because your food delivery was 5 minutes late.", source:"IEA — 730M without access (2024)", category:"poverty" },
  { id:123, stat:"700 million", context:"people live on less than $2.15 a day.", question:"You spent $6 on a coffee you didn't finish.", source:"World Bank — extreme poverty line (2024)", category:"poverty" },
  { id:124, stat:"2.2 billion", context:"people lack safe drinking water.", question:"You complained about the temperature of your shower this morning.", source:"WHO/UNICEF — 2.2B (2024)", category:"poverty" },
  { id:125, stat:"273 million", context:"children can't go to school.", question:"You called in sick to work because you 'didn't feel like going.'", source:"UNESCO — 273M out of school (2024)", category:"freedom" },
  { id:126, stat:"138 million", context:"children are in child labour.", question:"You complained that your job is boring. They'd give anything to swap.", source:"ILO/UNICEF — 138M in child labour (2024)", category:"freedom" },
  { id:127, stat:"122 million", context:"people have been forced from their homes.", question:"You complained about having to move house. They didn't get to pack.", source:"UNHCR — 122M+ forcibly displaced (2024)", category:"freedom" },
  { id:128, stat:"2.2 billion", context:"people can't trust their water supply.", question:"You filled a bath, lay in it for an hour, drained it, and didn't think once about where it came from.", source:"WHO/UNICEF — 2.2B (2024)", category:"poverty" },
  { id:129, stat:"700 million", context:"people have nothing.", question:"You have everything and you're still not happy. Think about that.", source:"World Bank — extreme poverty line (2024)", category:"poverty" },
  { id:130, stat:"150,000", context:"people's stories ended today.", question:"Yours is still being written. So far it's mostly complaints and screen time.", source:"UN Population Division — ~150K deaths/day", category:"health" },
  { id:131, stat:"1 in 3", context:"women have been hurt by someone they knew.", question:"You probably know who. And you probably looked the other way.", source:"WHO — violence against women (2021)", category:"health" },
  { id:132, stat:"138 million", context:"children work instead of play.", question:"Your childhood was a gift. Not everyone got one.", source:"ILO/UNICEF — 138M in child labour (2024)", category:"freedom" },
  { id:133, stat:"168,000", context:"people died today.", question:"Not one of them thought it would be today.", source:"UN Population Division — global daily mortality", category:"health" },
  { id:134, stat:"55,000", context:"people's lives changed forever today with a diagnosis.", question:"Yours didn't. What are you going to do with that?", source:"WHO/IARC — 20M new cases/year (2022)", category:"health" },
  { id:135, stat:"2,000", context:"people decided they couldn't keep going.", question:"You told someone to 'stay positive' instead of actually listening to them.", source:"WHO — 727,000 suicides/year (2021)", category:"health" },
  { id:136, stat:"150,000", context:"people took their last breath today.", question:"You still have yours. You used it to argue with strangers online.", source:"UN Population Division — ~150K deaths/day", category:"health" },
  { id:137, stat:"3.4 billion", context:"people don't have a safe toilet.", question:"Half the planet doesn't have what you sit on while scrolling your phone.", source:"WHO/UNICEF — 3.4B (2024)", category:"poverty" },
  { id:138, stat:"13,400", context:"children died today from causes that were entirely preventable.", question:"They didn't die because we can't save them. They died because we didn't.", source:"WHO/UNICEF — 4.9M under-5 deaths/year (2022)", category:"health" },
  { id:139, stat:"55 million", context:"people are forgetting who they are.", question:"Your memories are your life. Imagine losing them one by one.", source:"WHO/ADI — 55M with dementia (2020)", category:"health" },
  { id:140, stat:"1,700", context:"Americans lost their fight with cancer today.", question:"Some of them ignored the signs because they were 'too busy.' Sound familiar?", source:"ACS — 618,120 US cancer deaths (2025)", category:"health" },
  { id:141, stat:"49,000", context:"people died from heart disease today.", question:"It's the number one killer and most of it is preventable. But you'll worry about it 'later.'", source:"WHO — 17.9M cardiovascular deaths/year", category:"health" },
  { id:142, stat:"537 million", context:"people live with diabetes.", question:"You said 'I'll start eating better Monday.' You've said that for years.", source:"IDF — Diabetes Atlas (2021)", category:"health" },
  { id:143, stat:"62 million", context:"people die every year.", question:"That's the population of Italy. Gone. Every. Single. Year.", source:"UN Population Division — annual global mortality", category:"health" },
  { id:144, stat:"1.19 million", context:"people die in road crashes every year.", question:"That's two jumbo jets crashing every single day. But because it's on roads, nobody notices.", source:"WHO — road traffic deaths (2021)", category:"health" },
  { id:145, stat:"122 million", context:"displaced people could fill every football stadium on Earth.", question:"And still have millions left standing outside.", source:"UNHCR — 122M+ forcibly displaced (2024)", category:"freedom" },
  { id:146, stat:"273 million", context:"children out of school is more than the population of Indonesia.", question:"An entire major country's worth of kids with no classroom.", source:"UNESCO — 273M out of school (2024)", category:"freedom" },
  { id:147, stat:"700 million", context:"people in extreme poverty is double the population of the United States.", question:"Imagine two Americas, but everyone's hungry.", source:"World Bank — extreme poverty line (2024)", category:"poverty" },
  { id:148, stat:"50 million", context:"people in modern slavery is more than the population of Spain.", question:"An entire nation of people with no freedom. Right now.", source:"ILO — 50M (2021)", category:"freedom" },
  { id:149, stat:"55 million", context:"people with dementia is more than the population of South Korea.", question:"A country's worth of people slowly disappearing from themselves.", source:"WHO/ADI — 55M with dementia (2020)", category:"health" },
  { id:150, stat:"2.6 billion", context:"people have never used the internet.", question:"You complained about a bad WiFi connection today. A third of humanity has never been online.", source:"ITU — digital divide (2023)", category:"poverty" },
  { id:151, stat:"1 in 2", context:"children globally — about 1 billion — face at least one severe deprivation.", question:"Not enough food, water, sanitation, housing, education, or health care. Pick one. They're missing it.", source:"UNICEF — child deprivation estimates", category:"poverty" },
  { id:152, stat:"168,000", context:"people didn't make it home today.", question:"You have no idea how lucky you are to be bored right now.", source:"UN Population Division — global daily mortality", category:"health" },
  { id:153, stat:"295 million", context:"people are facing acute hunger.", question:"You opened your fridge, saw a full fridge, and said 'there's nothing to eat.'", source:"WFP — 295M (2024)", category:"poverty" },
  { id:154, stat:"730 million", context:"people have never watched TV, charged a phone, or turned on a light.", question:"You got frustrated because your battery dropped to 10%.", source:"IEA — 730M without access (2024)", category:"poverty" },
  { id:155, stat:"43 million", context:"children are refugees.", question:"Your kid got upset about not getting the toy they wanted. These kids don't have a home.", source:"UNHCR — refugee children (2024)", category:"freedom" },
  { id:156, stat:"12 million", context:"girls were forced into marriage this year.", question:"They didn't get to choose. You chose your outfit for 20 minutes this morning.", source:"UNICEF — 12M child marriages annually", category:"freedom" },
  { id:157, stat:"50 million", context:"people can't leave their situation. They're trapped.", question:"You can walk out your front door right now. That's not normal for everyone.", source:"ILO — 50M in modern slavery (2021)", category:"freedom" },
  { id:158, stat:"55,000", context:"people found out today that their body is fighting against them.", question:"Your body works. Your legs walk. Your lungs breathe. And you still found something to complain about.", source:"WHO/IARC — 20M new cases/year (2022)", category:"health" },
  { id:159, stat:"3,200", context:"people died on the road today.", question:"Every single one of them thought they'd make it home.", source:"WHO — 1.19M road deaths/year (2021)", category:"health" },
  { id:160, stat:"800", context:"women died giving birth today.", question:"The most natural thing in the world is still one of the most dangerous.", source:"WHO — maternal mortality (2023)", category:"health" },
  { id:161, stat:"1 in 8", context:"people are battling a mental health disorder.", question:"The friend you haven't checked on in months might be one of them.", source:"WHO — 970M+ people worldwide (2022)", category:"health" },
  { id:162, stat:"55,000", context:"people were diagnosed with cancer today.", question:"Someone just got a phone call that changed their life forever. You got a notification about a sale.", source:"WHO/IARC — 20M new cases/year (2022)", category:"health" },
  { id:163, stat:"150,000", context:"funerals are being planned right now.", question:"You can't hug someone who's gone. And you didn't hug them when they were here.", source:"UN Population Division — ~150K deaths/day", category:"health" },
  { id:164, stat:"700 million", context:"people dream about what you call 'a bad day.'", question:"A roof, clean water, and three meals? That's the dream. You call it Tuesday.", source:"World Bank — extreme poverty line (2024)", category:"poverty" },
  { id:165, stat:"273 million", context:"children are locked out of education.", question:"The knowledge you ignore is what they'd risk their life for.", source:"UNESCO — 273M out of school (2024)", category:"freedom" },
  { id:166, stat:"50 million", context:"people are trapped in slavery.", question:"Your freedom isn't free. For 50 million people, it's not even possible.", source:"ILO — 50M in modern slavery (2021)", category:"freedom" },
  { id:167, stat:"2,000", context:"people lost their battle today.", question:"Someone needed to hear 'I'm here for you' and nobody said it.", source:"WHO — 727,000 suicides/year (2021)", category:"health" },
  { id:168, stat:"168,000", context:"people are gone.", question:"You're not. And you spent today acting like you'd live forever.", source:"UN Population Division — global daily mortality", category:"health" },
  { id:169, stat:"13,400", context:"children took their last breath today.", question:"They never got to grow up. You did. What are you doing with it?", source:"WHO/UNICEF — 4.9M under-5 deaths/year (2022)", category:"health" },
  { id:170, stat:"6,300", context:"newborns died today.", question:"Their parents will never hear their first word. You ignored your kid's tenth story today.", source:"WHO/UNICEF — 2.3M neonatal deaths/year", category:"health" },
  { id:171, stat:"280 million", context:"people woke up today wondering if they can make it through.", question:"You woke up annoyed at your alarm. They woke up fighting to find a reason.", source:"WHO — depression global estimates (2023)", category:"health" },
  { id:172, stat:"301 million", context:"people live in constant fear without knowing why.", question:"You told someone with anxiety to 'just relax.' That's like telling someone drowning to 'just swim.'", source:"WHO — anxiety disorders global (2023)", category:"health" },
  { id:173, stat:"55 million", context:"people are losing their mind. Literally.", question:"They're trapped in a brain that's deleting everything they ever loved. Appreciate your memory.", source:"WHO/ADI — 55M with dementia (2020)", category:"health" },
  { id:174, stat:"100,000+", context:"people are on the organ transplant waiting list in the US alone.", question:"People die on that list every day. You haven't thought about it once.", source:"UNOS — US transplant waiting list (2024)", category:"health" },
  { id:175, stat:"122 million", context:"people are displaced.", question:"Imagine waking up and everything you own fits in a plastic bag. That's reality for 122 million people.", source:"UNHCR — 122M+ forcibly displaced (2024)", category:"freedom" },
  { id:176, stat:"39 million", context:"people are living with HIV.", question:"Treatment exists. Access doesn't. Not for everyone.", source:"UNAIDS — people living with HIV (2023)", category:"health" },
  { id:177, stat:"10 million", context:"people got TB last year.", question:"It's curable. It's been curable for decades. But cures cost money these people don't have.", source:"WHO — Global TB Report (2024)", category:"health" },
  { id:178, stat:"137", context:"women were murdered by a partner or family member today.", question:"For 137 women, the person who was supposed to protect them was the danger.", source:"UNODC — gender-related killings (2023)", category:"health" },
  { id:179, stat:"45 million", context:"children are wasting away from malnutrition.", question:"Their stomachs are empty and distended. Your kid left half their dinner untouched.", source:"WHO — child wasting, global nutrition report", category:"poverty" },
  { id:180, stat:"1.2 billion", context:"people are trapped in multidimensional poverty.", question:"No health. No education. No clean water. No electricity. All at the same time.", source:"UNDP/OPHI — MPI (2023)", category:"poverty" },
  { id:181, stat:"617 million", context:"children can't read a single sentence.", question:"You read 200 text messages today without thinking twice about it.", source:"UNESCO — learning poverty (2022)", category:"freedom" },
  { id:182, stat:"650 million", context:"women alive today were married before they turned 18.", question:"They never got to be teenagers. They went straight from childhood to obligation.", source:"UNICEF — child marriage global database", category:"freedom" },
  { id:183, stat:"28 million", context:"people are working under force.", question:"Not underpaid. Not overworked. Forced. With no option to leave.", source:"ILO — forced labour estimate (2021)", category:"freedom" },
  { id:184, stat:"3.3 million", context:"of those forced labourers are children.", question:"Let that sit with you for a moment.", source:"ILO — child forced labour (2021)", category:"freedom" },
  { id:185, stat:"168,000", context:"people woke up for the last time today.", question:"Tomorrow isn't promised. It never was. Tell the people you love that you love them.", source:"UN Population Division — global daily mortality", category:"health" },
  { id:186, stat:"55,000", context:"people sat in a doctor's office today and heard the word 'cancer.'", question:"You sat in traffic today and thought your life was hard.", source:"WHO/IARC — 20M new cases/year (2022)", category:"health" },
  { id:187, stat:"700 million", context:"people couldn't afford to eat today.", question:"You ordered food and tipped nothing. Their server was someone's lifeline.", source:"World Bank — extreme poverty line (2024)", category:"poverty" },
  { id:188, stat:"2,000", context:"people reached the point of no return today.", question:"Someone you know is drowning and you're too distracted to notice the silence.", source:"WHO — 727,000 suicides/year (2021)", category:"health" },
  { id:189, stat:"43 million", context:"children have no safe place to call home.", question:"You locked your front door tonight without thinking. That lock is a luxury.", source:"UNHCR — refugee children (2024)", category:"freedom" },
  { id:190, stat:"55 million", context:"people are slowly becoming strangers to themselves.", question:"Dementia doesn't care about your status, wealth, or intelligence. Cherish every memory.", source:"WHO/ADI — 55M with dementia (2020)", category:"health" },
  { id:191, stat:"150,000", context:"lives ended today.", question:"Every one of them had a favourite song, a best friend, a fear, a hope. Just like you. Now they're gone.", source:"UN Population Division — ~150K deaths/day", category:"health" },
  { id:192, stat:"273 million", context:"children would trade everything for one day in your shoes.", question:"You had opportunities today that 273 million kids can only dream about. Did you use them?", source:"UNESCO — 273M out of school (2024)", category:"freedom" },
  { id:193, stat:"50 million", context:"people are not free.", question:"You are. That sentence should change your entire day.", source:"ILO — 50M in modern slavery (2021)", category:"freedom" },
  { id:194, stat:"168,000", context:"people took their last breath today.", question:"Breathe in. You felt that? That's called being alive. Don't take it for granted.", source:"UN Population Division — global daily mortality", category:"health" },
  { id:195, stat:"2,000", context:"people's pain became too much today.", question:"You have no idea what the person sitting next to you is carrying. But you judged them anyway.", source:"WHO — 727,000 suicides/year (2021)", category:"health" },
  { id:196, stat:"295 million", context:"people are fighting hunger right now.", question:"You have food in your fridge, money in your account, and a roof over your head. Your worst day is their best.", source:"WFP — 295M (2024)", category:"poverty" },
  { id:197, stat:"122 million", context:"people lost everything.", question:"Everything you're worried about right now — they'd take your problems in a heartbeat.", source:"UNHCR — 122M+ forcibly displaced (2024)", category:"freedom" },
  { id:198, stat:"55,000", context:"people's worlds collapsed today.", question:"Yours held together. Remember that next time you think the universe is against you.", source:"WHO/IARC — 20M new cases/year (2022)", category:"health" },
  { id:199, stat:"150,000", context:"people ran out of tomorrows.", question:"You didn't. Don't waste it.", source:"UN Population Division — ~150K deaths/day", category:"health" },
  { id:200, stat:"168,000", context:"people are never coming back.", question:"You spent today doing nothing that mattered and tomorrow you'll do the same.", source:"UN Population Division — global daily mortality", category:"health" },
  { id:201, stat:"1,700", context:"Americans died from cancer today.", question:"You keep saying 'one day.' 1,700 people found out today that one day ran out.", source:"ACS — 618,120 US cancer deaths (2025)", category:"health" },
  { id:202, stat:"2,000", context:"people's families will never understand why.", question:"Someone reached out to you recently. You left them on read.", source:"WHO — 727,000 suicides/year (2021)", category:"health" },
  { id:203, stat:"356 million", context:"children are growing up in extreme poverty.", question:"They didn't choose to be born into it. You didn't choose to be born out of it. But you can choose what to do about it.", source:"UNICEF/World Bank — child poverty (2023)", category:"poverty" },
  { id:204, stat:"168,000", context:"people died today.", question:"And here you are, alive, reading this, and you'll probably forget about it in 30 seconds.", source:"UN Population Division — global daily mortality", category:"health" },
];

function getTodayKey() {
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
  const [notifEnabled, setNotifEnabled] = useState(false);
  const tapCount = useRef(0);
  const tapTimer = useRef(null);

  useEffect(() => {
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
          <span style={{ fontFamily:"var(--font-display)", fontSize:28, color:"var(--accent)" }}>!</span>
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
            <span style={{ fontFamily:"var(--font-display)", fontSize:16, color:"var(--accent)" }}>!</span>
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

        {/* Enable notifications */}
        {!notifEnabled && (
          <button onClick={subscribeToPush} style={{ width:"100%", padding:16, background:"none", border:"1px solid var(--accent-border)", borderRadius:16, cursor:"pointer", color:"var(--accent)", fontFamily:"var(--font-body)", fontSize:14, marginBottom:32 }}>
            Enable daily notifications
          </button>
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
