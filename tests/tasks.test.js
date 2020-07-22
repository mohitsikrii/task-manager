const request = require('supertest')
const Tasks=require('../src/models/tasks')
const app= require('../src/app')

const { setupDatabase,userOne,userOneId } = require('./fixtures/db')


beforeEach(setupDatabase)
test('create task', ()=>{
    
})