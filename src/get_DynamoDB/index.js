/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-escape */

// LIBRARY
const AWS = require('aws-sdk');

// ENVIRONMENT
const {
  REGION,
  USER_TABLE_NAME,
} = require('./config');

// AWS SERVICES
const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  region: REGION,
});

// GLOBAL FUNCTION
function throwError(message) {
  const payload = {
    statusCode: 400,
    message,
  };
  return payload;
}
async function errorPayload(statusCode, message) {
  const payload = {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'x-amzn-ErrorType': statusCode,
    },
    isBase64Encoded: false,
    body: JSON.stringify({
      message,
      statusCode,
    }),
  };

  return payload;
}
async function successPayload(type, input, message) {
  let body = {};
  switch (type) {
    case 'data':
      body = { data: input, statusCode: 200 };
      if (message !== undefined) {
        body.message = message;
      }
      break;
    case 'message':
      body = { message: input, statusCode: 200 };
      break;
    default:
      break;
  }

  const payload = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    isBase64Encoded: false,
    body: JSON.stringify(body),
  };

  return payload;
}

// MAIN FUNCTION
exports.handler = async (event) => {
  try {
    // console.log(JSON.stringify(event));

    // get data in dynamo DB
    var params = {
      TableName: USER_TABLE_NAME,
    };
    const scanResp = await docClient.scan(params).promise();

    const response = await successPayload('data', scanResp);
    return response;
  } catch (error) {
    const response = await errorPayload(error.statusCode, error.message);
    return response;
  }
};
