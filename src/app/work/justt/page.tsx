"use client";

import WorkCasePage, { WorkCaseData } from "@/components/work/WorkCasePage";

const data: WorkCaseData = {
  // Hero
  heroTags: ["Fintech / SaaS", "Product Design", "Web Design & Development"],
  heroTitle: "JUSTT",
  heroSubtitle:
    "Redesigning a fintech SaaS platform so that merchants can finally understand, track, and win their chargeback disputes — without needing a lawyer to read the dashboard.",
  heroImage: "/work/justt.png",
  heroImageAlt: "JUSTT chargeback dashboard",
  heroObjectPosition: "top left",

  // Overview
  overviewHeading: "Bringing transparency to one of e-commerce's most opaque problems",
  overviewBody: [
    "JUSTT is an AI-powered chargeback management platform — it automatically fights disputed transactions on behalf of merchants, recovering revenue that would otherwise be lost to fraud claims and buyer disputes.",
    "Contrast redesigned the core product dashboard — transforming a data-heavy, hard-to-interpret interface into a clear, confidence-inspiring platform that gives merchants visibility into their chargeback health and actionable steps to improve it.",
  ],
  metaItems: [
    { label: "Client", value: "JUSTT" },
    { label: "Industry", value: "Fintech / SaaS" },
    { label: "Year", value: "2024" },
    { label: "Duration", value: "5 months" },
    { label: "Our Role", value: "Product Design" },
    { label: "Type", value: "B2B Dashboard" },
  ],

  // Gallery
  gallery: [
    { src: "/work/justt.png", alt: "JUSTT recovery overview", objectPosition: "top left" },
    { src: "/work/justt.png", alt: "JUSTT open chargebacks", objectPosition: "right top" },
    { src: "/work/justt.png", alt: "JUSTT data enrichment", objectPosition: "bottom right" },
  ],

  // What We Did
  whatWeDidHeading: "Designing for confidence in a high-stakes environment",
  deliverables: [
    {
      num: "01",
      title: "Dashboard Redesign",
      desc: "Rebuilt the home dashboard around three primary questions merchants care about: How much am I recovering? What's open? What should I do next?",
    },
    {
      num: "02",
      title: "Recovery Reporting",
      desc: "Designed a dedicated recovery view — surfacing won, lost, and pending chargebacks with clear financial summaries, timeline breakdowns, and per-chargeback status cards.",
    },
    {
      num: "03",
      title: "Data Enrichment UI",
      desc: "Created a visual data enrichment score system — showing merchants which data points were missing, how much each one impacted win rates, and exactly how to submit them.",
    },
    {
      num: "04",
      title: "Performance Trends",
      desc: "Built a performance trend chart with configurable time ranges, recovery rate benchmarks, and anomaly callouts — giving merchants a longitudinal view of their chargeback health.",
    },
    {
      num: "05",
      title: "Chargeback Detail View",
      desc: "Redesigned the individual chargeback view to clearly show the dispute timeline, JUSTT's actions, the evidence submitted, and the current status.",
    },
    {
      num: "06",
      title: "Design System",
      desc: "Delivered a component library covering all dashboard UI patterns — stat cards, data tables, progress bars, status badges, and alert components — ready for engineering implementation.",
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
      client: "Down",
      title: "Dating App — 0→1 Product Design",
      tags: ["Web Design & Development", "App Design"],
      image: "/work/down.png",
      href: "/work/down",
    },
  ],
};

export default function JusttCaseStudy() {
  return <WorkCasePage data={data} />;
}
