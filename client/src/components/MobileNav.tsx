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
      className="fixed mt-14 h-full left-0 top-0 z-50 bg-[#1c1f2e] p-4 text-white md:hidden flex flex-col gap-6"
    >
      {/* ✅ Absolute Positioned Toggle Button (Top-Right) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="absolute top-4 right-4 p-2 rounded-lg cursor-pointer"
      >
        <img src="/icons/hamburger.svg" alt="Menu" className="w-8 h-8" />
      </button>

      {/* ✅ Sidebar Menu */}
      <ul className="flex flex-col gap-6 mt-14">
        {[
          { to: "/", icon: "/icons/Home.svg", text: "Home" },
          { to: "/upcoming", icon: "/icons/upcoming.svg", text: "Upcoming" },
          { to: "/previous", icon: "/icons/previous.svg", text: "Previous" },
          {
            to: "/recordings",
            icon: "/icons/recordings.svg",
            text: "Recordings",
          },
          {
            to: "/personal-room",
            icon: "/icons/add-personal.svg",
            text: "Personal",
          },
        ].map((item) => (
          <li key={item.to} className="list-none">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md ${
                  isActive ? "bg-blue-500" : ""
                }`
              }
            >
              <img className="h-6 w-6" src={item.icon} alt={item.text} />
              {/* ✅ Show text only when expanded */}
              {isOpen && <span className="text-white">{item.text}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.section>
  );
};

export default MobileNav;
