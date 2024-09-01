import { configureStore } from '@reduxjs/toolkit'

import topicSlice from './slices/topicSlice'
import avatarSlice from './slices/avatarSlice'

export const store = configureStore({
    reducer: {
        topicReducer: topicSlice,
        avatarReducer: avatarSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch