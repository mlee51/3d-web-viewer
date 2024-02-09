// ModelRetrieveForm.js
import React, { useState, useEffect } from 'react';
import { GLTFLoader } from 'three-stdlib';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from "axios";
import ModelViewer from './ModelViewer';

const loader = new GLTFLoader()


const fetchModels = async () => {
    try {
        const response = await axios.get('https://18.116.81.232/models')
        if (response.status !== 200) {
            throw new Error(`Error fetching models: ${response.status} ${response.statusText}`)
        }
        return response.data
    } catch (error) {
        console.error('Error fetching models:', error)


    }
}

const fetchModel = async (modelName, handleFile) => {
    try {
        const response = await axios.get(`https://18.116.81.232/models/${modelName}`, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error(`Error retrieving model: ${response.status} ${response.statusText}`);
        }

        const data = response.data;
        // Assuming the server returns the model data as an ArrayBuffer
        const gltf = await new Promise((resolve, reject) => {
            loader.parse(data, '', (gltf) => {
                gltf.scene.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = child.receiveShadow = true;
                        // child.material.roughness = 0.1;
                        // child.material.metalness = 1;
                    }
                    handleFile(gltf.scene)
                });
                resolve(gltf.scene);
            }, reject);
        });

        return gltf;
    } catch (error) {
        console.error(error.message);
        throw new Error('Failed to fetch model');
    }
};

const fetchBackground = async (modelName, handleBackgroundColor) => {
    try {
        const response = await axios.get(`https://18.116.81.232/background_color/${modelName}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.status !== 200) {
            throw new Error(`Error retrieving model background: ${response.status} ${response.statusText}`);
        }


        const { background_color } = response.data;
        if (background_color != null) handleBackgroundColor(background_color)

    }
    catch (error) {
        console.error(error.message)
    }
}


function ModelRetrieveForm({ handleFile, handleBackgroundColor, handleModelName, ...props }) {
    //const [modelName, setModelName] = useState<string>('Paw Patrol')
    //const [modelFile, setModelFile] = useState(null)
    const { data: modelFile } = useQuery({
        queryKey: ['fetchModel', props.modelName],
        queryFn: () => fetchModel(props.modelName, handleFile),
        refetchOnWindowFocus: false,
    });
    const { data: backgroundColor } = useQuery({
        queryKey: ['fetchBackground', props.modelName],
        queryFn: () => fetchBackground(props.modelName, handleBackgroundColor),
        refetchOnWindowFocus: false
    })
    //const [availableModels, setAvailableModels] = useState([])
    const { data: availableModels, error, isLoading } = useQuery({
        queryKey: ['allModels'],
        queryFn: fetchModels,
        staleTime: Infinity,
    });

    const handleNameChange = (e) => {
        handleModelName(e.target.value);
    }




    const handleBackgroundChange = (color) => {
        //setBackgroundColor(color)
    }

    // if (isLoading) return <div>Fetching posts...</div>;
    // if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <>
            <div className='fixed top-0 z-10'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <select className='form-select box-content bg-inherit appearance-none outline-none m-4 text-xl sm:text-4xl font-extrabold  tracking-tight' value={props.modelName} onChange={handleNameChange}>
                        <option key={1} value={-1} className='hidden'>Select A Model ▼</option>
                        {availableModels?.map((model) => (
                            <option className='p-4' key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                </form>
            </div>
        </>
    );
};

export default ModelRetrieveForm;
