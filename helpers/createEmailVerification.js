const Mailgen = require('mailgen')
require('dotenv').config()

const createEmailVerification = (email, verifyToken) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Owned-contacts',
      link: 'http://localhost:3000',
    },
  })

  const templateEmail = {
    body: {
      name: email,
      intro:
        "Welcome to Owned-contacts! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with Owned-contacts, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: `http://localhost:3000/api/users/verify/${verifyToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  }

  return mailGenerator.generate(templateEmail)
}

module.exports = createEmailVerification
