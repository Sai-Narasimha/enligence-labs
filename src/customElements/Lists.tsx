import { Box } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { selectTopic } from '../redux/slices/topicSlice';
import { useNavigate } from 'react-router-dom';

interface TopicProps {
    name: string;
    prompt: string;
}

interface ListsProps {
    topics: TopicProps[];
    userName: string;
}
const Lists: React.FC<ListsProps> = ({ topics, userName }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const handleSelectTopic = (topic: TopicProps) => {
        dispatch(selectTopic({ ...topic, id: '', userName: userName }))
        navigate('/avatars')
    }
    return (
        <>
            {topics.map((topic: TopicProps, index: number) => (
                <Box border={1} borderRadius={2} fontSize={14} fontWeight={'bold'} p={1} sx={{ ':hover': { color: 'purple', cursor: 'pointer' } }}
                    key={index} onClick={() => handleSelectTopic(topic)}>{topic.name}</Box>
            ))}
        </>
    );
};

export default Lists;
