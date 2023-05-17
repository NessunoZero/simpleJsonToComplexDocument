import { ReactNode } from "react";
import { buttonClassName } from "./utility";

export const Button = ({
  onClick,
  className,
  content,
}: {
  onClick: () => void;
  className?: string;
  content: ReactNode;
}) => {
  return (
    <button onClick={onClick} className={className ?? buttonClassName}>
      {content}
    </button>
  );
};
