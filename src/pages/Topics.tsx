import { Box, Typography } from '@mui/material';
import React from 'react'
import FlexBox from '../customElements/FlexBox';
import Lists from '../customElements/Lists';

const Topics = () => {

  const listOfTopics = [
    { name: 'The Future of AI in Daily Life', prompt: "Can you start by saying 'Hi and welcome to this discussion on The Future of AI in Daily Life'?" },
    { name: 'The Psychology of Color in Design', prompt: "AI, welcome to this discussion on The Psychology of Color in Design. Let's dive deep into it!" },
    { name: 'The Impact of Social Media on Mental Health', prompt: "AI, welcome to this discussion on The Impact of Social Media on Mental Health. Let's dive deep into it!" },
    { name: 'Exploring Indian Cuisine', prompt: "AI, welcome to this discussion on Exploring Indian Cuisine. Let's dive deep into it!" },
    { name: 'The Evolution of Space Exploration', prompt: "AI, welcome to this discussion on The Evolution of Space Exploration. Let's dive deep into it!" },

  ]
  const name: string = localStorage.getItem('userName') || ""

  return (
    <FlexBox height={'100vh'}>
      <Box border={1} width={'50%'}>
        <Typography fontSize={24} fontWeight={'bold'}> Hi <span style={{ color: 'purple' }}>{name}</span></Typography>
        <FlexBox flexWrap={'wrap'} gap={2}>
          <Lists topics={listOfTopics} />
        </FlexBox>
      </Box>
    </FlexBox>
  )
}

export default Topics

