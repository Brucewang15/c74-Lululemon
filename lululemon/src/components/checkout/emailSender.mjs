import Mailgun from 'mailgun.js'
import formData from 'form-data'




    const mailgun = new Mailgun(formData)
    const mg = mailgun.client({
        username: 'api',
        key: 'bc8f2e60dddd41f487d4b60e80d41b2d-777a617d-97da2d90'
    })

    mg.messages.create('sandbox151b0eb017d14b21b65e00970ee97aed.mailgun.org', {
        from: "Excited User <mailgun@sandbox151b0eb017d14b21b65e00970ee97aed.mailgun.org>",
        to: 'bruce.wang15@outlook.com',
        subject: 'hello',
        html: "<h1>Click the link in the subjec</h1>"

    })
        .then(msg => console.log("message", msg)) // logs response data
        .catch(err => console.log(err));