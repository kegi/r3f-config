import { useMemo, useEffect } from 'react'
import { Color } from 'three'
import { Sky as R3fSky } from '@react-three/drei'
import { useThrottledFn } from 'beautiful-react-hooks'

import { timeToDeg, degToTime } from '../util/skyTime'
import { useConfig, useConfigValue } from 'r3f-config'

interface SunProps {
  azimuth?: number
  turbidity?: number
  rayleigh?: number
  mieCoefficient?: number
  mieDirectionalG?: number
}
interface SkyProps {
  distance?: number
  timeAnimation?: boolean
  time?: string
  sun?: SunProps
}

const Sky: React.FC<SkyProps> = ({
  distance = 4000,
  time: initialTime = '18h00',
  sun = {
    azimuth: 0,
    turbidity: 1,
    rayleigh: 1,
    mieCoefficient: 0.035,
    mieDirectionalG: 0.73,
  },
}) => {
  const sunriseStart = 0.995
  const sunriseEnd = 0.055
  const sunsetStart = 0.44
  const sunsetEnd = 0.55

  const [time] = useConfigValue('sky.time', { type: 'slider', min: 0, max: 1, step: 0.0001, label: false, defaultValue: timeToDeg(initialTime) })
  const [, setTimeConfig] = useConfig('sky.time')

  const updateConfigLabel = useThrottledFn((time: number) => {
    setTimeConfig({ name: `Time (${degToTime(time)})` })
  }, 100, undefined, [])

  useEffect(() => { updateConfigLabel(time) }, [updateConfigLabel, time])

  const day = useMemo(() => {
    return time >= sunriseStart || time <= sunsetEnd
  }, [time])

  const sunrise = useMemo(() => {
    return time >= sunriseStart || time <= sunriseEnd
  }, [time])

  const sunset = useMemo(() => {
    return time >= sunsetStart && time <= sunsetEnd
  }, [time])

  const position: [number, number, number] = useMemo(() => {
    const angle = ((time * (Math.PI * 2)) + (Math.PI * 1.5))
    const x = sun.azimuth || 0
    const y = distance * Math.cos(angle)
    const z = distance * Math.sin(angle)

    return [x, y, z]
  }, [sun.azimuth, distance, time])

  const ambientLightIntensity = useMemo(() => {
    const min = 0.015
    const max = 0.5
    const returnInRange = (intensity: number) => Math.max(Math.min(intensity, max), min)

    if (sunrise) {
      const t = time >= sunriseStart ? time : time as number + 1
      const intensity = (t - sunriseStart) / ((sunriseEnd + 1) - sunriseStart)
      return returnInRange(intensity)
    }

    if (sunset) {
      const total = sunsetEnd - sunsetStart
      const intensity = (sunsetEnd - time) / total
      return returnInRange(intensity)
    }

    return day ? returnInRange(1) : returnInRange(0)
  }, [time, day, sunrise, sunset])

  return (<>
    <hemisphereLight
      args={['#fff', '#fff']}
      intensity={ambientLightIntensity}
      color={new Color('#808020')}
      groundColor={new Color('#804A40')}
      position={position}
    />

    <directionalLight
      intensity={ambientLightIntensity}
      color={new Color('#fff')}
      position={position}
      castShadow
    />

    <ambientLight intensity={ambientLightIntensity} />

    <R3fSky
      turbidity={sun.turbidity}
      rayleigh={sun.rayleigh}
      mieCoefficient={sun.mieCoefficient}
      mieDirectionalG={sun.mieDirectionalG}
      distance={distance}
      sunPosition={position}
    />
  </>)
}

export default Sky
