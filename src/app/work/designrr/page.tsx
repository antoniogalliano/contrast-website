"use client";

import WorkCasePage, { WorkCaseData } from "@/components/work/WorkCasePage";

const data: WorkCaseData = {
  // Hero
  heroTags: ["SaaS / Content", "UX & Product Design", "Web Design & Development"],
  heroTitle: "Designrr",
  heroSubtitle:
    "A deep UX overhaul that turned a complex content creation tool into an experience users genuinely enjoy — driving a 97% increase in engagement.",
  heroImage: "/work/designrr.png",
  heroImageAlt: "Designrr platform",

  // Overview
  overviewHeading: "Turning a powerful tool into a product people love using",
  overviewBody: [
    "Designrr is a content creation platform that lets marketers, authors, and course creators turn existing content into beautiful eBooks, lead magnets, and digital products — fast.",
    "Despite having powerful features, users weren't experiencing the 'aha moment' fast enough — and many were churning before completing their first project. Contrast applied the Hero Framework to redesign the onboarding and core editor experience, resulting in a 97% lift in engagement.",
  ],
  metaItems: [
    { label: "Client", value: "Designrr" },
    { label: "Industry", value: "SaaS / Content" },
    { label: "Year", value: "2023" },
    { label: "Duration", value: "4 months" },
    { label: "Our Role", value: "UX & Product Design" },
    { label: "Result", value: "+97% engagement", accent: true },
  ],

  // Gallery
  gallery: [
    { src: "/work/designrr.png", alt: "Designrr editor", objectPosition: "center center" },
    { src: "/work/designrr.png", alt: "Designrr layout chooser", objectPosition: "top center" },
    { src: "/work/designrr.png", alt: "Designrr template", objectPosition: "bottom center" },
  ],

  // What We Did
  whatWeDidHeading: "Redesigning for the moment of magic",
  deliverables: [
    {
      num: "01",
      title: "Onboarding Redesign",
      desc: "Rebuilt the onboarding flow to surface a finished, beautiful template immediately — letting users experience the product's value before they'd invested any effort.",
    },
    {
      num: "02",
      title: "Editor UX Simplification",
      desc: "Implemented progressive disclosure across the editor — hiding advanced tools behind contextual panels, and surfacing only what was relevant to the current task.",
    },
    {
      num: "03",
      title: "Layout Selection UX",
      desc: "Replaced the static layout picker with a live preview system — users could see exactly what their content would look like in each template before committing.",
    },
    {
      num: "04",
      title: "First-Project Momentum",
      desc: "Designed a guided first-project flow with smart defaults, contextual hints, and a clear progress indicator — reducing time-to-first-export by over 60%.",
    },
    {
      num: "05",
      title: "Retention Triggers",
      desc: "Introduced milestone moments — first export, first share, first download — with celebratory micro-interactions that reinforced the user's identity as a creator.",
    },
    {
      num: "06",
      title: "Hero Framework Application",
      desc: "Used the Hero Framework throughout — framing every interaction around the user's desired transformation, not the tool's feature set.",
    },
  ],

  // More Work
  moreWork: [
    {
      client: "JUSTT",
      title: "Chargeback Management SaaS",
      tags: ["Web Design & Development"],
      image: "/work/justt.png",
      href: "/work/justt",
    },
    {
      client: "DAZN",
      title: "Premium Sports Platform Redesign",
      tags: ["Web Design & Development", "App Design", "TV App", "Brand Design"],
      image: "/work/dazn.png",
      href: "/work/dazn",
    },
  ],
};

export default function DesignrrCaseStudy() {
  return <WorkCasePage data={data} />;
}
