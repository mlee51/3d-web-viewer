import { useState } from 'react'
import Fab from '@mui/material/Fab';
import SaveIcon from '@mui/icons-material/Save';
import { Container } from '@mui/material';

interface Props {
    modelName: string
    backgroundColor: string
}

export default function ModelUpdateForm(props: Props) {
    //const [modelName,setModelName] = useState<string>('')
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://18.116.81.232:3001/update/${props.modelName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ backgroundColor: props.backgroundColor }),
            });

            const message = await response.json()
            console.log(message)

        } catch (error) {
            console.error('Error updating model:', error);
        }

    }

    return (
        <div className='fixed z-10 m-4 bottom-0 p-8'>

            <Fab component="span" variant="extended" aria-label="upload" onClick={(e) => handleUpdate(e)}>
                <SaveIcon />
            </Fab>

        </div>
    )
}