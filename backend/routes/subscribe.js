const { isUtf8 } = require('buffer');
const { subscribe } = require('diagnostics_channel');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')

/*
1.read existing file
2.prase data int array
3.add new data to array
4.save array into file
*/

router.post('/', (req, res) => {
   const { email } = req.body;
   const subscribe = { subscribeAt: new Date(), email };
   const filePath = path.join(__dirname, '..', 'data', 'subscribe.json');

   console.log('Subscribe form submited', { email });
   let subscribes = [];
   if (fs.existsSync(filePath)) {
      //file is there
      const fileData = fs.readFileSync(filePath, 'utf-8');
      subscribes = JSON.parse(fileData);
      subscribes.push(subscribe);
      fs.writeFileSync(filePath, JSON.stringify(subscribes, null, 2));
      res.status(200).json({ status: "Message Recieved" });


   } else {
      subscribes.push(subscribe);
      fs.writeFileSync(filePath, JSON.stringify(subscribes, null, 2));
      res.status(200).json({ status: "Message Recieved" });
   }

})
module.exports = router;
