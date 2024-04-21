import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AddParticipantForm } from "./components/AddParticipantForm";
import { Participant } from "./components/Participant";
import axios from "axios";
import { API_URL } from "./utils";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [participants, setParticipants] = useState([]);

  const fetchParticipants = async () => {
    try {
      const { data } = await axios.get(API_URL);

      setParticipants(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddParticipantForm fetchParticipants={fetchParticipants} />
      {participants.map((participant) => (
        <Participant participant={participant} key={participant.id} fetchParticipants={fetchParticipants} />
      ))}
    </ThemeProvider>
  );
}