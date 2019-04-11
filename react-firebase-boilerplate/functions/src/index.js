import * as functions from 'firebase-functions'
import cors from 'cors'

const corsHander = cors({ origin: true })

const app = functions.https.onRequest((req, res) => {
  
  // req.headers.host
  // set url can access
  corsHander(req, res, () => {
    res.status(200).send({ data: 'Hello from Firebase!' });
  });
})

export {
  app,
}
