import { FC } from "react";

type LoadingProps = {
  styled: "loading";
};

const Loading: FC<LoadingProps> = ({ styled }) => {
  return (
    <div className={"flex"}>
      <svg
        width="30"
        height="100"
        className="animate-bounce animation-delay-[200ms]"
      >
        <circle
          cx="15"
          cy="15"
          r="10"
          className="fill-primary-good customBorder"
        />
      </svg>
      <svg
        width="30"
        height="100"
        className="animate-bounce animation-delay-[400ms]"
      >
        <circle
          cx="15"
          cy="15"
          r="10"
          className="fill-primary-attention customBorder"
        />
      </svg>
      <svg
        width="30"
        height="100"
        className="animate-bounce animation-delay-[800ms]"
      >
        <circle
          cx="15"
          cy="15"
          r="10"
          className="fill-primary-danger customBorder"
        />
      </svg>
    </div>
  );
};

export default Loading;
