const sgMail = require('@sendgrid/mail')
const { createEmailVerification } = require('../../helpers')

const sendEmail = async (email, verifyToken) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const createdEmail = createEmailVerification(email, verifyToken)

  const msg = {
    to: email, // Change to your recipient
    from: 'galexing@ukr.net', // Change to your verified sender
    subject: 'Confirm your account',
    html: createdEmail,
  }

  await sgMail.send(msg)
}

module.exports = sendEmail
