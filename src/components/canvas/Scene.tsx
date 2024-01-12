'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import * as THREE from 'three'
import Effects from './Effects'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import usePostProcess from '@/templates/hooks/usePostprocess'
import { Suspense } from 'react'
import { View } from './View'


export default function Scene({ ...props }) {

  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}
      onCreated={(state) => (state.gl.toneMapping = THREE.ACESFilmicToneMapping)}
    >
      <r3f.Out />
      <Preload all />
      {/* @ts-ignore */}
    </Canvas>
  )
}
