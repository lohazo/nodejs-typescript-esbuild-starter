import esbuildPluginTsc from 'esbuild-plugin-tsc'

module.exports = {
  outDir: './dist',
  esbuild: {
    minify: false,
    target: 'es2015',
    plugins: [esbuildPluginTsc()],
  },
  assets: {
    baseDir: 'src',
    filePatterns: ['**/*.json'],
  },
}
