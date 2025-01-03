import { z } from 'zod'

export const handleError = (error: unknown) => {
  if (error instanceof z.ZodError) {
    return error.errors.map((err) => ({
      field: err.path[0],
      message: err.message
    }))
  }
  return null
}