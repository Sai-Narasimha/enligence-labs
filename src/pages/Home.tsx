import { Box, Divider, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import FlexBox from '../customElements/FlexBox'
import Lists from '../customElements/Lists'

const Home = () => {
    const [name, setName] = useState<string>('')
    const listOfTopics = [
        { name: 'The Future of AI in Daily Life', prompt: `Can you start by saying 'Hi ${name} and welcome to this discussion on The Future of AI in Daily Life'? your name is jarvis` },
        { name: 'The Psychology of Color in Design', prompt: `Can you start by saying 'Hi ${name} and welcome to this discussion on The Psychology of Color in Design'? your name is jarvis` },
        { name: 'The Impact of Social Media on Mental Health', prompt: `Can you start by saying 'Hi ${name} and welcome to this discussion on The Impact of Social Media on Mental Health'? your name is jarvis` },
        { name: 'Exploring Indian Cuisine', prompt: `Can you start by saying 'Hi ${name} and welcome to this discussion on Exploring Indian Cuisine'? your name is jarvis` },
        { name: 'The Evolution of Space Exploration', prompt: `Can you start by saying 'Hi ${name} and welcome to this discussion on The Evolution of Space Exploration'? your name is jarvis` },
    ]

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    return (
        <FlexBox height={'100vh'} >
            <Box width={'50%'}>
                <Typography fontWeight={'bold'} fontSize={24}>Welcome To AI! </Typography>
                <Divider />
                <Box mt={2}>
                    <TextField placeholder='May I know your name?' type='text' onChange={handleName} />
                </Box>
                <Box mt={2} >
                    <Typography fontSize={24} fontWeight={'bold'} color='purple' >Select Topic</Typography>
                    <FlexBox flexWrap={'wrap'} gap={2} mt={1}>
                        <Lists topics={listOfTopics} userName={name} />
                    </FlexBox>
                </Box>
            </Box>
        </FlexBox>
    )
}

export default Home