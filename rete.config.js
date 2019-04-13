import replace from 'rollup-plugin-replace';
import sass from 'rollup-plugin-sass';

export default {
    input: 'src/index.jsx',
    name: 'ReactRenderPlugin',
    globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    extensions: ['.js', '.jsx'],
    babelPresets: [
        require('@babel/preset-react')
    ],
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        sass({
            insert: true
        })
    ]
}