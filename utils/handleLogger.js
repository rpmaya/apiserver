const { IncomingWebhook } = require("@slack/webhook")

const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

//Buscamos en la doc "Execute code X on write"
const loggerStream = {
    write: message => {
      webHook.send({
        text: message
      })
    }
}

module.exports = loggerStream