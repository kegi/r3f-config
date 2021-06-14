import { useConfigValue } from 'r3f-config'
import { Euler } from 'three'

const Box: React.FC = () => {
  const [wireframe] = useConfigValue('box.wireframe', { type: 'switch' })

  const [width] = useConfigValue('box.width', { type: 'slider', min: 0.1, max: 10, step: 0.1, defaultValue: 3, divider:true })
  const [height] = useConfigValue('box.height', { type: 'slider', min: 0.1, max: 10, step: 0.1, defaultValue: 5 })
  const [depth] = useConfigValue('box.depth', { type: 'slider', min: 0.1, max: 10, step: 0.1, defaultValue: 4 })

  const [widthSegments] = useConfigValue('box.widthSegments', { type: 'slider', min: 1, max: 50, step: 1, defaultValue: 10, divider:true })
  const [heightSegments] = useConfigValue('box.heightSegments', { type: 'slider', min: 1, max: 50, step: 1, defaultValue: 10 })
  const [depthSegments] = useConfigValue('box.depthSegments', { type: 'slider', min: 1, max: 50, step: 1, defaultValue: 10 })

  const [x] = useConfigValue('box.x', { type: 'slider', min: -10, max: 10, step: 0.1, track: false, defaultValue: 0, divider:true,  })
  const [y] = useConfigValue('box.y', { type: 'slider', min: -10, max: 10, step: 0.1, track: false, defaultValue: 0 })
  const [z] = useConfigValue('box.z', { type: 'slider', min: -10, max: 10, step: 0.1, track: false, defaultValue: 0 })

  const [material] = useConfigValue('box.material', { type: 'select', defaultValue: 'meshPhongMaterial', divider:true, options: {
    meshBasicMaterial: 'Basic',
    meshPhongMaterial: 'Phong',
    meshLambertMaterial: 'Lambert',
    meshNormalMaterial: 'Normal',
    meshDepthMaterial: 'Depth',
    shadowMaterial: 'Shadow',
    meshToonMaterial: 'Toon',
  } })
  
  const [color] = useConfigValue('box.color', { type: 'color', defaultValue: '#628995' })

  const Material = material as any

  return <mesh receiveShadow castShadow position={[x, y, z]} rotation={new Euler(0 , Math.PI / 8, 0)}>
    <boxBufferGeometry attach="geometry" args={[width, height, depth, widthSegments, heightSegments, depthSegments]} />
    <Material attach="material" color={color} wireframe={wireframe} />
  </mesh>
}

export default Box
