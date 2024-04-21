import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import { fetchParticipants, createParticipants, updateParticipants, deleteParticipants } from "./participant.js";

const app = express();
const port = 3001;

app.use(express.json());

if (process.env.DEVELOPMENT) {
  app.use(cors());
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/participant", async (req, res) => {
  try {
    const participants = await fetchParticipants();

    res.send(participants.Items);
  } catch (err) {
    res.status(400).send(`Error fetching participants: ${err}`);
  }
});

app.post("/participant", async (req, res) => {
  try {
    const participant = req.body;

    const response = await createParticipants(participant);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error creating participant: ${err}`);
  }
});

app.put("/participant", async (req, res) => {
  try {
    const participant = req.body;

    const response = await updateParticipants(participant);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error updating participants: ${err}`);
  }
});

app.delete("/participant/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await deleteParticipants(id);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error deleting participants: ${err}`);
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);