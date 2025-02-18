import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  schema: './src/drizzle/schema/*', // tables directory
  out: './src/drizzle/migrations', // table generation files
  dialect: 'postgresql', // our database
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
} satisfies Config
// *satisfies* valida se o objeto contém as propriedades do tipo especificado
// mas também permite usar propriedades extras

// npx drizzle-kit generate
// npx drizzle-kit migrate
