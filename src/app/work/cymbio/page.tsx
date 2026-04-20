"use client";

import WorkCasePage, { WorkCaseData } from "@/components/work/WorkCasePage";

const data: WorkCaseData = {
  // Hero
  heroTags: ["B2B / Retail Tech", "Product Design", "Web Design & Development"],
  heroTitle: "Cymbio",
  heroSubtitle:
    "Redesigning a B2B multi-channel sales platform so that retail brands can finally see, understand, and act on their performance data in one place.",
  heroImage: "/work/cymbio.png",
  heroImageAlt: "Cymbio dashboard",

  // Overview
  overviewHeading: "Bringing clarity to complex multi-channel retail data",
  overviewBody: [
    "Cymbio is a B2B platform that helps retail brands manage and scale their presence across dozens of wholesale and digital marketplaces — all from a single dashboard.",
    "Contrast redesigned the core product experience — rationalising a complex data environment into a clean, actionable interface that makes multi-channel performance immediately readable, with an AI assistant (CymAI) that surfaces the most relevant insights automatically.",
  ],
  metaItems: [
    { label: "Client", value: "Cymbio" },
    { label: "Industry", value: "B2B / Retail Tech" },
    { label: "Year", value: "2024" },
    { label: "Duration", value: "5 months" },
    { label: "Our Role", value: "Product Design" },
    { label: "Type", value: "SaaS Dashboard" },
  ],

  // Gallery
  gallery: [
    { src: "/work/cymbio.png", alt: "Cymbio sales overview", objectPosition: "top left" },
    { src: "/work/cymbio.png", alt: "Cymbio CymAI", objectPosition: "right center" },
    { src: "/work/cymbio.png", alt: "Cymbio chart", objectPosition: "bottom center" },
  ],

  // What We Did
  whatWeDidHeading: "From data overload to decision-ready clarity",
  deliverables: [
    {
      num: "01",
      title: "Dashboard Architecture",
      desc: "Redesigned the information architecture so that the most critical KPIs — total sales, net revenue, AOV, cancellations — are visible at a glance, with clear trend indicators.",
    },
    {
      num: "02",
      title: "CymAI Integration",
      desc: "Designed a natural-language AI assistant that lets users ask questions like \"Show me Farfetch sales for Q1\" and get an instant structured summary with citations.",
    },
    {
      num: "03",
      title: "Channel Analytics",
      desc: "Built a multi-channel breakdown view with stackable bar charts, sortable tables, and a per-channel time-series — so teams can drill from macro to micro in seconds.",
    },
    {
      num: "04",
      title: "Design System",
      desc: "Created a comprehensive component library covering tables, charts, filters, alerts, and empty states — giving Cymbio's engineering team a scalable UI foundation.",
    },
    {
      num: "05",
      title: "Data Visualisation",
      desc: "Defined a chart language for the platform — including colour encoding for channels, axis conventions, and responsive behaviour — making dense data immediately readable.",
    },
    {
      num: "06",
      title: "Dev Handoff",
      desc: "Delivered annotated specs, interactive prototypes, and a full Figma component library — reducing design-to-dev friction and enabling a faster engineering sprint.",
    },
  ],

  // More Work
  moreWork: [
    {
      client: "Designrr",
      title: "Engagement & Retention Overhaul",
      tags: ["Web Design & Development"],
      image: "/work/designrr.png",
      href: "/work/designrr",
    },
    {
      client: "JUSTT",
      title: "Chargeback Management SaaS",
      tags: ["Web Design & Development"],
      image: "/work/justt.png",
      href: "/work/justt",
    },
  ],
};

export default function CymbioCaseStudy() {
  return <WorkCasePage data={data} />;
}
