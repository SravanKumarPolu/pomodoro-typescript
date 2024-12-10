import Button from "@/components/NavActiveButton";
import HText from "@/shared/HText";
import Links from "./Link";
import { SelectedPage } from "@/shared/types";
import Setting from "@/setting";
import loginsvg from "../../assets/login.svg";
import { motion } from "framer-motion";
import reportsvg from "../../assets/report.svg";
import settingsvg from "../../assets/setting.svg";
import { useColor } from "@/components/ColorContex";
import { useDarkMode } from "@/components/DarkModeContext";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";

interface NavbarProps {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  isTopOfPage: boolean;
  onClose: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  selectedPage,
  setSelectedPage,
  isTopOfPage,
  onClose,
}) => {
  const flexBetween = "flex flex-col pt-6 items-center justify-between";

  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const { selectedColor } = useColor();
  const navbarBackground = isTopOfPage
    ? "bg-transparent"
    : `bg-opacity-90 backdrop-blur-md ${selectedColor} shadow-md`;

  const [showSetting, setShowSetting] = useState<boolean>(false);
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
    <nav className="fixed top-0 z-50 w-full">
      <div
        className={`${navbarBackground} ${flexBetween} ${
          isDarkMode ? "dark" : ""
        } transition-all duration-300 py-4 px-6`}>
        <motion.div
          className="flex w-full items-center justify-between max-w-7xl mx-auto md:flex-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}>
          <HText>
            <span className="text-xl font-bold tracking-wide text-white pl-2">
              Task & Breaks
            </span>
          </HText>
          <motion.div
            className="flex gap-4 mt-4 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5 }}
            variants={{
              hidden: { opacity: 0, x: 150 },
              visible: { opacity: 1, x: 0 },
            }}>
            {isAboveMediumScreens ? (
              <div className="flex items-center gap-4">
                <Button
                  className={`flex items-center gap-2 px-4 py-2   rounded-md transition-all duration-200 ${
                    selectedPage === SelectedPage.Report
                      ? "bg-opacity-90 bg-gray-800 text-white"
                      : "hover:bg-gray-700 hover:text-white"
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
                  className={`flex items-center gap-2 px-4 py-2  rounded-md transition-all duration-200 ${
                    selectedPage === SelectedPage.Setting
                      ? "bg-opacity-90 bg-gray-800 "
                      : "hover:bg-gray-700 "
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
                  className="flex items-center gap-2 px-4 py-2 rounded-md   cursor-not-allowed"
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
                  <Links
                    page="Login"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                </Button>
              </div>
            ) : (
              <div className="flex  items-center gap-1">
                <Button
                  className={`flex items-center p-2 rounded-md transition-all duration-200 ${
                    selectedPage === SelectedPage.Report
                      ? "bg-gray-800 text-white"
                      : "hover:bg-gray-700 hover:text-white"
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
                  className={`flex relative items-center p-2 rounded-md transition-all duration-200 ${
                    selectedPage === SelectedPage.Setting
                      ? "bg-gray-800 text-white"
                      : "hover:bg-gray-700 hover:text-white"
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
                  className="flex items-center p-2  text-gray-500 rounded-md cursor-not-allowed"
                  isActive={selectedPage === SelectedPage.Login}
                  disabled
                  onClick={() => setSelectedPage(SelectedPage.Login)}>
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
        <div className="absolute top-full mt-2 w-full flex justify-start  sm:justify-start lg:justify-center  md:justify-center">
          <div className="  rounded-md p-4 max-w-md">
            <Setting
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              onClose={handleSettingClose}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
