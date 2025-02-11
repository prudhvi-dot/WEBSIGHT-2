import { useState } from "react";
import HomeCard from "../components/HomeCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import MeetingModal from "../components/MeetingModal";
import { useUser } from "@clerk/clerk-react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Slide, toast } from "react-toastify";

const Home = () => {
  const [meeting, setMeeting] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const now = new Date();
  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const date = now.toLocaleDateString("en-IN", {
    dateStyle: "full",
  });
  const navigate = useNavigate();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeating = async () => {
    if (!client || !user) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        navigate(`/meeting/${call.id}`);
        toast.success("Meeting Created", { theme: "dark", transition: Slide });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14 max-md:ml-[5rem]">
          <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
            <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
              <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal -z-10">
                Upcoming Meeting at: 12:30 PM
              </h2>

              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold lg-text-7xl">{time}</h1>
                <p className="text-lg font-medium text-[#c9ddff] lg:text-2xl">
                  {date}
                </p>
              </div>
            </div>
          </div>

          <section className="mt-2.5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <HomeCard
              imgSrc="/icons/add-meeting.svg"
              title="New Meeting"
              description="Start an instant meting"
              handleClick={() => {
                setMeeting("isInstantMeeting");
              }}
              className="bg-orange-600"
            />
            <HomeCard
              imgSrc="/icons/schedule.svg"
              title="Schedule Meeting"
              description="Plan your meeting"
              handleClick={() => setMeeting("isScheduleMeeting")}
              className="bg-blue-600"
            />
            <HomeCard
              imgSrc="/icons/recordings.svg"
              title="View Recordings"
              description="Check your recordings"
              handleClick={() => navigate("/recordings")}
              className="bg-green-600"
            />
            <HomeCard
              imgSrc="/icons/join-meeting.svg"
              title="Join Meeting"
              description="Via invitation link"
              handleClick={() => setMeeting("isJoiningMeeting")}
              className="bg-purple-600"
            />
            <MeetingModal
              isOpen={meeting === "isInstantMeeting"}
              onClose={() => setMeeting(undefined)}
              title="start an instant meeting"
              className=""
              buttonText="Start Meeting"
              handleClick={createMeating}
            />
          </section>
        </section>
      </div>
    </main>
  );
};

export default Home;
