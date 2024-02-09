import Fab from '@mui/material/Fab';
import PauseIcon from '@mui/icons-material/Pause';
import PlayIcon from '@mui/icons-material/PlayArrow';
import React, { useState } from 'react';


const PauseButton = React.memo(({ rotating, handleRotation }) => {

    return (
        <div className='bottom-0 mb-10 left-1/2 -translate-x-1/2 z-10 fixed'>
            <Fab style={{ backgroundColor: 'transparent' }} disableRipple disableFocusRipple disableTouchRipple onClick={handleRotation}>
                {rotating ? <PauseIcon /> : <PlayIcon />}
            </Fab>
        </div>
    )
})

PauseButton.displayName = 'PauseButton'

export default PauseButton