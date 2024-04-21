import { Button, Checkbox, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { UpdateParticipantForm } from "./updateParticipantForm";
import classnames from "classnames";
import axios from "axios";
import { API_URL } from "../utils";

export const Participant = ({ participant, fetchParticipants }) => {
  const { id, name, completed } = participant;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateParticipantCompletion = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name,
        completed: !isComplete,
      });
      setIsComplete((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteParticipant = async () => {
    try {
      await axios.delete(`${API_URL}/${participant.id}`);

      await fetchParticipants();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="participant">
      <div
        className={classnames("flex", {
          done: isComplete,
        })}
      >
        <Checkbox checked={isComplete} onChange={handleUpdateParticipantCompletion} />
        <Typography variant="h4">{name}</Typography>
      </div>
      <div className="participantButtons">
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteParticipant}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateParticipantForm
        fetchParticipants={fetchParticipants}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        participant={participant}
      />
    </div>
  );
};