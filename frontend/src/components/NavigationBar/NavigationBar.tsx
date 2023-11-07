import { FC, PropsWithChildren } from "react";
import { NavigationBarElement } from "./NavigationBarElement";

const NavigationBar: FC<PropsWithChildren> = () => {
  const navigations = [
    "dashboard",
    "scores",
    "challenges",
    "notifications",
    /*  "settings", */
  ] as const;

  return (
    <div className=" border bg-primary-attention flex-auto lg:max-w-[96px] max-h-[80px] lg:max-h-full">
      <nav className="lg:sticky lg:top-0 lg:flex-col lg:w-24 min-w-[96px] flex h-20  lg:justify-start lg:gap-20 gap-11 lg:pt-5 justify-evenly items-center">
        {navigations?.map((nav, index) => (
          <NavigationBarElement key={index} link={nav} index={index} />
        ))}
      </nav>
    </div>
  );
};

export default NavigationBar;
