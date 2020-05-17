import typescript from 'rollup-plugin-typescript2'
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import commonjs from "@rollup/plugin-commonjs"
import replace from '@rollup/plugin-replace'
import packageJson from "./package.json"
import resolve from '@rollup/plugin-node-resolve';

const transform = contents => {
  const pkg = JSON.parse(contents.toString())
  pkg.main = 'index.js'
  pkg.module = 'index.es.js'
  // pkg.dependencies = { ...pkg.peerDependencies }
  // delete pkg.peerDependencies
  return JSON.stringify(pkg, null, 2)
}

export default {
  input: "src/index.tsx",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "es",
      sourcemap: true
    }
  ],
  external: [
    ...Object.keys(packageJson.peerDependencies),
    ...Object.keys(packageJson.devDependencies)
  ], 
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify( 'production' ) }),
    resolve({ mainFields: ["module"] }),
    commonjs({ include: 'node_modules/**' }),   
    typescript({ rollupCommonJSResolveHack: true }),
    copy({
      targets: [
        {
          src: 'package.json',
          dest: 'dist',
          transform
        }
      ]
    }),
    postcss(),
    svgr(),
    url()
  ]
};