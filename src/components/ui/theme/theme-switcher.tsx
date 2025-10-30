"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Button } from "../button";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const ThemeSwitcher = ({ className }: { className?: string }) => {
  const [isDark, setIsDark] = useState(() => {
    // to load theme from localStorage fallback system

    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("theme");
    if (stored === "dark") return true;
    else if (stored === "light") return false;
    else return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [mounted, setMounted] = useState(false);
  const switcherRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = async () => {
    if (
      !switcherRef.current ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      if (isDark) {
        setIsDark(false);
      } else {
        setIsDark(true);
      }
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        if (isDark) {
          setIsDark(false);
        } else {
          setIsDark(true);
        }
      });
    }).ready;

    const rect = switcherRef.current?.getBoundingClientRect();
    const top = rect?.top ?? 0;
    const left = rect?.left ?? 0;
    const width = (rect?.width ?? 0) / 2;
    const height = (rect?.height ?? 0) / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${left + width}px ${top + height}px)`,
          `circle(${maxRadius}px at ${left + width}px ${top + height}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // apply current theme to <html>
    if (isDark) {
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      size="icon"
      variant={"ghost"}
      className={cn(
        "size-9 cursor-pointer hover:bg-neutral-400/15 dark:hover:bg-neutral-500/10",
        className,
      )}
      onClick={toggleTheme}
      ref={switcherRef}
      title={isDark ? "Switch on" : "Switch off"}
      aria-label="theme-switcher"
    >
      {mounted ? (
        isDark ? (
          <MoonIcon />
        ) : (
          <SunIcon />
        )
      ) : (
        <div className="size-6" />
      )}
    </Button>
  );
};

const MoonIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="size-5 stroke-2"
    initial={{
      stroke: "var(--color-slate-500)",
      fill: "none",
      rotate: -30,
    }}
    animate={{
      stroke: "var(--color-zinc-800)", // Change this for another color
      fill: "var(--color-zinc-700)",
      rotate: 0,
    }}
  >
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
  </motion.svg>
);

const SunIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="size-6 stroke-2"
    initial={{
      stroke: "var(--color-foreground)",
      fill: "none",
      rotate: -30,
    }}
    animate={{
      stroke: "var(--color-yellow-200)",
      fill: "var(--color-yellow-300)",
      rotate: 0,
    }}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </motion.svg>
);

export { ThemeSwitcher };
