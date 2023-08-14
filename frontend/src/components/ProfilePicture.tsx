import { FC } from "react";
import hermesG from "../assets/hermes/green-hermes.svg";
import hermesR from "../assets/hermes/red-hermes.svg";
import hermesY from "../assets/hermes/yellow-hermes.svg";

export type ProfilePictureProps = {
  size: "smallPic" | "mediumPic" | "largePic" | "xlargePic";
  url?: string;
  onClick?: () => void;
  border?: boolean
};

export type PictureMap = {
  [key: string]: string;
};

const pictureMap: PictureMap = {
  hermesG: hermesG,
  hermesR: hermesR,
  hermesY: hermesY,
};

const ProfilePicture: FC<ProfilePictureProps> = ({ size, url, onClick, border }) => {
  const customPic: React.CSSProperties = {
    backgroundImage: `url(${url ? pictureMap[`${url}`] : pictureMap["hermesG"]
      })`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <div
      className={`${!url && "bg-primary-good"} rounded-full ${size} ${border && ' border-primary-dark border'}`}
      style={customPic}
      onClick={onClick}
    />
  );
};

export default ProfilePicture;
