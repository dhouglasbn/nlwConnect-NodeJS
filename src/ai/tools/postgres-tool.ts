import { tool } from 'ai'
import { z } from 'zod'
import { pg } from '../../drizzle/client'

export const postgresTool = tool({
  description: `
        Realiza uma query no Postgres para buscar informações sobre as tabelas do banco de dados.

        Só pode realizar operações de busca (SELECT), não é permitido a geração de qualquer operação de escrita.

        Tabelas:
        """
        CREATE TABLE subscriptions (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP NOT NULL DEFAULT now()
        );

        """

        Todas as operações devem retornar um máximo de 50 itens.
    `.trim(),
  parameters: z.object({
    query: z.string().describe('A query do PostgreSQL para ser executada'),
    params: z
      .array(z.string())
      .describe('Parâmetros da query a ser executada.'),
  }), // é um parametro que pode ser fornecido para a ia responder o prompt
  execute: async ({ query, params }) => {
    console.log({ query, params })
    const result = await pg.unsafe(query, params)

    return JSON.stringify(result)
  },
})
