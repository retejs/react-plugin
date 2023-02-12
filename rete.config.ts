import babelReact from '@babel/preset-react'
import babelEnv from '@babel/preset-env'
import babelTS from '@babel/preset-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { ReteOptions } from 'rete-cli'
import replace from 'rollup-plugin-replace'

export default <ReteOptions>{
    input: 'src/index.tsx',
    name: 'ReactRenderPlugin',
    globals: {
        'rete': 'Rete',
        'rete-area-plugin': 'ReteAreaPlugin',
        'rete-render-utils': 'RenderUtils',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'styled-components': 'styled'
    },
    plugins: [
        commonjs(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    babel: {
        presets: [
            babelEnv,
            babelTS,
            babelReact
        ]
    }
}
