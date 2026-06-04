"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const hash = window.location.hash;
    if (hash) {
      const id = hash.slice(1);
      // Retry until the section is in the DOM (Next.js may render it async)
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "instant" });
        } else if (attempts++ < 20) {
          setTimeout(tryScroll, 80);
        }
      };
      tryScroll();
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
