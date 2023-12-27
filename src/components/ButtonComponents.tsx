import React from "react";

export const ControlButton: React.FC<{
  text: string | React.ReactNode;
  onClick: () => void;
}> = ({ text, onClick }) => (
  <button
    className="m-2 px-3 py-1 rounded-sm hover:bg-white hover:bg-opacity-50"
    onClick={onClick}>
    {typeof text === "string" ? (
      text
    ) : (
      <span className="p-1" style={{ display: "flex", alignItems: "center" }}>
        {text}
      </span>
    )}
  </button>
);
