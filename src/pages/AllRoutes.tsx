import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Topics from './Topics'
import Discussion from './Discussion'
import Avatars from './Avatars'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/topics' element={<Topics />} />
            <Route path='/avatars' element={<Avatars />} />
            <Route path='/discussion' element={<Discussion />} />
        </Routes>
    )
}

export default AllRoutes