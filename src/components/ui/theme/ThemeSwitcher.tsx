import { Switch } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const ThemeSwitcher = () => {
  const [darkmode, setDarkMode] = useState(false);
  const thumbRef = useRef<HTMLButtonElement | null>(null);

  const toggle = async () => {
    if (!thumbRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        setDarkMode(!darkmode);
      });
    }).ready;
    const { top, left, height, width } =
      thumbRef.current.getBoundingClientRect();
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;

    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${left + width / 2}px ${top + height / 2}px)`,
          `circle(${maxRadius}px at ${left + width / 2}px ${
            top + height / 2
          }px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

  return (
    <Switch
      ref={thumbRef}
      checked={darkmode}
      onChange={toggle}
      className="group inline-flex h-6 w-14 items-center cursor-pointer border-[1px] border-neutral-500 rounded-full bg-sky-100 transition data-checked:bg-blue-600"
    >
      <span className="size-4 translate-x-1 rounded-full bg-neutral-700 transition group-data-checked:translate-x-[34px]" />
    </Switch>
  );
};

export default ThemeSwitcher;
