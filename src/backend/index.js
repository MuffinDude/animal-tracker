import express from 'express'
import { json } from 'body-parser'
import http from 'http'

import controller from './api'

const PORT = process.env.PORT || 8080

const app = express()

app.use(json())
app.use('/api/v1', controller)

const server = http.createServer(app)
server.listen(PORT, () => console.log(`Server running at ${PORT}`)) // eslint-disable-line

export default server
