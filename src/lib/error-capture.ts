let lastCapturedError: unknown = null

export function captureError(error: unknown) {
  lastCapturedError = error
}

export function consumeLastCapturedError() {
  const err = lastCapturedError
  lastCapturedError = null
  return err
}
