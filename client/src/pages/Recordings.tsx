import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useGetCalls } from "../Hooks/uesGetCalls";
import Loader from "../components/Loader";
import { CallRecording } from "@stream-io/video-react-sdk";
import MeetingCard from "../components/MeetingCard";

const Recordings = () => {
  const { callRecordings, isLoading } = useGetCalls();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
      );

      const newRecordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      console.log("Call recordings", recordings);
      setRecordings(newRecordings);
    };

    fetchRecordings();
  }, [callRecordings]);

  console.log(recordings);

  if (isLoading) return <Loader />;
  return (
    <main>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex items-center min-h-screen flex-1 flex-col px-6 bg-white pb-6 pt-18 max-md:pb-14 sm:px-14 max-md:ml-[5rem]">
          <section className="flx size-full flex-col gap-10 text-black">
            <h1 className="text-3xl font-blod">Recordings</h1>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {recordings.length > 0 ? (
                recordings.map((recording: CallRecording, index) => (
                  <MeetingCard
                    key={index}
                    icon={"/icons/recordings.svg"}
                    title={recording.filename.substring(0, 20)}
                    date={recording.start_time?.toLocaleString()}
                    link={recording.url}
                    buttonIcon1="/icons/play.svg"
                    buttonText="play"
                    handleClick={() => {
                      window.open(recording.url, "_blank");
                    }}
                  />
                ))
              ) : (
                <h1>No recordings</h1>
              )}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Recordings;
