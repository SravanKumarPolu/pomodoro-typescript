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
  disabled = false,
  isActive,
}) => {
  return (
    <a
      href="#"
      className={` ${className} ${isActive ? "border-white " : ""} 
      ${disabled ? " opacity-50 cursor-not-allowed" : ""}
      `}
      onClick={disabled ? undefined : onClick}>
      {children}
    </a>
  );
};

export default Button;
