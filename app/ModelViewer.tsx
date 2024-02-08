import { Stage } from '@react-three/drei'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

export default function ModelViewer({ backgroundColor, setColor, modelFile, modelName }) {

    const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
        ssr: false
    })
    const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

    return (
        <View orbit backgroundColor={backgroundColor} colorHandler={setColor} modelName={modelName} className="w-full h-full">
            <Suspense fallback={null}>
                <Stage
                    shadows={{ type: 'accumulative', colorBlend: 1, opacity: 1, bias: -0.004 }}
                    adjustCamera={true}
                    intensity={0.5}
                    environment="city"
                    preset="rembrandt"
                >
                    {modelFile && <primitive object={modelFile} />}
                </Stage>
            </Suspense>
            <Common />
        </View>
    )
}