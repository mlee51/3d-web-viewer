import { Canvas, invalidate } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stage, View } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import Effects from '@/components/canvas/Effects'
import * as THREE from 'three'
import PauseButton from '@/PauseButton'
import Colorpicker from '@/Colorpicker'

export default function Viewer({ children, modelFile, autoRotate, initialColor }) {
    const [rotating, setRotating] = useState<boolean>(true)
    const [color, setColor] = useState<string>(initialColor)
    useEffect(() => {
        setColor(initialColor)
    }, [initialColor])
    function handleRotation(e) {
        setRotating(!rotating)
    }
    return (
        <>
            <div className='z-10'>
                <Colorpicker color={color} onChange={setColor} />
                <PauseButton rotating={rotating} handleRotation={handleRotation} />
            </div>
            <div className='fixed w-full h-full select-none'>
                <Canvas onCreated={(state) => (state.gl.toneMapping = THREE.ACESFilmicToneMapping)} shadows>
                    <color attach='background' args={[color]} />
                    <OrbitControls makeDefault autoRotate={rotating} />
                    {children}
                </Canvas>
            </div>
        </>
    )
}