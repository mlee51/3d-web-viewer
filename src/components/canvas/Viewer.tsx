import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import PauseButton from '@/PauseButton'
import Colorpicker from '@/Colorpicker'

const Viewer = React.memo(({ children, initialColor }) => {
    const [rotating, setRotating] = useState<boolean>(true)
    const [color, setColor] = useState<string>(initialColor)
    useEffect(() => {
        setColor(initialColor)
    }, [initialColor])


    function handleRotation() {
        setRotating((prev) => { return !prev })
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
})

Viewer.displayName = 'Viewer'

export default Viewer