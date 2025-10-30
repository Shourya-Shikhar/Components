import { motion, type Variants } from "motion/react";

const boxHover: Variants = {
  initial: { borderRadius: 40 },
  hover: { borderRadius: 12 },
};

const HoverLink = ({ link }: { link?: string }) => {
  const openLinkinNewTab = () => {
    if (link) window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-1 items-center justify-center p-2">
      <motion.div initial="initial" whileHover="hover" animate="initial">
        <motion.div
          id="box"
          className="w-103 overflow-hidden px-2"
          variants={boxHover}
          transition={{
            duration: 0.3,
            type: "tween",
            ease: "easeInOut",
          }}
        >
          <motion.div
            id="track"
            className="flex h-20 items-center justify-center gap-x-2 text-black dark:text-white"
            variants={{
              initial: { translateX: -43 },
              hover: { translateX: 43 },
            }}
            transition={{
              duration: 0.3,
              type: "tween",
              ease: "easeInOut",
            }}
          >
            <motion.div
              role="button"
              className="flex aspect-square h-full cursor-pointer items-center justify-center bg-orange-500"
              variants={{
                initial: {
                  borderRadius: 40,
                  backgroundColor: "var(--color-orange-100)",
                },
                hover: {
                  backgroundColor: "var(--color-orange-500)",
                  borderRadius: 8,
                  transition: { delay: 0.1 },
                },
              }}
              transition={{
                duration: 0.3,
                type: "tween",
                ease: "easeInOut",
              }}
              onClick={openLinkinNewTab}
            >
              <Arrow className="size-10" />
            </motion.div>
            <motion.div
              id="cta"
              className="flex h-full w-80 shrink-0 cursor-pointer items-center justify-center bg-gray-200 dark:bg-neutral-900"
              variants={{
                initial: { borderRadius: 40 },
                hover: { borderRadius: 8 },
              }}
              transition={{
                duration: 0.3,
                type: "tween",
                ease: "easeInOut",
              }}
              onClick={openLinkinNewTab}
            >
              <motion.p
                className="font-manrope scale-x-125 text-lg leading-tight"
                variants={{
                  initial: { fontWeight: "500" },
                  hover: { fontWeight: "900" },
                }}
              >
                Let&#39;s Start Investing
              </motion.p>
            </motion.div>
            <motion.div
              role="button"
              className="flex aspect-square h-full cursor-pointer items-center justify-center rounded-full"
              variants={{
                initial: {
                  backgroundColor: "var(--color-orange-500)",
                },
                hover: {
                  backgroundColor: "var(--color-orange-950)",
                },
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              onClick={openLinkinNewTab}
            >
              <Arrow className="size-10" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Arrow = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill="currentColor"
    className={className}
  >
    <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
  </svg>
);

export default HoverLink;
