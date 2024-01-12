import { HexColorPicker } from "react-colorful"
import { useState, createContext } from 'react'
import { Container } from '@mui/material'
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';

export const ColorContext = createContext('')

export default function Colorpicker({ color, onChange }) {
    const [active, setActive] = useState<boolean>(false)

    return (
        <Container sx={{ position: 'fixed', zIndex: 1, margin: 4, width: 'auto', right: 0, display: "flex", flexDirection: "row-reverse" }}>
            <Fab size="small" aria-label="add" onClick={() => setActive(!active)}>
                {active && <CloseIcon />}
            </Fab>
            <ColorContext.Provider value={color}>
                {active && <HexColorPicker color={color} onChange={onChange} />}
            </ColorContext.Provider>
        </Container>
    )
}

