// Navbar.tsx
import { motion } from "framer-motion";
import HText from "../../shared/HText";
import settingsvg from "../../assets/setting.svg";
import report from "../../assets/report.svg";
import login from "../../assets/login.svg";
import Links from "./Link";
import { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import Setting from "@/setting";
import { useState } from "react";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  isTopOfPage: boolean;
};

const Navbar = ({ selectedPage, setSelectedPage, isTopOfPage }: Props) => {
  const flexBetween = "flex items-center justify-between";
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";
  const [showSetting, setShowSetting] = useState(false);

  const handleSettingClick = () => {
    setSelectedPage(SelectedPage.Setting);
    setShowSetting(true);
  };

  return (
    <>
      <nav>
        <div
          className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6 `}>
          <motion.div
            className=" flex w-full  items-center mx-auto  ml-[-.1rem] border-b-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}>
            <HText>
              <span className="pl-2">Pomoto</span>
            </HText>
            {isAboveMediumScreens ? (
              <div className="flex justify-between ">
                <button className="border-2 rounded-md mx-2">
                  <div className="flex flex-row justify-center m-2 items-center cursor-pointer">
                    <img src={report} alt="" width={20} height={20} />
                    <Links
                      page="Report"
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                  </div>
                </button>

                <button
                  className="flex flex-row items-center m-2 cursor-pointer border-2 rounded-md mx-2 relative "
                  onClick={handleSettingClick}>
                  <img src={settingsvg} alt="" width={20} height={20} />
                  <Links
                    page="Setting"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                </button>

                <button className="border-2 rounded mx-2">
                  <div className="flex flex-row justify-center m-2 items-center cursor-pointer">
                    <img src={login} alt="" width={20} height={20} />
                    <Links
                      page="Login"
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex justify-around items-center ">
                <button className="border-2 rounded-md mx-1">
                  <div className="flex flex-row justify-center m-2 items-center cursor-pointer">
                    <img src={report} alt="" width={20} height={20} />
                  </div>
                </button>

                <button className="border-2 rounded-md mx-1">
                  <div className="flex flex-row items-center m-2 cursor-pointer">
                    <img src={settingsvg} alt="" width={20} height={20} />
                  </div>
                </button>

                <button className="border-2 rounded mx-1">
                  <div className="flex flex-row justify-center m-2 items-center cursor-pointer">
                    <img src={login} alt="" width={20} height={20} />
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </nav>

      {showSetting && (
        <Setting
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      )}
    </>
  );
};

export default Navbar;
