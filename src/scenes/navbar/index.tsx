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
import { useDarkMode } from "@/components/DarkModeContext";

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
  const flexBetween = "flex items-center justify-between";
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const navbarBackground = isTopOfPage ? "" : "bg-pink-200 drop-shadow";

  const [showSetting, setShowSetting] = useState(false);
  const { isDarkMode } = useDarkMode();
  const handleSettingClick = () => {
    setSelectedPage(SelectedPage.Setting);
    setShowSetting(true);
  };
  const handleSettingClose = () => {
    setShowSetting(false);
    onClose();
  };

  return (
    <>
      <header
        className=" absolute z-20 w-full 
    
    ">
        <nav>
          <div
            className={` ${navbarBackground} ${flexBetween}  fixed  top-0 z-30 w-full pb-10 sm:py-4 `}>
            <motion.div
              className=" flex w-full  relative flex-col justify-center items-center mx-auto  ml-[-.1rem] border-none md:flex-row"
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
              {isAboveMediumScreens ? (
                <div className="flex flex-row ">
                  <button
                    className={`flex  flex-row mx-1 items-center  px-2  hover:filter hover:brightness-125 cursor-pointer border-none rounded-sm  relative  bg-opacity-50 ${
                      isDarkMode ? "bg-white bg-opacity-80" : "bg-pink-500"
                    }`}
                    onClick={handleSettingClick}>
                    <Links
                      src={reportsvg}
                      className=" hover:filter hover:brightness-125 "
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
                  </button>

                  <button
                    className={`flex  flex-row mx-1 items-center px-2  hover:filter hover:brightness-125 cursor-pointer border-none rounded-sm  relative  bg-opacity-50 ${
                      isDarkMode ? "bg-white bg-opacity-80" : "bg-pink-500"
                    }`}
                    onClick={handleSettingClick}>
                    <Links
                      src={settingsvg}
                      className=" hover:filter hover:brightness-125 "
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
                  </button>
                  <button
                    className={`flex  flex-row mx-1 items-center px-2  hover:filter hover:brightness-125 cursor-pointer border-none rounded-sm  relative  bg-opacity-50 ${
                      isDarkMode ? "bg-white bg-opacity-80" : "bg-pink-500"
                    }`}
                    onClick={handleSettingClick}>
                    <Links
                      src={loginsvg}
                      className=" hover:filter hover:brightness-125 "
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
                  </button>
                </div>
              ) : (
                <div className="flex   items-center relative ">
                  <button
                    className={`flex flex-row border-none items-center m-2 cursor-pointer border-2 rounded-md px-2 relative ${
                      isDarkMode ? "bg-white bg-opacity-80" : ""
                    }`}
                    onClick={handleSettingClick}>
                    <Links
                      src={reportsvg}
                      width={24}
                      height={24}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                  </button>

                  <button
                    className={`flex flex-row border-none items-center m-2 cursor-pointer border-2 rounded-md px-2 relative ${
                      isDarkMode ? "bg-white bg-opacity-80" : ""
                    }`}
                    onClick={handleSettingClick}>
                    <Links
                      src={settingsvg}
                      width={24}
                      height={24}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                  </button>

                  <button
                    className={`flex flex-row border-none items-center m-2 cursor-pointer border-2 rounded-md px-2 relative ${
                      isDarkMode ? "bg-white bg-opacity-80" : ""
                    }`}
                    onClick={handleSettingClick}>
                    <Links
                      src={loginsvg}
                      width={24}
                      height={24}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
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
            onClose={handleSettingClose}
          />
        )}
      </header>
    </>
  );
};

export default Navbar;
