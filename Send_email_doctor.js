var nodemailer = require('nodemailer');

let smtpConfig = {
    service: 'Gmail',
    host: 'smtp.gmail.com', // you can also use smtp.gmail.com
    port: 587,
    secure: true, // use TLS
    auth: {
        user: 'angel.nurse.assistant@gmail.com', 
        pass: 'Been1chu1@3'
    }
};

function main(params) {
    return new Promise(function (resolve, reject) {
        let response = {
            code: 200,
            msg: 'E-mail was sent successfully!'
        };

        if (!params.reminder) {
            response.msg = "Error: Reminder was not provided.";
            response.code = 400;
        }
        else if (!params.email) {
            response.msg = "Error: Destination e-mail was not provided.";
            response.code = 400;
        }
        else if (!params.conversation_id) {
            response.msg = "Error: Conversation id was not provided.";
            response.code = 400;
        }

        if (response.code != 200) {
            reject(response);
        }

        console.log(`Validation was successful, preparing to send email...`);

        sendEmail(params, function (email_response) {
            response.msg = email_response['msg'];
            response.code = email_response['code'];
            response.reason = email_response['reason'];
            console.log(`Email delivery response: (${email_response['code']}) ${response.msg}`);
            resolve(response);
        });

    });
    
    return 0
}

function sendEmail(params, callback) {

    let transporter = nodemailer.createTransport(smtpConfig);
    let mailOptions = {
        from: `AngelHack_Nurse Assistant <${smtpConfig.auth.user}>`,
        to: params.email,
        subject: `[non-reply] - DOCTOR HELP ${params.reminder}`,
        text: `Hi doctor, this is nurse assistant from Angelhack_Vietnam. I am receiving a case of a patient in Bac Lieu Vietnam. \n
        Level: 1-non danger
        systomps: ${params.symtomp}
        drug taken: ${params.drug_take}
        situation: ${params.situation}
        info: ${params.info_user}
        My AI-based treatment: Take rest and not do hard work, not take acidin for interaction with amoxilyn
        Could you help me to verify this treatment?
        By level 1-nondanger, after your approval, I can send back the treatment to the patient
        Thank you,
        `
    };
    transporter.sendMail(mailOptions, function (error, info) {

        let email_response = {
            code: 200,
            msg: 'Email was sent successfully',
            reason: 'Success'
        };

        if (error) {
            email_response.msg = 'Error';
            email_response.code = 500;
            email_response.reason = error;
        }
        else {
            email_response.msg = info.response;
            email_response.code = 200;
            email_response.reason = info.response;
        }
        callback(email_response);
    });
}
