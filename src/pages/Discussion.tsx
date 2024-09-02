import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { Box, IconButton, Skeleton, Typography } from '@mui/material';
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
  console.log('avatar: ', avatar);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // ------------------------------------  component states  --------------------------------------
  const [firstPromptSent, setFirstPromptSent] = useState(false);
  const [firstPrompt, setFirstPrompt] = useState<string | undefined>('');
  const [context, setContext] = useState<string>('')
  const [vidoeId, setVideoId] = useState<string>('')
  const [gemeniLoading, setGeminiLoading] = useState<boolean>(false)
  //  --------------------------------------  endpoints  ----------------------------------------------
  const API_KEY_GEMINI = process.env.REACT_APP_OPENAI_API_KEY;
  const endpointGemini = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
  const ednpointHeygenVidId = 'https://api.heygen.com/v2/video/generate'
  const endpointHetgenVid = "https://api.heygen.com/v1/video_status.get?video_id="

  // --------------------------------------  API calls  ----------------------------------------------
  // Gemeni AI text requests
  const handleTextRequest = async (inputText: string) => {
    setGeminiLoading(true)
    try {
      const payload =
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: inputText }],
          },
        ],

      };
      const url = `${endpointGemini}?key=${API_KEY_GEMINI}`;
      const res = await postApiMethod(url, payload);
      const resultText = res?.candidates[0].content.parts;
      speak(resultText[resultText.length - 1].text);
      setContext(resultText[resultText.length - 1].text);
      setGeminiLoading(false)
    } catch (err) {
      console.error(err);
    }
  };

  // heygen video ID requests
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
            input_text: context,
            voice_id: '1bd001e7e50f421d891986aad5158bc8',
            speed: 1.1,
          },
        },
      ],
      dimension: {
        width: 1280,
        height: 720
      },
      aspect_ratio: null,
      test: true
    };
    const headers = { "X-Api-Key": process.env.REACT_APP_HEYGEN_API_KEY, }
    try {
      const result = await postApiMethod(ednpointHeygenVidId, payload, headers)
      setVideoId(result.video_id)
    } catch (error) {
      console.log('error: ', error);
    }
  }
  // heygen video requests with video ID
  const handleGetVideoWithId = async () => {
    if (!vidoeId) return;
    try {
      const result = await getApiMethod(`${endpointHetgenVid}${vidoeId}`, {
        "Accept": 'application/json',
        "X-Api-Key": process.env.REACT_APP_HEYGEN_API_KEY
      })
      console.log(result)
    } catch (error) {
      console.log('error: ', error);
    }
  }
  // ----------------------------------------  Utility functions  --------------------------------------
  const toggleListening = () => {
    listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening();
  };

  // Function to stop text-to-speech
  const stopSpeaking = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
    }
  };

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



  // --------------------------------------  Component Effects  ---------------------------------------
  // Ensure hooks are called in the same order by removing any conditions
  useEffect(() => {
    if (selectedTopic?.prompt && !firstPromptSent) {
      setFirstPrompt(selectedTopic.prompt);
    }
  }, [selectedTopic, firstPromptSent]);

  useEffect(() => {
    if (firstPrompt && !firstPromptSent) {
      handleTextRequest(firstPrompt);
      setFirstPromptSent(true); // Ensure the prompt is only sent once
    }
  }, [firstPrompt, firstPromptSent]);

  useEffect(() => {
    if (!listening && transcript) {
      handleTextRequest(transcript);
      resetTranscript(); // Clear the transcript
    }
  }, [listening, transcript]);

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

  useEffect(() => {
    if (context) {
      handleVideoIdRequest();
    }
  }, [context]);

  useEffect(() => {
    if (vidoeId) {
      handleGetVideoWithId();
    }
  }, [vidoeId]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }
  return (
    <FlexBox height={'100vh'}>
      <Box height={'500px'} width={'70%'} boxShadow={10} borderRadius={2}>
        <Typography fontWeight={'bold'} fontSize={20} bgcolor={'purple'} color='white' py={2} borderRadius={'8px 8px 0 0'}>
          {selectedTopic?.name}
        </Typography>
        {gemeniLoading ? <Skeleton width={'70%'} height={'500px'} /> : <Box height={'300px'} width={'100%'}>
          <img src={avatar?.preview_image_url} alt={'avatar'} width={'300px'} />
        </Box>}
        <Box>
          <IconButton onClick={toggleListening} >
            {listening ? <SettingsVoiceIcon style={{ fontSize: '40px', color: 'purple' }} /> : <MicOffIcon style={{ fontSize: '40px' }} />}
          </IconButton>
          {listening && <Box ><Typography color='black'>I am listening....</Typography></Box>}
        </Box>
      </Box>
    </FlexBox>
  );
};

export default Discussion;
