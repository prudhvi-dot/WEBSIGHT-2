import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#1c1f2e]">
      <SignIn />
    </div>
  );
};

export default SignInPage;
