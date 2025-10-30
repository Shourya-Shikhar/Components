import { ThemeSwitcher } from "../theme/theme-switcher";

export const Navigation = () => {
  return (
    <div className="flex w-full justify-end bg-neutral-300 p-2 dark:bg-yellow-800">
      <div>
        <ThemeSwitcher />
      </div>
    </div>
  );
};
