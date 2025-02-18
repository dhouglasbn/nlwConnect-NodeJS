import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

// Especificando o schema da tabela subscriptions
// nome 'subscriptions'
export const subscriptions = pgTable('subscriptions', {
  // <referencia do drizzle>: <tipo uuid>('nome da coluna no postgres')
  // .primaryKey().<gerador de valor aleatório>()
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  // defaultNow preenche o campo com a data no momento da criação do objeto
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
