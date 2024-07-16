export type SuccessWithMessage = { success: true; message: string }
export type SuccessResponse<T = unknown> = { success: true } & T
export type ErrorResponse = { success: false; message: string }
