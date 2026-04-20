"use client";

import WorkCasePage, { WorkCaseData } from "@/components/work/WorkCasePage";

const data: WorkCaseData = {
  // Hero
  heroTags: ["Social / Dating", "Full Product Design", "App Design"],
  heroTitle: "Down",
  heroSubtitle:
    "Building a dating app from zero — a product that authentically serves the modern generation's approach to relationships, connection, and self-expression.",
  heroImage: "/work/down.png",
  heroImageAlt: "Down app design",

  // Overview
  overviewHeading: "A dating app designed for how Gen Z actually connects",
  overviewBody: [
    "Down set out to redefine the dating app space — moving away from the swipe-fatigue of incumbents and toward a more intentional, personality-first approach to connection.",
    "Contrast owned the full product design — from brand identity and onboarding flows through to the core matching experience, profile system, and marketing site — delivering a polished, launch-ready product.",
  ],
  metaItems: [
    { label: "Client", value: "Down" },
    { label: "Industry", value: "Social / Dating" },
    { label: "Year", value: "2024" },
    { label: "Duration", value: "6 months" },
    { label: "Our Role", value: "Full Product Design" },
    { label: "Platforms", value: "iOS, Android, Web" },
  ],

  // Gallery
  gallery: [
    { src: "/work/down.png", alt: "Down matching experience", objectPosition: "top center" },
    { src: "/work/down.png", alt: "Down onboarding", objectPosition: "top center" },
    { src: "/work/down.png", alt: "Down profile", objectPosition: "bottom center" },
  ],

  // What We Did
  whatWeDidHeading: "End-to-end product design for a category-defining app",
  deliverables: [
    {
      num: "01",
      title: "Brand Identity",
      desc: "Created Down's full visual identity — logo, colour palette, typography system, and tone of voice — built to feel warm, playful, and distinctly non-corporate.",
    },
    {
      num: "02",
      title: "Onboarding Flow",
      desc: "Designed a 5-step onboarding that surfaces real matches before completion — reducing drop-off and building excitement from the first interaction.",
    },
    {
      num: "03",
      title: "Matching Experience",
      desc: "Replaced the standard swipe paradigm with intent-based cards — giving users more context before matching and reducing low-quality connections.",
    },
    {
      num: "04",
      title: "Profile System",
      desc: "Built a multi-layered profile architecture — photos, prompts, vibe tags, and audio snippets — giving personality the room to come through.",
    },
    {
      num: "05",
      title: "iOS & Android Apps",
      desc: "Delivered production-ready native designs for both platforms — with full design specs, component documentation, and handoff assets.",
    },
    {
      num: "06",
      title: "Marketing Site",
      desc: "Designed and developed the Down marketing site — conveying the brand vision and converting curious visitors into app downloads.",
    },
  ],

  // More Work
  moreWork: [
    {
      client: "Cymbio",
      title: "B2B Sales Dashboard",
      tags: ["Web Design & Development"],
      image: "/work/cymbio.png",
      href: "/work/cymbio",
    },
    {
      client: "Designrr",
      title: "Engagement & Retention Overhaul",
      tags: ["Web Design & Development"],
      image: "/work/designrr.png",
      href: "/work/designrr",
    },
  ],
};

export default function DownCaseStudy() {
  return <WorkCasePage data={data} />;
}
