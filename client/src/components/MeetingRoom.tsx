import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import { useParams } from "react-router-dom";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";
import { Button } from "@mui/material";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const { personal } = useParams();

  const isPersonalRoom = !!personal;

  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");

  const [showParticipents, setshowParticipents] = useState(false);

  const call = useCall();

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState != CallingState.JOINED) {
    <Loader />;
  }

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative  flex size-full items-center justify-center">
        <div className="flex size-full md:w-[50%] md:h-[50%]  items-center justify-center">
          <CallLayout />
        </div>

        <div
          className={`h-[calc(100vh-86px)] ml-2 ${
            showParticipents ? "block" : "hidden"
          }
          absolute top-0 right-1 z-50 bg-[#353b53] p-2.5 rounded-s-sm`}
        >
          <CallParticipantsList onClose={() => setshowParticipents(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex flex-wrap w-full items-center justify-center gap-5">
        <CallControls />

        <div className="dropdown dropdown-top dropdown-center">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 bg-transparent text-black"
          >
            <FormatListBulletedIcon />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <li key={index}>
                <a
                  style={{ color: "white" }}
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <CallStatsButton />

        <Tooltip title="All Participants" placement="top">
          <Button onClick={() => setshowParticipents((prev) => !prev)}>
            <GroupIcon className="text-black cursor-pointer" />
          </Button>
        </Tooltip>

        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
