# firebase-prototypes

## Tutorial Video
  https://www.youtube.com/watch?v=LOeioOKUKI8

## Materials
  https://qiita.com/Mahito6/items/5b44c63e000d469cb238
  https://qiita.com/seya/items/225f859d775b31047000#%E5%87%A6%E7%90%86%E7%B5%90%E6%9E%9C%E3%82%92%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%A5%E3%81%99%E3%82%8B

## Procedure
  1. Create Project in the [Firebase Console](https://console.firebase.google.com)
  2. create directory and add functions and hosting
  ```
  firebase init functions
  firebase init hosting
  ```
  3. After install *Express*, add ***timestamp*** endpoint in `functions/index.js`
  ```
  const functions = require('firebase-functions');
  const express = require('express');

  const app = express();
  app.get('/timestamp', (request, response) => {
    response.send(`${Date.now()}`);
  })

  exports.app = functions.https.onRequest(app);
  ```

  4. Add *rewite* field in `firebase.json`. 
  ```
  {
    "hosting": {
      "public": "public",
      "rewrite": [{
        "source": "**",
        "functions": "app"
      }],
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ]
    },
    "functions": {
      "predeploy": [
        "npm --prefix \"$RESOURCE_DIR\" run lint"
      ]
    }
  }
  ```
  5. `firebase serve --only functions,hosting` in terminal (execute in same dir with firebase.json)
  6. deploy with command `firebase deploy`. it give ***Function URL***.