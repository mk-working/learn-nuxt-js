export interface INuxtErrorPayload {
  path: string
  error: string

  message: string
  stack?: string

  status: number
  statusCode: number

  statusMessage: string
  statusText: string

  url: string
}
