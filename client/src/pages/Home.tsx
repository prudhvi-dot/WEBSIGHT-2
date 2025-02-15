import { useState } from "react";
import HomeCard from "../components/HomeCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import MeetingModal from "../components/MeetingModal";
import { useUser } from "@clerk/clerk-react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Slide, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [meeting, setMeeting] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
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

  const meetingLink = `${import.meta.env.VITE_PUBLIC_BASEURL}/meeting/${
    callDetails?.id
  }`;

  return (
    <main>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex items-center min-h-screen flex-1 flex-col px-19 bg-white pb-6 pt-18 max-md:pb-14 max-sm:px-0 max-md:ml-[5rem]">
          {/* <div className="max-sm:hidden h-[300px] w-full rounded-[20px] bg-hero bg-cover flex justify-center">
            <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
              <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal -z-10">
                Upcoming Meeting at: 12:30 PM
              </h2>

              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold lg-text-7xl text-white">
                  {time}
                </h1>
                <p className="text-lg font-medium text-[#c9ddff] lg:text-2xl">
                  {date}
                </p>
              </div>
            </div>
          </div> */}
          <section className="mt-2.5 grid max-sm:grid-cols-1  gap-16 sm:grid-cols-2 lg:grid-cols-4">
            <HomeCard
              imgSrc="/icons/add-meeting.svg"
              title="New Meeting"
              description="Start an instant meting"
              handleClick={() => {
                setMeeting("isInstantMeeting");
              }}
              className="bg-orange-50 border border-orange-400 text-orange-500 shrink-1"
            />
            <HomeCard
              imgSrc="/icons/schedule.svg"
              title="Schedule Meeting"
              description="Plan your meeting"
              handleClick={() => setMeeting("isScheduleMeeting")}
              className="bg-blue-50 border border-blue-400 text-blue-500"
            />
            <HomeCard
              imgSrc="/icons/recordings.svg"
              title="View Recordings"
              description="Check your recordings"
              handleClick={() => navigate("/recordings")}
              className="bg-green-50 border border-green-400 text-green-500"
            />
            <HomeCard
              imgSrc="/icons/join-meeting.svg"
              title="Join Meeting"
              description="Via invitation link"
              handleClick={() => setMeeting("isJoiningMeeting")}
              className="bg-purple-50 border border-purple-400 text-purple-500"
            />
            {!callDetails ? (
              <MeetingModal
                isOpen={meeting === "isScheduleMeeting"}
                onClose={() => setMeeting(undefined)}
                title="Create Meeting"
                buttonText="Start Meeting"
                handleClick={createMeating}
              >
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="description">Add a description</label>
                  <textarea
                    id="description"
                    className="textarea textarea-info border border-gray-400 bg-white text-black outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e) => {
                      setValues({ ...values, description: e.target.value });
                    }}
                    placeholder="description"
                  ></textarea>
                </div>
                <div className="flex w-full flex-col gap-2.5">
                  <label htmlFor="time">Time</label>
                  <DatePicker
                    className="border outline-none border-gray-400"
                    id="time"
                    selected={values.dateTime}
                    onChange={(date) => {
                      if (date) {
                        setValues({ ...values, dateTime: date });
                      } else {
                        setValues({ ...values, dateTime: new Date() });
                      }
                    }}
                    showTimeSelect
                    dateFormat="Pp"
                  />
                </div>
              </MeetingModal>
            ) : (
              <MeetingModal
                isOpen={meeting === "isScheduleMeeting"}
                onClose={() => {
                  setMeeting(undefined);
                  setCallDetails(undefined);
                }}
                title="Meeting Created"
                buttonText="Copy Meeting Link"
                handleClick={() => {
                  navigator.clipboard.writeText(meetingLink);
                  toast.info("Link Copied");
                }}
              ></MeetingModal>
            )}

            <MeetingModal
              isOpen={meeting === "isInstantMeeting"}
              onClose={() => setMeeting(undefined)}
              title="Start an instant meeting"
              buttonText="Start Meeting"
              handleClick={createMeating}
            />

            <MeetingModal
              isOpen={meeting === "isJoiningMeeting"}
              onClose={() => setMeeting(undefined)}
              title="Paste the link here"
              buttonText="Join Meeting"
              handleClick={() => navigate(values.link)}
            >
              <input
                className="border-none"
                type="text"
                placeholder="Meeting link"
                onChange={(e) => setValues({ ...values, link: e.target.value })}
              />
            </MeetingModal>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Home;
