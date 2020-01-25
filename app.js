const express = require('express')
const confirm = require('config')

const app = express()

const PORT = confirm.get('port') || 5000

app.listen(PORT, () => console.log(`App has been started... ${PORT}`))
