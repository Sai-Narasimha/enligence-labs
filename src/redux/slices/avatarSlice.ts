import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Topic {
//     id: string;
//     name: string;
//     prompt: string;
// }

interface AvatarState {
    avatar: any,
    loading: boolean,

}
// Initial state
const initialState: AvatarState = {
    avatar: null,
    loading: false
};

const avatarSlice = createSlice({
    name: 'topic',
    initialState,
    reducers: {
        setAvatar(state, action: any) {
            state.avatar = action.payload;
        },
        setAvatarLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }


    },
});

export const { setAvatar, setAvatarLoading } = avatarSlice.actions;

export default avatarSlice.reducer;
