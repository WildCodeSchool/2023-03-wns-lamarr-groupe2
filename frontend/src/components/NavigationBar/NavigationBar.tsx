import { FC, PropsWithChildren } from "react";
import { NavigationBarElement } from "./NavigationBarElement";

const NavigationBar: FC<PropsWithChildren> = () => {
  const navigations = [
    "dashboard",
    "scores",
    "challenges",
    "notifications",
    "settings",
  ] as const;

  return (
    <nav className=" lg:sticky lg:top-0 lg:flex-col lg:h-screen lg:w-24 bg-primary-attention flex h-20 items-center justify-evenly lg:justify-start lg:gap-20 gap-11 lg:pt-5">
      {navigations?.map((nav, index) => (
        <NavigationBarElement key={index} link={nav} index={index} />
      ))}
    </nav>
  );
};

export default NavigationBar;
