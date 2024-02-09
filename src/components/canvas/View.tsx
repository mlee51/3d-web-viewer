'use client'

import { forwardRef, Suspense, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Three } from '@/helpers/components/Three'
import Effects from '@/components/canvas/Effects'
import { useControls } from 'leva'
import Colorpicker from '../../../app/Colorpicker'
import ModelUpdateForm from '@/ModelUpdateForm'
import Fab from '@mui/material/Fab';
import PauseIcon from '@mui/icons-material/Pause';
import PlayIcon from '@mui/icons-material/PlayArrow';


export const Common = () => (
  <Suspense fallback={null}>
    {/* <Effects /> */}
  </Suspense>
)

export const Background = ({ color }) => (

  <color attach='background' args={[color]} />

)

const View = forwardRef(({ children, orbit, colorHandler, backgroundColor, modelName, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)
  const [color, setColor] = useState<string>(backgroundColor)
  const [rotating, setRotating] = useState<boolean>(true)


  return (
    <div ref={localRef} {...props}>
      <ModelUpdateForm modelName={modelName} backgroundColor={color} />
      <Colorpicker color={color} onChange={setColor} />
      <div ref={localRef} {...props} />
      <Canvas {...props}
        onCreated={(state) => (state.gl.toneMapping = THREE.ACESFilmicToneMapping)}
      >
        <ViewImpl track={localRef}>
          <Background color={color} />
          {children}
          {orbit && <OrbitControls makeDefault autoRotate={rotating} />}
        </ViewImpl>
      </Canvas>
    </div>
  )
})
View.displayName = 'View'

export { View }
