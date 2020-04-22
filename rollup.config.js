import typescript from 'rollup-plugin-typescript2'
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
// import sass from "rollup-plugin-sass"
// import commonjs from "rollup-plugin-commonjs"
// import external from "rollup-plugin-peer-deps-external"
// import resolve from "rollup-plugin-node-resolve"

import packageJson from "./package.json"

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
  plugins: [
    // external(),
    // resolve({
    //   jsnext: true,
    //   extensions: ['.tsx', '.ts']
    // }),
    typescript(),
    copy({
      targets: [
        { src: 'package.json', dest: 'dist' }
      ]
    }),
    postcss(),
    svgr(),
    url()
    // commonjs({
    //   extensions: ['.tsx', '.ts'],
    //   include: ["node_modules/**"],
    //   exclude: ["**/*.stories.tsx"],
    //   namedExports: {
    //     "node_modules/react/react.js": [
    //       "Children",
    //       "Component",
    //       "PropTypes",
    //       "createElement"
    //     ],
    //     "node_modules/react-dom/index.js": ["render"]
    //   }
    // }),
    // sass({
    //   insert: true
    // })
  ]
};