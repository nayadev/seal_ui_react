import '@testing-library/jest-dom'

// GradientIcon observes <html class> changes via MutationObserver to sync SVG gradient
// coordinates with the active theme token. JSDOM fires the observer synchronously when
// ThemeProvider applies the theme class, triggering a React state update outside act().
// Stubbing it here eliminates the spurious warning — gradient direction tests verify the
// coordinate calculation functions directly without relying on the observer.
class StubMutationObserver {
  // No-op stubs — the test suite only needs the observer to be silently inert.
  observe(): void {
    // intentionally empty
  }
  disconnect(): void {
    // intentionally empty
  }
  takeRecords() {
    return []
  }
}
Object.defineProperty(globalThis, 'MutationObserver', {
  value: StubMutationObserver,
  writable: true,
  configurable: true,
})
