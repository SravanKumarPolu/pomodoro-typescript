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
    <div
      className={` px-8 ${className} ${isActive ? "border-white " : ""} 
      ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={disabled ? undefined : onClick}
      style={{ pointerEvents: disabled ? "none" : "auto" }}>
      {children}
    </div>
  );
};

export default Button;
