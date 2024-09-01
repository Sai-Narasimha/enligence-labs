import { Box, Button, Skeleton } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FlexBox from '../customElements/FlexBox';
import { useNavigate } from 'react-router-dom';
import { setAvatar, setAvatarLoading } from '../redux/slices/avatarSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const Avatars = () => {
    const { avatar, loading } = useAppSelector(state => state.avatarReducer)
    const [background, setBackground] = useState<string>('')

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    
    const endPoint = 'https://api.heygen.com/v2/avatars';
    const apiKey = process.env.REACT_APP_HEYGEN_API_KEY;


    useEffect(() => {
        dispatch(setAvatarLoading(true))
        getAvatars()
        setBackground(getRandomColor())
    }, [])

    const getAvatars = async () => {
        try {
            const result = await axios.get(endPoint, {
                headers: {
                    'Accept': 'application/json',
                    'X-Api-Key': apiKey
                }
            });
            dispatch(setAvatar(result?.data?.data?.avatars[0]))
            dispatch(setAvatarLoading(false))
        } catch (error: any) {
            console.error('Error fetching avatars:', error.response ? error.response.data : error.message);
        }
    };

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };
    return (
        <FlexBox height={'100vh'} >
            <Box>
                {loading ? <Skeleton height={200} width={200} /> :
                    <Box width={'fit-content'} bgcolor={background} padding={0}>
                        <img src={avatar?.preview_image_url} alt="avatar" width={'200px'} style={{ padding: 0, margin: 0 }} />
                    </Box>}
                <Button onClick={() => navigate('/topics')} sx={{ background: background, color: 'white', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>Next <span style={{ marginLeft: '10px' }}>&gt;</span> </Button>
            </Box>
        </FlexBox>
    )
}

export default Avatars