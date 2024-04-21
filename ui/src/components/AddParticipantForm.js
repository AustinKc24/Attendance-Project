import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "../utils";

export const AddParticipantForm = ({ fetchParticipants }) => {
  const [newParticipant, setNewParticipant] = useState("");

  const addNewParticipant = async () => {
    try {
      await axios.post(API_URL, {
        name: newParticipant,
        completed: false,
      });

      await fetchParticipants();

      setNewParticipant("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Typography align="center" variant="h2" paddingTop={2} paddingBottom={2}>
        Participant List
      </Typography>
      <div className="addParticipantForm">
        <TextField
          size="small"
          label="Participant"
          variant="outlined"
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
        />
        <Button
          disabled={!newParticipant.length}
          variant="outlined"
          onClick={addNewParticipant}
        >
          <AddIcon />
        </Button>
      </div>
    </div>
  );
};