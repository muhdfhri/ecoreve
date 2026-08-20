export function reportLovableError(error: unknown, context?: Record<string, unknown>) {
  console.error('[Lovable Error]', error, context)
}
