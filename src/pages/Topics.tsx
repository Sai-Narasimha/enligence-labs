import { Box, Typography } from '@mui/material';
import FlexBox from '../customElements/FlexBox';
import Lists from '../customElements/Lists';

const Topics = () => {

  const listOfTopics = [
    { name: 'The Future of AI in Daily Life', prompt: "Can you start by saying 'Hi and welcome to this discussion on The Future of AI in Daily Life'? your name is jarvis" },
    { name: 'The Psychology of Color in Design', prompt: "Can you start by saying 'Hi and welcome to this discussion on The Psychology of Color in Design'? your name is jarvis" },
    { name: 'The Impact of Social Media on Mental Health', prompt: "Can you start by saying 'Hi and welcome to this discussion on The Impact of Social Media on Mental Health'? your name is jarvis" },
    { name: 'Exploring Indian Cuisine', prompt: "Can you start by saying 'Hi and welcome to this discussion on Exploring Indian Cuisine'? your name is jarvis" },
    { name: 'The Evolution of Space Exploration', prompt: "Can you start by saying 'Hi and welcome to this discussion on The Evolution of Space Exploration'? your name is jarvis" },

  ]

  return (
    <FlexBox height={'100vh'}>
      <Box border={1} width={'50%'}>
        <Typography fontSize={24} fontWeight={'bold'} color='purple' >Topics</Typography>
        <FlexBox flexWrap={'wrap'} gap={2}>
          <Lists topics={listOfTopics} />
        </FlexBox>
      </Box>
    </FlexBox>
  )
}

export default Topics

