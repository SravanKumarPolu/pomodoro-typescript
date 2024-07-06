import React from "react";

type Props = {
  children: React.ReactNode;
};

const HText = ({ children }: Props) => {
  return (
    <h2 className="flex-initial basis-4/12 font-montserrat md:text-3xl text-2xl text-white">
      {children}
    </h2>
  );
};

export default HText;
