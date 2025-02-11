import { NavLink } from "react-router-dom";
import MobileNav from "./MobileNav";

const Sidebar = () => {
  return (
    <>
      <div className="flex gap-5 md:hidden">
        <MobileNav />
      </div>
      <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#1c1f2e] p-6 pt-28 text-white max-sm:hidden lg:w-[264px] rounded">
        <div className="">
          <ul className="flex flex-1 flex-col gap-10">
            <li className="list-none">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-4 py-2 rounded-md ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <img src="/icons/Home.svg" alt="" />
                <span className="text-white">Home</span>
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                to="/upcoming"
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-4 py-2 rounded-md ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <img src="/icons/upcoming.svg" alt="" />
                <span className="text-white">Upcoming</span>
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                to="/previous"
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-4 py-2 rounded-md ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <img src="/icons/previous.svg" alt="" />
                <span className="text-white">Previous</span>
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                to="/recordings"
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-4 py-2 rounded-md ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <img className="h-6 w-6" src="/icons/recordings.svg" alt="" />
                <span className="text-white">Recordings</span>
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                to="/personal-room"
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-4 py-2 rounded-md ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <img src="/icons/add-personal.svg" alt="" />
                <span className="text-white">Personal Room</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
