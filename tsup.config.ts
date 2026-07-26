import { defineConfig } from 'tsup'

// Library build for @sealui/react — separate from the default `vite build`,
// which only produces the demo/Storybook app in dist/ (index.html + assets),
// not a consumable package. File extensions are explicit (.mjs / .cjs) so
// Node's require()/import resolution doesn't depend on package.json's "type".
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: false,
  tsconfig: 'tsconfig.app.json',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  // None of the component source files declare "use client" individually,
  // and splitting is disabled, so the whole bundle is a single module —
  // this banner marks it as a client boundary for Next.js App Router
  // consumers instead of annotating every source file.
  banner: {
    js: "'use client';",
  },
  outExtension({ format }) {
    return { js: format === 'esm' ? '.mjs' : '.cjs' }
  },
})
