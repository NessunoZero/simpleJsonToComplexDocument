import { ReactNode } from "react";

export const buttonClassName = "border border-purple-700 p-2 cursor-pointer rounded-full";

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
