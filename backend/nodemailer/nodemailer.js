const nodemailer = require("nodemailer");
const nodemailer_SendGrid = require("nodemailer-sendgrid");

require("dotenv").config();

// Send email using Nodemailer
function send_email(email_sent_to, subject, html) {
	const transporter = nodemailer.createTransport(
		nodemailer_SendGrid({
			apiKey: process.env.SENDGRID_API_KEY,
		})
	);

	const mail_options = {
		from: process.env.EMAIL_SENT_FROM,
		to: email_sent_to,
		subject: subject,
		html: html,
	};

	transporter.sendMail(mail_options, (error) => {
		if (error) {
			return console.log(error);
		}
		console.log("Message sent!");
	});
}

function prepare_email_to_send(content_to_be_sent) {
	let email_sent_to = process.env.EMAIL_SENT_TO;
	let subject = "Virtual Assistant";
	let html = content_to_be_sent;

	send_email(email_sent_to, subject, html);
}

module.exports = {
	prepare_email_to_send,
};
