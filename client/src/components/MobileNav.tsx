import { NavLink } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const containerVariants = {
  close: {
    width: "5rem", // ✅ Compact mode
    transition: { type: "spring", damping: 15, duration: 0.5 },
  },
  open: {
    width: "16rem", // ✅ Expanded mode
    transition: { type: "spring", damping: 15, duration: 0.5 },
  },
};

const arrowVarients = {
  close: {
    rotate: 0,
    transition: { type: "spring", duration: 0.5 },
  },
  open: {
    rotate: -180,
    transition: { type: "spring", duration: 0.5 },
  },
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isOpen ? "open" : "close");
  }, [isOpen, controls]);

  return (
    <motion.section
      variants={containerVariants}
      animate={controls}
      initial="close"
      className="fixed mt-14 h-full left-0 top-3.5 z-50 border bg-white shadow p-4 text-white  flex flex-col gap-6"
    >
      {/* ✅ Absolute Positioned Toggle Button (Top-Right) */}
      <motion.button
        variants={arrowVarients}
        type="button"
        initial="close"
        animate={controls}
        onClick={() => setIsOpen((prev) => !prev)}
        className="absolute top-4 right-4 p-2 rounded-lg cursor-pointer"
      >
        <img src="/icons/arrow_forward.svg" alt="Menu" className="w-8 h-8" />
      </motion.button>

      {/* ✅ Sidebar Menu */}
      <ul className="flex flex-col gap-6 mt-14">
        {[
          { to: "/", icon: "/icons/Home.svg", text: "Home" },
          { to: "/upcoming", icon: "/icons/upcoming.svg", text: "Upcoming" },
          { to: "/previous", icon: "/icons/previous.svg", text: "Previous" },
          {
            to: "/personal-room",
            icon: "/icons/add-personal.svg",
            text: "Personal",
          },
        ].map((item) => (
          <li key={item.to} className="list-none flex items-center w-full">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-md hover:bg-blue-50 w-full ${
                  isActive ? "bg-blue-200" : ""
                }`
              }
            >
              <img className="h-6 w-6" src={item.icon} alt={item.text} />
              {isOpen && <span className="text-blue-500">{item.text}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.section>
  );
};

export default MobileNav;
