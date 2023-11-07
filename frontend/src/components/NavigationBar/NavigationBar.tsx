import { FC, PropsWithChildren } from "react";
import { NavigationBarElement } from "./NavigationBarElement";
import { HeaderBar } from "../HeaderBar";

const NavigationBar: FC<PropsWithChildren> = () => {
  const navigations = [
    "dashboard",
    "scores",
    "challenges",
    "notifications",
  ] as const;

  const navMap = {
    "dashboard": "Espace personnel",
    "scores": "Mes amis",
    "notifications": "Notifications",
    "challenges": "Mes challenges"

  }

  return (
    <div className="bg-primary-attention  drop-shadow-sm">
      <nav className="lg:sticky  flex h-20    gap-11 justify-evenly items-center xxl:justify-center xxl:gap-20 ">
        {navigations?.map((nav, index) => (
          <NavigationBarElement key={index} link={nav} title={navMap[nav]} index={index} />
        ))}
        <HeaderBar />
      </nav>
    </div>
  );
};

export default NavigationBar;
