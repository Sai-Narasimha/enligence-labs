import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { Box, IconButton, Typography } from '@mui/material';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import FlexBox from '../customElements/FlexBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import MicOffIcon from '@mui/icons-material/MicOff';
import ListeningAnime from '../components/ListeningComp/ListeningAnime';
import { getApiMethod, postApiMethod } from '../utils/api';
const Discussion = () => {
  const { selectedTopic } = useAppSelector((state) => state.topicReducer);
  const { avatar } = useAppSelector(state => state.avatarReducer);
  const [firstPromptSent, setFirstPromptSent] = useState(false);

  const [firstPrompt, setFirstPrompt] = useState<string | undefined>('');
  const [vidoeId, setVideoId] = useState<string>('')
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const endpointGemini = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
  const ednpointHeygenVidId = 'https://api.heygen.com/v2/video/generate'
  const endpointHetgenVid = "https://api.heygen.com/v1/video_status.get?video_id="


  const handleTextRequest = async (inputText: string) => {
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: inputText }],
        },
      ],
    }
    const url = `${endpointGemini}?key=${API_KEY}`
    postApiMethod(url, payload).then((res) => {
      console.log(res)
      const resultText = res.data.candidates[0].content.parts;
      console.log(resultText[resultText.length - 1].text);
      speak(resultText[resultText.length - 1].text);
    }).catch((err: any) => console.log(err))
  };



  const handleVideoIdRequest = async () => {
    const payload = {
      video_inputs: [
        {
          character: {
            type: 'avatar',
            avatar_id: 'Angela-inblackskirt-20220820',
            avatar_style: 'normal',
          },
          voice: {
            type: 'text',
            input_text: 'Welcome to HeyGen API.',
            voice_id: '1bd001e7e50f421d891986aad5158bc8',
            speed: 1.1,
          },
        },
      ],
    };

    postApiMethod(ednpointHeygenVidId, payload, {
      "X-Api-Key": process.env.REACT_APP_HEYGEN_API_KEY,
    }).then((res) => {
      console.log(res.data.video_id, 'video id')
      setVideoId(res.data.video_id)
    }).catch((err) => console.log(err))

  }

  const handleGetVideoWithId =  () => {
    getApiMethod(`${endpointHetgenVid}${vidoeId}`, {
      headers: {
        "Accept": 'application/json',
        "X-Api-Key": process.env.REACT_APP_HEYGEN_API_KEY
      }
    }).then((res) => {
      console.log(res.data)
    }).catch((err) => console.log(err))
  }

  // for setting the first prompt as a payload
  useEffect(() => {
    if (selectedTopic?.prompt) {
      setFirstPrompt(selectedTopic.prompt);
    }
  }, [selectedTopic]);

  // api call with first prompt
  useEffect(() => {
    if (firstPrompt && !firstPromptSent) {
      // handleTextRequest(firstPrompt);
      setFirstPromptSent(true); // for setting the prompt only once
    }
  }, [firstPrompt, firstPromptSent]);

  // when not listening it will call, so that after it call call after listening
  useEffect(() => {
    if (!listening && transcript) {
      // handleTextRequest(transcript);
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

  // to generate the Heygen video ID
  useEffect(() => {
    handleVideoIdRequest()
  }, [])

  // to get the video with the video id
  useEffect(() => {
    handleGetVideoWithId()
  }, [])

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
