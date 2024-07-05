import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import less from 'less';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/esm/index.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'react-style-editor',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    postcss({
      extensions: ['.less'],
      process: (context) => {
        return new Promise((resolve, reject) => {
          less.render(
            context.code,
            {
              paths: ['./src'], // Specify search paths for @import directives
            },
            (err, result) => {
              if (err) return reject(err);
              resolve({
                code: result.css,
                map: result.map,
              });
            },
          );
        });
      },
    }),
    terser(),
  ],
  external: ['react', 'react-dom'],
};
