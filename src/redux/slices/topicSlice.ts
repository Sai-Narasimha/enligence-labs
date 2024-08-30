import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Topic {
    id: string;
    name: string;
    prompt: string;
}

interface TopicState {
    selectedTopic: Topic | null;
}
// Initial state
const initialState: TopicState = {
    selectedTopic: null,
};

const topicSlice = createSlice({
    name: 'topic',
    initialState,
    reducers: {
        selectTopic(state, action: PayloadAction<Topic>) {
            state.selectedTopic = action.payload;
        },

    },
});

export const { selectTopic } = topicSlice.actions;

export default topicSlice.reducer;
