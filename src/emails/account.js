const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'gagandeepvashisht96@gmail.com', // Change to your recipient
  from: 'gagandeepvashisht96@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:"gagandeepvashisht96@gmail.com",
        subject:"Welcome to our app",
        text:`Welcome to the app, ${name}. Let e know how you get along with the app` 
    });
}
const sendCancelationEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:"gagandeepvashisht96@gmail.com",
        subject:"Sorry to see you go",
        text:'GoodBye ${name}. I hope to see to back sometime soon' 
    });
}
module.exports={
    sendWelcomeEmail
}
