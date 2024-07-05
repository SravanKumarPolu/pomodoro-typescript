import React from "react";

type Props = {
  children: React.ReactNode;
};

const HText = ({ children }: Props) => {
  return (
    <h2
      className=" basis-4/12 font-montserrat text-3xl 
     ">
      {children}
    </h2>
  );
};

export default HText;
