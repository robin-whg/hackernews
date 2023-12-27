export default function () {
  function host(url: string) {
    const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace('?id=', '/')
    const parts = host.split('.').slice(-3)
    if (parts[0] === 'www')
      parts.shift()
    return parts.join('.')
  }

  function timeAgo(time: number | Date) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600)
      return pluralize(~~(between / 60), ' minute')
    else if (between < 86400)
      return pluralize(~~(between / 3600), ' hour')
    else return pluralize(~~(between / 86400), ' day')
  }

  function pluralize(time: number, label: string) {
    if (time === 1)
      return time + label

    return `${time + label}s`
  }

  function isAbsolute(url: string) {
    return /^https?:\/\//.test(url)
  }

  return {
    host,
    timeAgo,
    pluralize,
    isAbsolute,
  }
}
