import { useUser } from "@clerk/clerk-react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MeetingSetup from "../components/MeetingSetup";
import MeetingRoom from "../components/MeetingRoom";
import { useGetCallById } from "../Hooks/useGetCallById";
import Loader from "../components/Loader";

const Meeting = () => {
  const { id } = useParams();

  const { isLoaded } = useUser();

  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
