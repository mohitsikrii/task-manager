const request = require('supertest')

const User = require('../src/models/user')
const app = require('../src/app')
const { setupDatabase,userOneId,userOne } = require('./fixtures/db')


beforeEach(setupDatabase)
test('signup-user',async()=>{
    const response=await request(app).post('/users').send({
        name:'mohit',
        email:'sikrimohit454@gmail.com',
        password:'mypassword'
    }).expect(201)
    const user=await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
 
    expect(response.body).toMatchObject({
        user:{
            name:'mohit',
            email:'sikrimohit454@gmail.com'
        },
        token:user.tokens[0].token
    })
    expect(user.password).not.toBe('mypassword')
 })

test('sign-in', async () => {
    const response= await request(app).post('/users/login').send({

        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user=await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('sign-in-fails_here', async () => {
    await request(app).post('/users/login').send({

        email: userOne.email,
        password: 'Wrong Password here'
    }).expect(400)
})

test('Profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('no profile', async () => {
    await request(app).get('/users/me')
        .send()
        .expect(401)
})


test('Should Upload a picture', async()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/robot.jpg')
    .expect(200)

})

test('Delete-Profile', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
        const user=await User.findById(userOneId)
     expect(user).toBeNull()
})

test('Donot Delete-Profile', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Update-User', async() => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'dooby'
    }).expect(200)

    const user=await User.findById(userOneId)
    expect(user.name).toEqual('dooby')
})

test('no update',async()=>{
    await request(app).patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        location:'delhi'
    })
   .expect(400)
  
})
