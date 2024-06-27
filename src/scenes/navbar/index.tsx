// Navbar.tsx
import { motion } from "framer-motion";

import settingsvg from "../../assets/setting.svg";
import reportsvg from "../../assets/report.svg";
import loginsvg from "../../assets/login.svg";
import Links from "./Link";
import { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import Setting from "@/setting";
import { useState } from "react";
import { useDarkMode } from "@/components/DarkModeContext";
import HText from "@/shared/HText";
import Button from "@/components/NavActiveButton";

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
  const flexBetween = "flex flex-col py-8 items-center justify-between";
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const navbarBackground = isTopOfPage
    ? ""
    : "HText-black bg-pink-300  drop-shadow";

  const [showSetting, setShowSetting] = useState(false);

  const { isDarkMode } = useDarkMode();
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
      <nav className="flex h-auto w-screen">
        <div
          className={`fixed ${navbarBackground} ${flexBetween} top-0 z-30 py-3 w-full`}>
          <motion.div
            className="flex w-full relative flex-col justify-center items-center mx-auto py-0 border-none md:flex-row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}>
            <HText>
              <span className="pl-2">Task & Breaks</span>
            </HText>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.5 }}
              variants={{
                hidden: { opacity: 0, x: 150 },
                visible: { opacity: 1, x: 0 },
              }}>
              {isAboveMediumScreens ? (
                <div className="flex flex-row">
                  <Button
                    className={`cursor-none flex mx-1 text-opacity-0 items-center px-4 py-2 gap-[2px] rounded-sm relative ${
                      isDarkMode ? "bg-white bg-opacity-80" : ""
                    }`}
                    isActive={selectedPage === SelectedPage.Report}
                    disabled
                    onClick={() => setSelectedPage(SelectedPage.Report)}>
                    <Links
                      src={reportsvg}
                      width={20}
                      height={20}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                    <Links
                      page="Report"
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                  </Button>

                  <Button
                    className={`flex flex-row mx-1 items-center px-4  py-2 gap-[2px] cursor-pointer rounded-sm relative bg-opacity-50 border border-transparent hover:border-white focus:border-white ${
                      isDarkMode ? "bg-white bg-opacity-80" : ""
                    }`}
                    isActive={selectedPage === SelectedPage.Setting}
                    onClick={() => handleSettingClick(SelectedPage.Setting)}>
                    <Links
                      src={settingsvg}
                      width={20}
                      height={20}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                    <Links
                      page="Setting"
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                  </Button>

                  <Button
                    className={`flex flex-row mx-1 items-center px-4 py-2 gap-[2px] cursor-not-allowed rounded-sm relative ${
                      isDarkMode ? "bg-white bg-opacity-80" : ""
                    }`}
                    isActive={selectedPage === SelectedPage.Login}
                    onClick={() => setSelectedPage(SelectedPage.Login)}
                    disabled>
                    <Links
                      src={loginsvg}
                      width={20}
                      height={20}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                    <Links
                      page="Login"
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center relative">
                  <Button
                    className={`flex flex-row items-center m-2 rounded-md px-2 relative ${
                      isDarkMode ? "bg-white bg-opacity-80" : ""
                    }`}
                    isActive={selectedPage === SelectedPage.Report}
                    disabled
                    onClick={() => setSelectedPage(SelectedPage.Report)}>
                    <Links
                      src={reportsvg}
                      width={24}
                      height={24}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                  </Button>

                  <button
                    className={`flex flex-row items-center m-2 cursor-pointer rounded-md px-2 relative ${
                      isDarkMode ? "bg-white bg-opacity-80" : ""
                    }`}
                    onClick={() => handleSettingClick(SelectedPage.Setting)}>
                    <Links
                      src={settingsvg}
                      width={24}
                      height={24}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                  </button>

                  <Button
                    className={`flex flex-row border-none items-center m-2 border-2 rounded-md px-2 relative ${
                      isDarkMode ? "bg-white bg-opacity-80" : ""
                    }`}
                    isActive={selectedPage === SelectedPage.Login}
                    onClick={() => setSelectedPage(SelectedPage.Login)}
                    disabled>
                    <Links
                      src={loginsvg}
                      width={24}
                      height={24}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {showSetting && (
          <Setting
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            onClose={handleSettingClose}
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;
