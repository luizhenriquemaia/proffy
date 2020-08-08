import express from 'express'
import cors from 'cors'
import routes from './routes'


const app = express()
// por padrão o express não entende json, informar que queremos utilizar json
// serve por exemplo para ter acesso ao request body
app.use(express.json())
app.use(cors())
app.use(routes)



// ouvir requisições http na porta 3333
app.listen(3333)

