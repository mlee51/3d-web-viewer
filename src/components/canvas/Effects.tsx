import { Bloom, DepthOfField, EffectComposer, Noise, Vignette, SSAO } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useControls } from 'leva'


export default function Effects() {
    //const { intensity, radius } = useControls({ intensity: 35, radius: 5 })

    return (
        <EffectComposer>
            <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} />
            {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
            <SSAO
                blendFunction={BlendFunction.MULTIPLY} // Use NORMAL to see the effect
                samples={31}
                radius={35}
                intensity={5}
            />
        </EffectComposer>
    );
}