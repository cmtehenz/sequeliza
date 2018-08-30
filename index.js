const path = require('path')
const express =  require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const methodOverride = require('method-override')
const Sequelize = require('sequelize')
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))

//const sequelize = new Sequelize('mysql://root:root@localhost:3306/sequel')
const sequelize = new Sequelize('sequel', 'root', 'root' , {
	host: 'localhost',
	dialect: 'mysql',
	operatorsAliases: Sequelize.Op
})
sequelize
	.authenticate()
	.then(() => console.log('OK!'))
	.catch(() => console.log('Error'))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/view'))

//require('./src/model/index')
require('./src/index')(app)

app.listen(9000, () => {
	console.log('Express has been ignite')
})
