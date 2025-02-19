import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'

interface SubscribeToEventParams {
  name: string
  email: string
}

// service de inscrição do evento
export async function subscribeToEvent({
  name,
  email,
}: SubscribeToEventParams) {
  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning() // a inserção do postgres registra várias entidades

  const subscriber = result[0]
  return {
    subscriberId: subscriber.id,
  }
}
