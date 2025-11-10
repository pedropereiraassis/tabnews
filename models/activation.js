import email from "infra/email.js";

async function sendEmailToUser(user) {
  await email.send({
    from: "PedroNews <contato@pedronews.com.br>",
    to: user.email,
    subject: "Activate your account at PedroNews!",
    text: `${user.username}, click the link below to activate your account:
https://link.com

Thank you for joining us!
PedroNews Team`
  })
}

const activation = {
  sendEmailToUser,
}

export default activation;