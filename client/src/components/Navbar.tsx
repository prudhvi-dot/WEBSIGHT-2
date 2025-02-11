import { UserButton, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  // Redirect to SignIn when user signs out (only after Clerk is loaded)
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in");
    }
  }, [isSignedIn, isLoaded, navigate]);

  return (
    <nav className="flex justify-between items-center fixed z-50 w-full bg-[#1c1f2e] px-6 pt-4 lg:px-10 mb-[56px]">
      {/* 🔹 Logo Section */}
      <Link to="/" className="flex items-center gap-1">
        <img
          src="/WebCam.png"
          width={32}
          height={32}
          alt="Zoom logo"
          className="max-sm: size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          WebSight
        </p>
      </Link>
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
