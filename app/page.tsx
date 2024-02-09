'use client'

import { Suspense, useEffect } from 'react'
import { Loader, Stage } from '@react-three/drei'
import ModelUploadForm from './ModelUploadForm'
import ModelRetrieveForm from './ModelRetrieveForm'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Viewer from '../src/components/canvas/Viewer'
import { useState } from 'react'
import ModelUpdateForm from './ModelUpdateForm'
import Effects from '@/components/canvas/Effects'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";

const queryClient = new QueryClient();



const Page: React.FC = () => {
  const [modelFile, setModelFile] = useState(null)
  const [modelName, setModelName] = useState<string>('')
  const [color, setColor] = useState<string>('white')
  const [dolor, setDolor] = useState({ current: color })

  function handleModelFile(e) {
    setModelFile(e)
  }

  function handleBackgroundColor(e: string) {
    setColor(e)
  }

  function handleModelName(e: string) {
    setModelName(e)
  }


  useGSAP(() => {
    gsap.to(dolor, { current: color, onUpdate: () => setDolor({ current: dolor.current }) })
  }, [color])

  useEffect(() => {
    setModelFile(null)
  }, [modelName])

  return (
    <>
      <ModelUpdateForm modelName={modelName} backgroundColor={color} />
      <ModelUploadForm />
      <QueryClientProvider client={queryClient}>
        <ModelRetrieveForm
          handleFile={handleModelFile}
          handleBackgroundColor={handleBackgroundColor}
          handleModelName={handleModelName}
          modelName={modelName} />
        <Viewer initialColor={dolor.current}>
          <Suspense fallback={null}>
            {/* <Effects /> */}
          </Suspense>
          <Suspense fallback={null}>
            <Stage
              key={modelFile ? modelFile.uuid : null}
              shadows={{ type: 'accumulative', colorBlend: 1, opacity: 1 }}
              adjustCamera={true}
              intensity={0.5}
              environment="city"
              preset="rembrandt"
            >
              {modelFile && <primitive object={modelFile} />}
            </Stage>
          </Suspense>
        </Viewer>
        <Loader />
      </QueryClientProvider>
    </>
  )
}

export default Page