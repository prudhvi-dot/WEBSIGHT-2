// server.js
import express from "express";
import { StreamClient } from "@stream-io/node-sdk";
import { config } from "dotenv";
import cors from "cors";

config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

app.use(express.json());

// Endpoint to create a token for a user
app.post("/token", (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User  ID is required" });
  }
  console.log(userId);
  const client = new StreamClient(apiKey, apiSecret);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  const issued = Math.floor(Date.now() / 1000) - 60;

  const token = client.generateUserToken({
    user_id: userId,
    validity_in_seconds: exp,
  });
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
