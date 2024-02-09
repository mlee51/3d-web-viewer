import React from 'react'
import { HexColorPicker } from "react-colorful"
import { useState, createContext } from 'react'
import { Container } from '@mui/material'
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';

export const ColorContext = createContext('')

const Colorpicker = React.memo(({ color, onChange }) => {
    const [active, setActive] = useState<boolean>(false)

    return (
        <Container sx={{ position: 'fixed', zIndex: 1, margin: 2, width: 'auto', right: 0, display: "flex", flexDirection: "row-reverse" }}>
            <Fab style={{ backgroundColor: 'transparent' }} disableRipple disableFocusRipple disableTouchRipple size="small" aria-label="add" onClick={() => setActive(!active)}>
                {active && <CloseIcon />}
            </Fab>
            <ColorContext.Provider value={color}>
                {active && <HexColorPicker color={color} onChange={onChange} />}
            </ColorContext.Provider>
        </Container>
    )
})

Colorpicker.displayName = 'Colorpicker'

export default Colorpicker
