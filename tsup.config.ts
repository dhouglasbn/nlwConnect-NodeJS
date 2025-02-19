import { defineConfig } from 'tsup'

export default defineConfig({
  // arquivos que vão ser convertidos para javascript
  entry: ['./src/**/*.ts'],
  format: 'esm', // formato do ecmascript modules
  outDir: 'dist', // diretório para onde vão os arquivos convertidos para js
  clean: true, // sempre deleta o diretório dist antes de criar ele de novo
})
