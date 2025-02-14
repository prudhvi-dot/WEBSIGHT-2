import { NavLink } from "react-router-dom";
import MobileNav from "./MobileNav";

const Sidebar = () => {
  return (
    <>
      <div className="flex gap-5 md:hidden">
        <MobileNav />
      </div>
    </>
  );
};

export default Sidebar;
