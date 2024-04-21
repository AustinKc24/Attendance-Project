import React, { useState } from "react";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { API_URL } from "../utils";

export const UpdateParticipantForm = ({
  fetchParticipants,
  isDialogOpen,
  setIsDialogOpen,
  participant,
}) => {
  const { id, completed } = participant;
  const [participantName, setParticipantName] = useState("");

  const handleUpdateParticipantName = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name: participantName,
        completed,
      });

      await fetchParticipants();

      setParticipantName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Edit Participant</DialogTitle>
      <div className="dialog">
        <TextField
          size="small"
          label="Participant"
          variant="outlined"
          onChange={(e) => setParticipantName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={async () => {
            await handleUpdateParticipantName();
            
            setIsDialogOpen(false);
          }}
        >
          <CheckIcon />
        </Button>
      </div>
    </Dialog>
  );
};