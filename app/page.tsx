'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stage, OrbitControls, Gltf } from '@react-three/drei'
import ModelUploadForm from './ModelUploadForm'
import ModelRetrieveForm from './ModelRetrieveForm'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function Page() {
  return (
    <>
      <ModelUploadForm />
      <ModelRetrieveForm />
    </>
  )
}
