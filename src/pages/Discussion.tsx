import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { Box, Button, Typography } from '@mui/material';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

const Discussion = () => {
  const { selectedTopic } = useAppSelector((state) => state.topicReducer);

  const [firstPrompt, setFirstPrompt] = useState<string | undefined>('')
  console.log('firstPrompt: ', firstPrompt);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  console.log('listening: ', listening);
  console.log('transcript: ', transcript);



  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const endpoint = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

  const handleRequest = async () => {
    // setLoading(true);
    // setError('');
    try {
      const result = await axios.post(
        `${endpoint}?key=${API_KEY}`,
        {
          contents: [
            {
              role: 'user',
              parts: [{ text: firstPrompt ? firstPrompt : transcript }],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(result.data);
    } catch (err) {
      console.log('err: ', err);
      // setError('Failed to fetch response');
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (!listening) {
      // handleRequest();
    }
  }, [listening])


  useEffect(() => {
    setFirstPrompt(selectedTopic?.prompt)
    // handleRequest();
  }, []);




  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }


  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(selectedTopic?.prompt);
      utterance.lang = 'en-US';
      utterance.pitch = 1;
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  return (
    <Box>
      <Typography fontWeight={'bold'} fontSize={20}>
        {selectedTopic?.name}
      </Typography>
      <Box>
        <Button onClick={() => SpeechRecognition.startListening()}>Start</Button>
        <Button onClick={() => SpeechRecognition.stopListening()}>Stop</Button>
        <Button onClick={resetTranscript}>Reset</Button>
        <Typography>{listening ? 'Listening...' : 'Not listening'}</Typography>
        <Typography>Transcript: {transcript}</Typography>
      </Box>
    </Box>
  );
};

export default Discussion;
