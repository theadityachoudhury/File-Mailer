const nodemailer = require("nodemailer");
const fs = require('fs');
const { SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_HOST } = require("../../Config/db.js");


const mailer = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(404).json();
    }
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: true,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    const mailOptions = {
        from: '"Aditya Choudhury" <aditya@adityachoudhury.com>',
        to: email,
        subject: 'Lab Files Recieved',
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        
        <body style="font-family: 'Verdana', sans-serif; margin: 0; padding: 0; background-color: #000; color: #fff;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000;">
                <h1 style="text-align: center; color: #fff; margin-bottom: 0px;font-size: 55px;">File-Mailer</h1>
                <p style="text-align: center; font-style: italic; color: #fff; margin-left: 15%; margin-top: 0px;font-size: 30px;">By StudySync
                </p>
        
                <p style="color: #fff;font-size: 20px;">
                    Dear ${email},<br>
                    Thank you for choosing File-Mailer by StudySync! We appreciate your trust in our service. Your files are in
                    good hands, and we're here to make your file-sharing experience seamless and efficient.
                    <br><br>
                    Your Files are attached below!!
                </p>
        
                <p style="color: #fff;font-size: 20px;">
                    If you have any questions or need assistance, feel free to reach out to our dedicated support team. We're
                    committed to providing you with the best service possible.
                </p>
        
                <p style="color: #fff;font-size: 20px;">With gratitude,<br>Team StudySync</p>
        
                <footer style="margin-top: 20px; text-align: center; color: #999;">
                    &copy; 2023 StudySync. All rights reserved.
                </footer>
            </div>
        </body>
        
        </html>`,
        attachments: req.files.map((file) => {
            return {
                filename: file.originalname,
                path: file.path,
            };
        }),
    };

    res.status(200).json();
    let sent = false;
    let retryLimit = 3;
    while (!sent && retryLimit) {
        try {
            let info = await transporter.sendMail(mailOptions);
            sent = true;
            req.files.forEach((file) => {
                fs.unlinkSync(file.path);
            });
        } catch (err) {
            if (retryLimit == 0) {

            } else {
                retryLimit--;
            }
            console.log(err);
        }
    }


};


module.exports = {
    mailer,
};