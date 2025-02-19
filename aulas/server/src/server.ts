import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
    validatorCompiler,
    serializerCompiler,
    ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { z } from 'zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

// app.get('/hello', () =>{
//     return 'Hello World'
// })
app.post('/subscriptions', {
    schema:{
        body: z.object({
            name: z.string(),
            email: z.string().email(),
        }),
    },
},(request, reply) =>{
    const { name, email } = request.body


    // criação da inscrição no banco de dados!
    return reply.status(201).send({
        name,
        email,
    })
})


app.listen({ port: 3333 }).then(() =>{
    console.log('HTTP server running!')
})