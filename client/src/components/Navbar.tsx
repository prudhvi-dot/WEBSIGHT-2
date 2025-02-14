import { UserButton, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in");
    }
  }, [isSignedIn, isLoaded, navigate]);

  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#F6F5F8", // Sky blue arrow
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#F6F5F8", // Sky blue background
      color: "black", // Blue text color
    },
  }));

  return (
    <nav className="flex justify-between bg-white items-center fixed z-50 w-full shadow px-6 pt-4 lg:px-10 mb-[56px]">
      {/* 🔹 Logo Section */}
      <Link to="/" className="flex items-center gap-1">
        <img
          src="/WebCam.png"
          width={32}
          height={32}
          alt="Zoom logo"
          className="max-sm: size-10"
        />
        <p className="text-[26px] font-extrabold text-blue-400">WebSight</p>
      </Link>

      <div className="max-md:hidden">
        <ul className="flex flex-1 flex-row gap-10">
          <li className="list-none">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-md ${
                  isActive ? "border border-blue-500 rounded" : ""
                }`
              }
            >
              <BootstrapTooltip title="Home">
                <Button>
                  <img
                    src="/icons/Home.svg"
                    alt="Home"
                    className="text-blue-500"
                  />
                </Button>
              </BootstrapTooltip>
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              to="/upcoming"
              className={({ isActive }) =>
                `flex items-center gap-2.5  rounded-md ${
                  isActive ? "border border-blue-500 px-0.5 py-0.5 rounded" : ""
                }`
              }
            >
              <BootstrapTooltip title="Upcoming">
                <Button>
                  <img src="/icons/upcoming.svg" alt="Upcoming" />
                </Button>
              </BootstrapTooltip>
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              to="/previous"
              className={({ isActive }) =>
                `flex items-center gap-2.5  rounded-md ${
                  isActive ? "border border-blue-500 px-0.5 py-0.5 rounded" : ""
                }`
              }
            >
              <BootstrapTooltip title="Previous">
                <Button>
                  <img src="/icons/previous.svg" alt="Previous" />
                </Button>
              </BootstrapTooltip>
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              to="/personal-room"
              className={({ isActive }) =>
                `flex items-center gap-2.5  rounded-md ${
                  isActive ? "border border-blue-500 px-0.5 py-0.5 rounded" : ""
                }`
              }
            >
              <BootstrapTooltip title="Personal Room">
                <Button>
                  <img src="/icons/add-personal1.svg" alt="Personal Room" />
                </Button>
              </BootstrapTooltip>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* 🔹 Authentication Section */}
      {isSignedIn ? (
        <div>
          <UserButton />
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
