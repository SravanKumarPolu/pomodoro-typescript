// Button.tsx
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  className: string;
  isActive: boolean;
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
      className={`text-white ${className} ${isActive ? "border-white " : ""}`}
      onClick={onClick}>
      {children}
    </a>
  );
};

export default Button;
