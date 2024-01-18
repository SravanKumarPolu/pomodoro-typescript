// Button.tsx
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  className: string;
  isActive: boolean;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,

  isActive,
}) => {
  return (
    <a
      href="#"
      className={` ${className} ${isActive ? "border-white " : ""} `}
      onClick={onClick}>
      {children}
    </a>
  );
};

export default Button;
