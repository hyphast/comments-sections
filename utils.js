import './style.scss'

export function getRelativeTime(dateValue) {
  const DAY_MILLISECONDS = 1000 * 60 * 60 * 24

  const date = dateValue === '' ? new Date() : new Date(dateValue)

  const timestamp = date.getTime()

  const rtf = new Intl.RelativeTimeFormat('ru', {
    localeMatcher: 'best fit',
    numeric: 'auto',
    style: 'long',
  })
  const daysDifference = Math.round(
    (timestamp - new Date().getTime()) / DAY_MILLISECONDS
  )

  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)

  return rtf.format(daysDifference, 'day') + ` ${hours}:${minutes}`
}
