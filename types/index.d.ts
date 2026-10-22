export type Draft =
  | { phase: 'structuring'; raw: string }
  | { phase: 'ready'; raw: string; structured: string }
  | { phase: 'failed'; raw: string; reason: string }

declare module 'claude-code' {
  interface PluginState {
    transprompt: {
      draft: Draft | null
      bypassNext: boolean
    }
  }
}
