/**
 * 0 = sunrise, .25 = noon, .50 = sunset, .51-.99 = night
 */
export const timeToDeg = (time: string) => {
  const totalMinutesInADay = 60 * 24 // 1440
  const sunDegreesOffset = 0.25
  const [hours, mins = 0] = time.split(/[:|h]/i).map(n => parseInt(n) || 0)
  const degrees = (((hours * 60) + mins) / totalMinutesInADay) - sunDegreesOffset
  return degrees < 0 ? 1 + degrees : degrees
}

export const degToTime = (degrees: number, separator = 'h') => {
  const totalMinutesInADay = 60 * 24 // 1440
  const sunDegreesOffset = 0.25
  let normalizedDegrees = degrees + sunDegreesOffset
  normalizedDegrees = normalizedDegrees >= 1 ? normalizedDegrees - 1 : normalizedDegrees
  const totalMins = totalMinutesInADay * normalizedDegrees
  const hours = Math.floor(totalMins / 60)
  const mins = Math.round(totalMins - (hours * 60)).toString().padStart(2, '0')
  return [hours, mins].join(separator)
}
