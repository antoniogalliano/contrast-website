"use client";

import WorkCasePage, { WorkCaseData } from "@/components/work/WorkCasePage";

const data: WorkCaseData = {
  // Hero
  heroTags: ["B2B SaaS", "Revenue Intelligence", "Product Design", "AI Platform"],
  heroTitle: "Spear",
  heroSubtitle:
    "Empowering B2B revenue teams to identify buying signals, personalize outreach, and turn intent into pipeline at scale.",
  heroImage: "/work/spear-home.png",
  heroImageAlt: "Spear AI-powered outreach platform",
  heroObjectPosition: "top center",

  // Overview
  overviewHeading: "AI-powered outreach platform built for modern B2B growth teams.",
  overviewBody: [
    "Spear helps revenue leaders identify high-intent buying signals, uncover the right prospects at the right moment, and transform those insights into personalized outreach that drives pipeline growth.",
    "We partnered with Spear to simplify complex revenue workflows and create a more intuitive experience for sales and growth teams. Our focus was on helping users move seamlessly from identifying buying signals to taking action, while building a scalable product foundation that supports the platform's continued growth.",
  ],
  metaItems: [
    { label: "Client", value: "Spear" },
    { label: "Industry", value: "B2B SaaS · Revenue Intelligence" },
    { label: "Year", value: "2024" },
  ],

  // Gallery
  gallery: [
    { src: "/work/spear-home.png",        alt: "Spear — home dashboard" },
    { src: "/work/spear-analytics.png",   alt: "Spear — analytics view" },
    { src: "/work/spear-suggestions.png", alt: "Spear — AI suggestions" },
    { src: "/work/spear-trigger.png",     alt: "Spear — trigger management" },
  ],

  // What We Did
  whatWeDidHeading: "Turning intent data into a product people actually want to use",
  deliverables: [
    {
      num: "01",
      title: "Product Strategy",
      desc: "Mapped the revenue team's workflow from signal detection to closed pipeline, identifying where friction was killing conversion and where Spear's AI could create real leverage.",
    },
    {
      num: "02",
      title: "Signal Intelligence UX",
      desc: "Designed the buying signal feed and intent scoring interface — making complex data instantly scannable so reps can prioritise the highest-value accounts in seconds.",
    },
    {
      num: "03",
      title: "Outreach Workflow Design",
      desc: "Built the end-to-end outreach creation flow, from signal to personalised message, reducing the steps between insight and action to a single coherent experience.",
    },
    {
      num: "04",
      title: "Data Visualisation",
      desc: "Designed the analytics dashboard and pipeline reporting layer, giving revenue leaders a clear view of what's working, what's moving, and where to focus next.",
    },
    {
      num: "05",
      title: "AI Suggestions Interface",
      desc: "Designed the AI-powered recommendation layer that surfaces prospect suggestions and message variants, built to feel assistive rather than automated.",
    },
    {
      num: "06",
      title: "Design System Foundation",
      desc: "Established a scalable component library aligned with Spear's brand, giving the engineering team a consistent, production-ready foundation to build on.",
    },
  ],

  // More Work
  moreWork: [
    {
      client: "DAZN",
      title: "Premium Sports Platform Redesign",
      tags: ["Web Design & Development", "App Design", "TV App", "Brand Design"],
      image: "/work/dazn.png",
      href: "/work/dazn",
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

export default function SpearCaseStudy() {
  return <WorkCasePage data={data} />;
}
