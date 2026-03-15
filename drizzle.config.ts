import type { Config } from 'drizzle-kit'
import { env } from './src/env'

const isProd = env.NODE_ENV === 'production'

export default {
  schema: isProd ? './dist/drizzle/schema/*' : './src/drizzle/schema/*',
  out: isProd ? './dist/drizzle/migrations' : './src/drizzle/migrations',
  dialect: 'postgresql', // our database
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
} satisfies Config
// *satisfies* valida se o objeto contém as propriedades do tipo especificado
// mas também permite usar propriedades extras

// npx drizzle-kit generate
// npx drizzle-kit migrate
