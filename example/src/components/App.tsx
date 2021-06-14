
import { Canvas as R3fCanvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'

import Sky from './Sky'
import Box from './Box'

import { withConfig } from 'r3f-config'
const Canvas = withConfig(R3fCanvas)

const App: React.FC = () => {

  return (
    <div className="canvas-fullscreen-container">
      <Canvas
        shadows
        camera={{ position: [0, 5, -8], fov: 50 }}
      >
          <hemisphereLight intensity={0.2} />
          <spotLight position={[0, 10, -25]} angle={0.3} penumbra={1} intensity={2} castShadow />

          <Sky time="13h20" />
          <Box />
          <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App
