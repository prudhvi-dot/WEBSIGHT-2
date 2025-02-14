import { useUser } from "@clerk/clerk-react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

import Loader from "../src/components/Loader";
import { Outlet } from "react-router-dom";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

const StreamVideoProvider = () => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
  const { user, isLoaded } = useUser();

  const getToken = async (id: string): Promise<string> => {
    const res = await fetch("https://websight-2.vercel.app/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure the correct content type
      },
      body: JSON.stringify({ userId: id }),
    });

    if (!res.ok) {
      const errorBody = await res.text(); // Get the error response body
      throw new Error(`Failed to generate Token: ${errorBody}`);
    }

    const body = await res.json();
    console.log("Token received:", body.token);
    return body.token;
  };

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream API key missing");

    const id = user.id;

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: id,
        name: user.username || id,
        image: user.imageUrl,
      },
      tokenProvider: () => getToken(id), // Ensure this returns a promise
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) {
    return <Loader />;
  }
  return (
    <StreamVideo client={videoClient}>
      <Outlet />
    </StreamVideo>
  );
};

export default StreamVideoProvider;
