import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from 'react';
import { server } from '../../utils/apiRoutes';

const SendMessage = () => {
  const { isAdmin } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("");
  const [saveToDB, setSaveToDB] = useState(false);

  const handleMessageSend = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server with the message, topic, and saveToDB values
      await fetch(`${server}/admin/sendmsg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, topic, saveToDB }),
      });
      console.log("Message:", message);
      // Reset the input fields
      setMessage("");
      setTopic("");
      setSaveToDB(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // If the user is not an admin, display an error message
  if (!isAdmin) {
    return <div>You do not have permission to access this page.</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Send Message
      </Typography>
      <form onSubmit={handleMessageSend} style={{ width: "100%" }}>
        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          fullWidth
          margin="normal"
        />
        <label>
          <input
            type="checkbox"
            checked={saveToDB}
            onChange={(e) => setSaveToDB(e.target.checked)}
          />
          Save to Database
        </label>
        <Button variant="contained" color="secondary" type="submit">
          Send
        </Button>
      </form>
    </Box>
  );
};

export default SendMessage;
