import React from "react";

export const ControlButton: React.FC<{
  text: string | React.ReactNode;
  onClick: () => void;
}> = ({ text, onClick }) => (
  <button
    className="m-2 px-3 py-1 lg:px-5 lg:py-2 xl:px-6 xl:py-3 rounded-sm hover:bg-white hover:bg-opacity-50 your-button-class"
    onClick={onClick}>
    {typeof text === "string" ? (
      text
    ) : (
      <span
        className="p-1 lg:p-2 xl:p-3 lg:text-lg xl:text-xl md:text-base tex-base"
        style={{ display: "flex", alignItems: "center" }}>
        {text}
      </span>
    )}
  </button>
);
