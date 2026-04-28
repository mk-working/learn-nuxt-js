export default defineEventHandler( async (event) => {
  // handle query params
  const { name } = getQuery(event)

  // handle post data
  const { age } = await body(event)

  // api call with private key
  const url = "string"
  const { data } = await $fetch(url)

  
  return data
})
