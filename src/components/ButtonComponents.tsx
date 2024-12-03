import React from "react";

interface ControlButtonProps {
  icon: React.ReactNode; // Use `icon` instead of `text` for clarity
  onClick: () => void;
  className?: string; // Allow additional classes for flexibility
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  icon,
  onClick,
  className = "",
}) => (
  <button
    className={`px-3 py-2 rounded hover:bg-opacity-50 transition-all ${className}`}
    onClick={onClick}
    aria-label="control-button" // Accessibility improvement
  >
    <span className="flex items-center justify-center">{icon}</span>
  </button>
);
