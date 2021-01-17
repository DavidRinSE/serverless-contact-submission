const AWS = require('aws-sdk');

let sendEmail = (message) => {
    const SES_CONFIG = {
        accessKeyId: `${process.env.SES_ACCESS_KEY}`,
        secretAccessKey: `${process.env.SES_SECRET}`,
        region: 'us-east-2',
    };
    
    const AWS_SES = new AWS.SES(SES_CONFIG);

    let params = {
    Source: 'contact@davidr.in',
    Destination: {
        ToAddresses: [
        'davidrichardsonIN@gmail.com'
        ],
    },
    ReplyToAddresses: [],
    Message: {
        Body: {
            Html: {
                Charset: 'UTF-8',
                Data: message,
            },
        },
        Subject: {
        Charset: 'UTF-8',
        Data: `A new submission was made`,
        }
    },
    };
    console.log('sending email...')
    return AWS_SES.sendEmail(params).promise();
};

module.exports = {
    sendEmail,
};