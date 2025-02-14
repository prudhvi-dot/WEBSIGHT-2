// @ts-nocheck

import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useGetCalls } from "../Hooks/uesGetCalls";
import { useEffect, useState } from "react";
import { div } from "motion/react-client";
import Meeting from "../pages/Meeting";
import MeetingCard from "./MeetingCard";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { endedCalls, upcomingCalls, isLoading } = useGetCalls();

  const navigate = useNavigate();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return [];
    }
  };

  if (isLoading) return <Loader />;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call) => (
          <MeetingCard
            key={(meeting as Call)?.id}
            icon={
              type === "ended" ? "/icons/previous.svg" : "/icons/upcoming.svg"
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              "No Description"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${import.meta.env.VITE_PUBLIC_BASEURL}/meeting/${
                    meeting as Call
                  }`
            }
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            handleClick={() => {
              navigate(`/meeting/${(meeting as Call).id}`);
            }}
            buttonText={"Start"}
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
