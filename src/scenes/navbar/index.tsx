import { motion } from "framer-motion";
import HText from "../../shared/HText";
import setting from "../../assets/setting.svg";
import report from "../../assets/report.svg";
import login from "../../assets/login.svg";
import Link from "./Link";
import { SelectedPage } from "@/shared/types";

type Props = {
  selectedPage: SelectedPage;
  // isTopOfPage: boolean;
  setSelectedPage: (value: SelectedPage) => void;
};

const Navbar = ({ selectedPage, setSelectedPage }: Props) => {
  const flexBetween = "flex items-center justify-between";
  return (
    <>
      <nav>
        <div className={`${flexBetween} fixed top-0 z-30 w-full py-6`}>
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
            <div className="flex  justify-between ">
              <button className="border-2 rounded-md mx-2">
                <div className="flex flex-row justify-center m-2 items-center cursor-pointer ">
                  <img src={report} alt="" width={20} height={20} />
                  <Link
                    page="Report"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                </div>
              </button>

              <button className="border-2 rounded-md mx-2">
                <div className="flex flex-row  items-center  m-2 cursor-pointer">
                  <img src={setting} alt="" width={20} height={20} />
                  <Link
                    page="Setting"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                </div>
              </button>

              <button className="border-2 rounded mx-2">
                <div className="flex flex-row justify-center m-2 items-center cursor-pointer ">
                  <img src={login} alt="" width={20} height={20} />
                  <Link
                    page="Login"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
