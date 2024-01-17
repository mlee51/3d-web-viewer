// ModelRetrieveForm.js
import React, { useState, useEffect, useMemo } from 'react';
import { GLTFLoader } from 'three-stdlib';

import ModelViewer from './ModelViewer';


const loader = new GLTFLoader()

function ModelRetrieveForm() {
    const [modelName, setModelName] = useState<string>('')
    const [modelData, setModelData] = useState(null)
    const [modelFile, setModelFile] = useState(null)
    const [availableModels, setAvailableModels] = useState([])
    const [backgroundColor, setBackgroundColor] = useState<string>('#f0f0f0')


    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch('https://18.116.81.232/models')
                if (!response.ok) {
                    throw new Error(`Error fetching models: ${response.status} ${response.statusText}`)
                }
                const data = await response.json()
                setAvailableModels(data)
            } catch (error) {
                console.error('Error fetching models:', error)
            }
        }
        fetchModels()
    }, [])

    useEffect(() => {
        // Trigger the submission when modelName changes
        if (modelName !== '') {
            handleSubmit()
            getBackgroundColor()
        }
    }, [modelName])

    useEffect(() => {
        console.log(backgroundColor)
    }, [backgroundColor])

    const handleNameChange = (e) => {
        setModelName(e.target.value);
    }

    const handleSubmit = async () => {
        //e.preventDefault();

        try {
            const response = await fetch(`https://18.116.81.232/models/${modelName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`Error retrieving model: ${response.status} ${response.statusText}`);
            }

            const data = await response.arrayBuffer()
            // Assuming the server returns the model data as an ArrayBuffer
            setModelData(data);
            loader.parse(data, '', (gltf) => {
                gltf.scene.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = child.receiveShadow = true;
                        //child.material.roughness = 0.1;
                        //child.material.metalness = 1;
                    }
                    setModelFile(gltf.scene)
                });
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const getBackgroundColor = async () => {
        try {
            const response = await fetch(`https://18.116.81.232/background_color/${modelName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error(`Error retrieving model background: ${response.status} ${response.statusText}`);
            }

            const data = await response.json()
            const { background_color } = data;
            if (background_color != null) setBackgroundColor(background_color)

        }
        catch (error) {
            console.error(error.message)
        }
    }

    const handleBackgroundChange = (color) => {
        setBackgroundColor(color)
    }

    return (
        <>
            <div className='fixed top-0 z-10'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <select className='form-select box-content bg-inherit appearance-none outline-none m-4 text-4xl font-extrabold  tracking-tight' value={modelName || -1} onChange={handleNameChange}>
                        <option key={1} value={-1} className='hidden'>Select A Model ▼</option>
                        {availableModels.map((model) => (
                            <option className='p-4' key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                </form>
            </div>
            <ModelViewer modelName={modelName} backgroundColor={backgroundColor} setColor={handleBackgroundChange} modelFile={modelFile} />
        </>
    );
};

export default ModelRetrieveForm;
