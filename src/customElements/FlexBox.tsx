import { Box } from '@mui/material'
import React from 'react'

const FlexBox = (props: any) => {
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} {...props}>
            {props.children}
        </Box>
    )
}

export default FlexBox