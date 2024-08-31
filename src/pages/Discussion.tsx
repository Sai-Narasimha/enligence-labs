import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { Box, IconButton, Typography } from '@mui/material';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import FlexBox from '../customElements/FlexBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import MicOffIcon from '@mui/icons-material/MicOff';
import ListeningAnime from '../components/ListeningComp/ListeningAnime';
const Discussion = () => {
  const { selectedTopic } = useAppSelector((state) => state.topicReducer);
  const [firstPromptSent, setFirstPromptSent] = useState(false);
  const [firstPrompt, setFirstPrompt] = useState<string | undefined>('');
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const endpoint = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

  const handleRequest = async (inputText: string) => {
    try {
      const result = await axios.post(
        `${endpoint}?key=${API_KEY}`,
        {
          contents: [
            {
              role: 'user',
              parts: [{ text: inputText }],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const resultText = result.data.candidates[0].content.parts;
      console.log(resultText[resultText.length - 1].text);
      speak(resultText[resultText.length - 1].text);
    } catch (err) {
      console.log('err: ', err);
    }
  };

  // for setting the first prompt as a payload
  useEffect(() => {
    if (selectedTopic?.prompt) {
      setFirstPrompt(selectedTopic.prompt);
    }
  }, [selectedTopic]);

  // api call with first prompt
  useEffect(() => {
    if (firstPrompt && !firstPromptSent) {
      // handleRequest(firstPrompt);
      setFirstPromptSent(true); // for setting the prompt only once
    }
  }, [firstPrompt, firstPromptSent]);

  // when not listening it will call, so that after it call call after listening
  useEffect(() => {
    if (!listening && transcript) {
      // handleRequest(transcript);
      resetTranscript();// it will clear the transcript 
    }
  }, [listening]);

  // to stop listening automatically after 5 seconds silence
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (listening) {
      stopSpeaking(); // Stop text-to-speech when listening starts

      timeout = setTimeout(() => {
        SpeechRecognition.stopListening();
      }, 5000); 
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [listening]);

  // Function to stop text-to-speech
  const stopSpeaking = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  const handleMicrophone = () => {
    if (!listening) {
      SpeechRecognition.startListening();
    }
    else SpeechRecognition.stopListening();
  }

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.pitch = 1;
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  return (
    <FlexBox height={'100vh'}>
      <Box height={'500px'} width={'70%'} boxShadow={10} borderRadius={2}>
        <Typography fontWeight={'bold'} fontSize={20} bgcolor={'purple'} color='white' py={2} borderRadius={'8px 8px 0 0'}>
          {selectedTopic?.name}
        </Typography>
        <Box>
          <IconButton onClick={handleMicrophone} >
            {listening ? <SettingsVoiceIcon style={{ fontSize: '40px', color: 'purple' }} /> : <MicOffIcon style={{ fontSize: '40px' }} />}
          </IconButton>
          {listening && <ListeningAnime />}
          <Typography>Transcript: {transcript}</Typography>
        </Box>
      </Box>
    </FlexBox>
  );
};

export default Discussion;
