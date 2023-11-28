// Navbar.tsx
import { motion } from "framer-motion";
import HText from "../../shared/HText";
import settingsvg from "../../assets/setting.svg";
import reportsvg from "../../assets/report.svg";
import loginsvg from "../../assets/login.svg";
import Links from "./Link";
import { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import Setting from "@/setting";
import { useState } from "react";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  isTopOfPage: boolean;
  onClose: () => void;
};

const Navbar = ({
  selectedPage,
  setSelectedPage,
  isTopOfPage,
  onClose,
}: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";
  const [showSetting, setShowSetting] = useState(false);

  const handleSettingClick = (page: SelectedPage) => {
    setSelectedPage(page);
    setShowSetting(true);
  };

  const handleSettingClose = () => {
    setShowSetting(false);
    onClose();
  };

  return (
    <>
      <nav>
        <div
          className={`${navbarBackground} flex items-center justify-between fixed top-0 z-30 w-full py-6`}>
          <motion.div
            className="flex w-full items-center mx-auto ml-[-.1rem] border-b-2"
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
            <div
              className={`flex justify-${
                isAboveMediumScreens ? "between" : "around"
              }`}>
              <button
                className="flex flex-row items-center m-2 cursor-pointer border-2 rounded-md mx-2 relative"
                onClick={() => handleSettingClick(SelectedPage.Report)}>
                <img src={reportsvg} alt="" width={20} height={20} />
                <Links
                  page="Report"
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              </button>

              <button
                className="flex flex-row items-center m-2 cursor-pointer border-2 rounded-md mx-2 relative"
                onClick={() => handleSettingClick(SelectedPage.Setting)}>
                <img src={settingsvg} alt="" width={20} height={20} />
                <Links
                  page="Setting"
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              </button>

              <button
                className="flex flex-row items-center m-2 cursor-pointer border-2 rounded-md mx-2 relative"
                onClick={() => handleSettingClick(SelectedPage.Login)}>
                <img src={loginsvg} alt="" width={20} height={20} />
                <Links
                  page="Login"
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

      {showSetting && (
        <Setting
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          onClose={handleSettingClose}
        />
      )}
    </>
  );
};

export default Navbar;
