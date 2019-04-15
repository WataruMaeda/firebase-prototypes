import * as functions from 'firebase-functions'
import nodemailer from 'nodemailer'
import cors from 'cors'

const corsHander = cors({ origin: true })

const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})

const app = functions.https.onRequest((req, res) => {
  const email = {
    from: gmailEmail,
    to: '[YOUR-EMAIL]@gmail.com',
    subject: 'test message',
    text: 'This is a test message from firebase functions.'
  }
  mailTransport.sendMail(email, (err, info) => {
      if (err) {
        return console.log(err)
      }
      corsHander(req, res, () => {
        res.status(200).send({ data: 'Hello from Firebase!' });
      });
  })
})

export {
  app,
}
