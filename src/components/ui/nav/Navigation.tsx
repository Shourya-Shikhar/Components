import { ThemeSwitcher } from "../theme/theme-switcher";

export const Navigation = () => {
  return (
    <div className="flex w-full justify-end bg-yellow-300 p-2">
      <div>
        <ThemeSwitcher />
      </div>
    </div>
  );
};
