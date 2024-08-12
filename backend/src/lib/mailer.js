const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'gastify.cloud@gmail.com',
        pass: 'qekl ayqt sanf coys'
    }
})

//enviando correo
const sendMailer = async ({ to, subject, text, html }) => {
    try {
        await transporter.sendMail({
            from: 'Gastify : < gastify.@gmail.com >',
            to,
            subject,
            html,
            text,
        })
        return { ok: true, message: "email enviado" }
    } catch (error) {
        console.log({ error })
        return { ok: false, message: "problem to send mail" }
    }
}

module.exports = sendMailer;


