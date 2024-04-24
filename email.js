import mailer from 'nodemailer'
import CONFIG from './config.js'

function enviar(filename='',to_email='',PATH=''){
    let transporter = mailer.createTransport({
        host: CONFIG.host,
        port: CONFIG.port,
        secure:false,
        auth: CONFIG.auth,
        tls:{
            rejectUnauthorized: false,
        }
    })
    let msg = {
        'from':`Vinicius Gabriel <${CONFIG.auth.user}>`,
        'to':to_email,
        'text':'Atividade de recuperação',
        'subject':'PDF do forms',   
        'attachments': [
            {
                'filename': `${filename}.pdf`,
                'path': `${PATH}/pdfs/${filename}.pdf`,
            }
        ]
    }
    return transporter.sendMail(msg)
}

export default enviar