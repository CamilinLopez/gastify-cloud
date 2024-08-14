const sendMailer = require("../lib/mailer")
//funcion para enviando de link
const sendMailerVerificationLink = async(email, link, empresa) => {
	const verificationLink = `${link}?email=${encodeURIComponent(email)}&empresa=${encodeURIComponent(empresa.id)}`;

	try {
		await sendMailer({
			to: email,
			subject: 'Verificación de Email',
			html: `
			<!DOCTYPE html>
			<html lang="es">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
			</head>
			<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; color: #333; background-color: #f4f4f4;">
				<div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
					<p>Hola,</p>
					<p>El email: ${empresa.email} le a invitado a ser parte del equipo de trabajo, para verificar su email ${email}, por favor, haz clic en el siguiente botón:</p>
					<a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verificar Email</a>
					
					<p>Gracias por tu colaboración.</p>
					<p>Saludos cordiales,<br><strong>Gastify</strong></p>
				</div>
			</body>
			</html>
    `
		})
		return true;
	} catch (error) {}
}

module.exports = sendMailerVerificationLink;

