import { Box, Button, Skeleton, Typography } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FlexBox from '../customElements/FlexBox';
import { useNavigate } from 'react-router-dom';
import { setAvatar, setAvatarLoading } from '../redux/slices/avatarSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getApiMethod } from '../utils/api';

const Avatars = () => {
    const { selectedTopic } = useAppSelector(state => state.topicReducer)
    const { avatar, loading } = useAppSelector(state => state.avatarReducer)
    const [background, setBackground] = useState<string>('')

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const endPoint = 'https://api.heygen.com/v2/avatars';
    const apiKey = process.env.REACT_APP_HEYGEN_API_KEY;

    const getAvatars = async () => {
        const headers = {
            'Accept': 'application/json',
            'X-Api-Key': apiKey
        }
        try {
            const result = await getApiMethod(endPoint, headers);
            console.log('result: ', result);
            dispatch(setAvatar(result?.data?.avatars[3]))
            dispatch(setAvatarLoading(false))
        } catch (error: any) {
            console.error(error);
        }
    };

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };

    useEffect(() => {
        dispatch(setAvatarLoading(true))
        getAvatars()
        setBackground(getRandomColor())
    }, [])
    return (
        <FlexBox height={'100vh'} >
            <Box>
                <Typography> Hey {selectedTopic?.userName}!, I am your Assistence</Typography>
                {loading ? <Skeleton height={200} width={200} /> :
                    <Box width={'fit-content'} bgcolor={background} padding={0}>
                        <img src={avatar?.preview_image_url} alt="avatar" width={'200px'} style={{ padding: 0, margin: 0 }} />
                    </Box>}
                <Button onClick={() => navigate('/discussion')} sx={{ background: background, color: 'white', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>Next <span style={{ marginLeft: '10px' }}>&gt;</span> </Button>
            </Box>
        </FlexBox>
    )
}

export default Avatars