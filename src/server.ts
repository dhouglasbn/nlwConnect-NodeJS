import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// Determina a validação dos dados de entrada
// Determina a transformação dos dados antes de enviar para o front (serialização)
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

// Configura os mecanismos que vão poder consumir minha api
app.register(fastifyCors)

// registrando o padrão de documentação do swagger
app.register(fastifySwagger, {
  // padrão de documentação (swaggerfile, openapi)
  openapi: {
    // informações da documentação
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform, // converte os schemas zod para json na doc
})

// A interface da documentação pode ser acessada na url /docs
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})
