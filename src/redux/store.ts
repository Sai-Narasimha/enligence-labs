import { configureStore } from '@reduxjs/toolkit'

import topicSlice from './slices/topicSlice'

export const store = configureStore({
    reducer: {
        topicReducer: topicSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch