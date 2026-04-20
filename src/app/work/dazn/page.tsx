"use client";

import WorkCasePage, { WorkCaseData } from "@/components/work/WorkCasePage";

const data: WorkCaseData = {
  // Hero
  heroTags: ["Sports Streaming", "Web Design & Development", "App Design", "TV App", "Brand Design"],
  heroTitle: "DAZN",
  heroSubtitle:
    "Redefining how millions of sports fans discover, watch, and experience premium live content — across web, mobile, and the living room.",
  heroImage: "/work/dazn.png",
  heroImageAlt: "DAZN platform redesign",
  heroObjectPosition: "top center",

  // Overview
  overviewHeading: "A global sports platform built for the modern fan",
  overviewBody: [
    "DAZN is one of the world's leading sports streaming platforms — delivering live and on-demand coverage of boxing, football, MMA, and more to subscribers across 200+ countries.",
    "Contrast partnered with DAZN to unify the product experience across all surfaces — from the marketing site and web app to native mobile apps and the TV/living-room experience — while reinforcing a bolder, more confident brand identity.",
  ],
  metaItems: [
    { label: "Client", value: "DAZN" },
    { label: "Industry", value: "#1 World Sport streaming service" },
    { label: "Year", value: "2024 - Present" },
    { label: "Duration", value: "2+ years" },
    { label: "Our Role", value: "Lead Design Partner" },
    { label: "Team Size", value: "4 designers, 2 devs" },
  ],

  // Gallery — 5 images: mobile app (wide panoramic) + web dashboard × 2 + TV app × 2
  gallery: [
    { src: "/work/dazn-mobile.png",  alt: "DAZN Bar Finder mobile app",         objectPosition: "center center" },
    { src: "/work/dazn-web-1.jpg",   alt: "DAZN Business account overview",      objectPosition: "center center" },
    { src: "/work/dazn-web-2.jpg",   alt: "DAZN Business manage devices",        objectPosition: "center center" },
    { src: "/work/dazn-tv-1.png",    alt: "DAZN TV app — Live channels",         objectPosition: "center center" },
    { src: "/work/dazn-tv-2.png",    alt: "DAZN TV app — Channel builder",       objectPosition: "center center" },
  ],

  // What We Did
  whatWeDidHeading: "Design at every layer — from pixels to platform",
  deliverables: [
    {
      num: "01",
      title: "Design System",
      desc: "Built a unified component library and token system spanning web, iOS, Android, and TV — enabling consistent, scalable UI across all surfaces.",
    },
    {
      num: "02",
      title: "Web Redesign",
      desc: "Overhauled the marketing site and web app — cleaner navigation, better content hierarchy, and a checkout flow that doubled trial sign-ups.",
    },
    {
      num: "03",
      title: "Mobile App",
      desc: "Redesigned the native iOS and Android apps with personalised content feeds, improved live event surfacing, and smoother watch experiences.",
    },
    {
      num: "04",
      title: "TV App Design",
      desc: "Created a purpose-built TV experience optimised for 10-foot viewing — simplified navigation, bold content cards, and remote-first interactions.",
    },
    {
      num: "05",
      title: "Brand Refresh",
      desc: "Sharpened the visual identity with a refined type system, a bolder colour palette, and new brand motion guidelines for campaign assets.",
    },
    {
      num: "06",
      title: "UX Research",
      desc: "Conducted subscriber interviews, usability testing, and competitor analysis — grounding every design decision in real user behaviour.",
    },
  ],

  // More Work
  moreWork: [
    {
      client: "Down",
      title: "Dating App — 0→1 Product Design",
      tags: ["Web Design & Development", "App Design"],
      image: "/work/down.png",
      href: "/work/down",
    },
    {
      client: "Cymbio",
      title: "B2B Sales Dashboard",
      tags: ["Web Design & Development"],
      image: "/work/cymbio.png",
      href: "/work/cymbio",
    },
  ],
};

export default function DAZNCaseStudy() {
  return <WorkCasePage data={data} />;
}
