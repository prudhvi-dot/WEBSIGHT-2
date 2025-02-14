import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const call = useCall();
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  if (!call) {
    throw new Error("useCall must be used within StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      try {
        call?.camera.disable();
        call?.microphone.disable();
      } catch (error) {
        console.error("Error disabling devices:", error);
      }
    } else {
      try {
        call?.camera.enable();
        call?.microphone.enable();
      } catch (error) {
        console.error("Error enabling devices:", error);
      }
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex w-full h-screen flex-col items-center justify-center gap-3 text-black p-5">
      <h1 className="text-xl font-bold text-center">Setup</h1>
      <div className="w-2/3 flex justify-center max-md:w-full">
        <VideoPreview />
      </div>
      <div className="items-center justify-center gap-3">
        <div className="flex gap-3">
          <label className="flex items-center justify-center gap-2 font-medium">
            <input
              type="checkbox"
              checked={isMicCamToggledOn}
              onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
            />
            Join with mic and camera off
          </label>
          <DeviceSettings />
        </div>

        <button
          type="button"
          className="rounded-md bg-green-500 px-4 py-2.5 cursor-pointer m-auto block"
          onClick={() => {
            setIsSetupComplete(true);
            call.join();
          }}
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default MeetingSetup;
