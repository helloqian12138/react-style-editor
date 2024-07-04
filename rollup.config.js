import path from 'path'
// rollup插件
import progress from 'rollup-plugin-progress'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import alias from '@rollup/plugin-alias'
import json from '@rollup/plugin-json'
import { visualizer } from "rollup-plugin-visualizer"
import strip from '@rollup/plugin-strip'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import replace from '@rollup/plugin-replace'
import camelCase from 'camelcase'


export default (args) => {
  const { name } = args
  delete args.name
  return {
    input: 'src/index.ts',
    output: getOutput(name),
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED') return
      warn(warning) // this requires Rollup 0.46
    },
    plugins: getPlugins(args)
  }
}

/**
 * 生成打包输出目录
 */
export function getOutput(pkg) {
  // 获取包名
  const name = camelCase(pkg.indexOf('/') > -1 ? pkg.split('/')[1] : pkg)
  const globals = getGlobals()

  return [
    {
      file: path.resolve('dist/index.es.js'),
      format: 'es',
      name,
      globals
    },
    {
      file: path.resolve('dist/index.umd.js'),
      format: 'umd',
      name,
      globals,
      interop: 'auto'
    }
  ]
}

/**
 * 获取
 * @param args 命令行参数
 * @param aliasConfig alias配置
 * @param postConfig
 * @returns {*}
 */
export function getPlugins(args, aliasConfig = null) {
  // build环境
  const env = args.watch ? 'development' : 'production'
  return [
    aliasConfig && alias(aliasConfig),
    // 打包进度
    progress(),
    // builtins(),
    // 清除dist文件(非watch状态下清除，watch由于并行编译，删除后会出现找不到包的情况)
    !args.watch &&
      clear({
        targets: ['dist'],
        watch: true
      }),
    // 加载node_module里面模块
    resolve(),
    env === 'production' &&
      replace({
        exclude: 'node_modules/**',
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
    // 处理非es模块
    commonjs(),
    // 使用postcss编译
    postcss({
      modules: {
        generateScopedName: '[name]_[local]_[hash:base64:5]'
      },
      extensions: ['.css', '.less'],
      use: [
        // @ts-ignore
        ['less', { javascriptEnabled: true }] // 使用Less作为预处理器
      ],
      // css文件不抽离
      extract: false
    }),
    ts({
      tsconfig: './tsconfig.json'
    }),
    // 加载json
    json(),
    // 打包之后的package大小
    visualizer(),
    // 清除console.debugger
    strip(),
    // 压缩
    env === 'production' && terser()
  ]
}
