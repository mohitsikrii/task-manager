// const sgMail= require('@sendgrid/mail')
// const sendgridAPIkey='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'

// sgMail.setApiKey(sendgridAPIkey)
// sgMail.send({
//     to:'prachigoyal59@gmail.com',
//     from:'prachigoyal59@gmail.com',
//     subject:'testing',
//     text:'i hope this reaches you'
// })

const sgMail = require('@sendgrid/mail');
// const SENDGRID_API_KEY='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'
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: 'sikrimohit454@gmail.com',
//   from: 'sikrimohit454@gmail.com',
//   subject: 'this is from node js',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>I hope this works fine now :(( </strong>'
// }
// sgMail.send(msg).then(() => {
//     console.log('Message sent')
// }).catch((error) => {
//     console.log(error.response.body)
//     // console.log(error.response.body.errors[0].message)
// })
//========================nw
// const msg= {
//     to:email,
//     from:'sikrimohit454@gmail.com',
//     subject:'Thanks',
//     text:`hello ${name}`
// }

// const sendWelcomeEmail = () =>{
//     sgMail.send(msg).then(()=>{
//         console.log('sent')
//     }).catch((e)=>{
//         console.log(e)
//     })
// }
//==================================nw

const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
      to:email,
      from:'sikrimohit454@gmail.com',
      subject:'Thanks for joining in!',
      text:`Welcome to the app, ${name}.Let us know how you get along with the app!`
    })
  }
// =====================================
const sendGoodbyeEmail=(email,name)=>{
    sgMail.send({
      to:email,
      from:'sikrimohit454@gmail.com',
      subject:'It is sad to see you go',
      text:`Welcome to the app, ${name}.Let us know how you get along with the app!`
    }).then(()=>{
                console.log('sent')
            }).catch((e)=>{
                console.log(e)
            })
  }
//=====================================
module.exports={
    sendWelcomeEmail,
    sendGoodbyeEmail
}