import { motion } from "framer-motion";
import HText from "../../shared/HText";
import setting from "../../assets/setting.svg";
import report from "../../assets/report.svg";
import login from "../../assets/login.svg";

type Props = {
  //   selectedPage: SelectedPage;
  //   isTopOfPage: boolean;
  //   setSelectedPage: (value: SelectedPage) => void;
};

const Navbar = ({}: Props) => {
  return (
    <>
      <motion.div
        className=" flex mx-auto w-5/6 ml-[-.1rem]"
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
        <div className="flex  justify-between">
          <div className="flex flex-row justify-center m-2 items-center cursor-pointer ">
            <img src={report} alt="" width={20} height={20} />
            <h2>Report</h2>
          </div>
          <div className="flex flex-row  items-center  m-2 cursor-pointer">
            <img src={setting} alt="" width={20} height={20} />
            <h2>Setting</h2>
          </div>

          <div className="flex flex-row justify-center m-2 items-center cursor-pointer ">
            <img src={login} alt="" width={20} height={20} />
            <h2>Login</h2>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
