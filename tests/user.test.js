const request = require('supertest')
const app= require('../src/app')

const User= require('../src/models/user')

const userOne={
    name:'mohit',
    email:'sikrimohi454@gmail.com',
    password:'mypassword'
}

beforeEach(async()=>{
    await User.deleteMany()
    await User(userOne).save()
})

test('signup-user',async()=>{
   await request(app).post('/users').send({
       name:'mohit',
       email:'sikrimohit454@gmail.com',
       password:'mypassword'
   }).expect(201)
})



// test('signup-user',async()=>{
//     await request(app).post('/users/login').send({
//         name:'mohit',
//         email:'sikrimohit454@gmail.com',
//         password:'mypassword'
//     }).expect(201)
//  })

 test('sign-in-fails_here',async()=>{
    await request(app).post('/users/login').send({
    
        email:userOne.email,
        password:userOne.password
    }).expect(200)
 })

 test('sign-in',async()=>{
    await request(app).post('/users/login').send({
    
        email:userOne.email,
        password:'Wrong Password here'
    }).expect(400)
 })