import React from "react";

type Props = {
  children: React.ReactNode;
};

const HText = ({ children }: Props) => {
  return (
    <h1 className="basis-3/5 font-montserrat text-3xl py-[.5rem] font-bold ">
      {children}
    </h1>
  );
};

export default HText;
