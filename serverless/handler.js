'use strict';
const sesHelper = require('./sesHelper')

function createResponse(status, body) {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    statusCode: status,
    body: JSON.stringify(body)
  }
}

async function contactFormSubmit(event, context, callback) {
  let body
  let senderEmail
  let name
  let message
  console.log(event['body'])
  if (event['body'] !== null && event['body'] !== undefined) {
    body = JSON.parse(event['body'])
    if(body.email !== undefined){
      senderEmail = body.email
      name = body.name
      message = body.message
    } else {
      return callback(null, createResponse(400, {
        error: 'Incomplete request body',
      }))
    }
  } else {
    return callback(null, createResponse(400, {
      error: 'Incomplete request body',
    }))
  }
  
  let html = `
  <p>New message from: ${name}</p>
  <p>Respond to: ${senderEmail}</p>
  <br/>
  <p>${message}</p>
  `
  let emailResponse
  try{
    emailResponse = await sesHelper.sendEmail(html)
    console.log(emailResponse)
  } catch (err) {
    return callback(null, createResponse(500, {
      error: 'Internal Server Error',
      message: err
    }))
  }
  return callback(null, createResponse(200, {
    message: 'Email sent successfully',
  }))
}

module.exports = {
  contactFormSubmit
}