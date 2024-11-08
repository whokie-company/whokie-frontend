export function appendParamsToUrl(
  url: string,
  params: Record<string, string | number | boolean | string[] | undefined>
) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(key, item.toString())
      })
    } else if (value) {
      searchParams.append(key, value.toString())
    }
  })

  return `${url}?${searchParams}`
}
