const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");

const app = express();
app.use(bodyParser.json());

AWS.config.update({ region: "us-east-1" });

PORT = 5678;
console.log("Listening on port  5678");
app.listen(PORT);

// publish and subscribe
const sns = new AWS.SNS();
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

app.post("/subscribe", (req, res) => {
  let params = {
    Protocol: "SQS",
    TopicArn: "arn:aws:sns:us-east-1:655605368214:sns-topic",
    Endpoint: "arn:aws:sqs:us-east-1:655605368214:trans-queue",
  };

  sns.subscribe(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});
app.post("/publish", (req, res) => {
  console.log(req.body);
  let params = {
    Message: JSON.stringify(req.body.message),
    TopicArn: "arn:aws:sns:us-east-1:655605368214:sns-topic",
    // MessageGroupId: "UserMessages",
  };

  sns.publish(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
});
