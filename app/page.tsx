'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Stage } from '@react-three/drei'
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

export default function Page() {
  const [modelFile, setModelFile] = useState(null)
  const [modelName, setModelName] = useState<string>('')
  const [color, setColor] = useState<string>('white')

  function handleModelFile(e) {
    setModelFile(e)
  }

  function handleBackgroundColor(e) {
    setColor(e)
  }

  function handleModelName(e) {
    setModelName(e)
  }

  return (
    <>
      {/* <ModelUpdateForm modelName={modelName} backgroundColor={'white'} /> */}
      {/* <ModelUploadForm /> */}
      <ModelRetrieveForm
        handleFile={handleModelFile}
        handleBackgroundColor={handleBackgroundColor}
        handleModelName={handleModelName}
        modelName={modelName} />
      <Viewer initialColor={color}>
        <Suspense fallback={null}>
          <Effects />
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
    </>
  )
}
