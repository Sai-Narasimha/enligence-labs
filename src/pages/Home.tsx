import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [name, setName] = useState<string>('')
    const navigate = useNavigate();
    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleClick = () => {
        localStorage.setItem('userName', name);
        navigate('/topics')
    }
    return (
        <Box height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box>
                <Typography fontWeight={'bold'} fontSize={24}>Welcome To ME </Typography>
                <Box mt={5} display={'flex'} alignItems={'center'} gap={2}>
                    <TextField placeholder='May I know your name?' type='text' onChange={handleName} />
                    <Button onClick={handleClick} variant='contained' disabled={name.length < 3}>Move to Topics</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Home