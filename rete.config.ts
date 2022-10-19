import replace from 'rollup-plugin-replace';
import sass from 'rollup-plugin-sass';

export default {
    input: 'src/index.tsx',
    name: 'ReactRenderPlugin',
    globals: {
        'rete': 'Rete',
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        sass({
            insert: true
        })
    ]
}
