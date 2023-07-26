import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Card, CardHeader, CardContent } from "@mui/material";
import { getUserSession } from '../../utils/SessionManager';
import { server } from '../../utils/apiRoutes';
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';

const WelcomePage = () => {
  const { username } = useContext(AuthContext);
  const userSession = getUserSession();
  const [messages, setMessages] = useState([]);
  const [realtime, setRealtime] = useState([]);
  const [subscribeTopics, setSubscribeTopics] = useState([]);
  const [unsubscribeTopics, setUnsubscribeTopics] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const fetchUserTopicsAndMessages = async () => {
    try {
      const response = await fetch(`${server}/client/allMessages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      setMessages(JSON.parse(data.messages));
      setSubmitted(false);
    } catch (error) {
      console.error('Error fetching user topics and messages:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${server}/client/general`);
      if (response.ok) {
        const data = await response.json();
        setRealtime(data.messages);
        console.log(data.messages);
      } else {
        console.error('Failed to fetch messages:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  useEffect(() => {
    fetchUserTopicsAndMessages();
    fetchMessages();
  }, [username]);

  const handleSubscribe = (topic) => {
    setSubscribeTopics((prevTopics) => [...prevTopics, topic]);
    setUnsubscribeTopics((prevTopics) => prevTopics.filter((t) => t !== topic));
  };

  const handleUnsubscribe = (topic) => {
    setUnsubscribeTopics((prevTopics) => [...prevTopics, topic]);
    setSubscribeTopics((prevTopics) => prevTopics.filter((t) => t !== topic));
  };

  const handleSubmit = async () => {
    try {
      await fetch(`${server}/client/updateSubscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, subscribeTopics, unsubscribeTopics }),
      });
      // Trigger the useEffect to reflect the changes in messages
      fetchUserTopicsAndMessages();
      setSubmitted(true);
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  if (userSession) {
    return (
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Welcome!
        </Typography>       
          <Card sx={{ marginBottom: '20px' }}>
            <CardHeader title="Realtie messages" />
            <CardContent>
            {realtime.map((message , index) => (
               <p key = {index}>{message}</p>
            ))}
            </CardContent>    
          </Card>
        {messages.map((message) => (
          <Card key={message.messages[0].topic} sx={{ marginBottom: '20px' }}>
            <CardHeader title={message.messages[0].topic} />
            <CardContent>
              {message.messages[0].messages.length > 0 ? (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Messages:
                  </Typography>
                  {message.messages[0].messages.map((msg, index) => (
                    <Typography variant="body2" key={index}>{msg}</Typography>
                  ))}
                   <Button
                      variant="contained"
                      color={submitted ? 'success' : 'primary'}
                      onClick={() => handleUnsubscribe(message.messages[0].topic)}
                      sx={{ marginTop: '10px' }}
                    >
                      Unsubscribe
                    </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color={submitted ? 'success' : 'secondary'}
                  onClick={() => handleSubscribe(message.messages[0].topic)}
                  sx={{ marginTop: '10px' }}
                >
                  Subscribe
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
        <Button
          variant="contained"
          color={submitted ? 'success' : 'primary'}
          onClick={handleSubmit}
          sx={{ marginTop: '20px' }}
          disabled={submitted}
        >
          {submitted ? 'Submitted' : 'Save and Submit'}
        </Button>
      </Container>
    );
  }

  window.location.href = '/signin';
  return null;
};

export default WelcomePage;




  