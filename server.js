//importações
import express from 'express'
import generate from './pdf.js'
import enviar from './email.js'
import path from 'path'
import { mkdir } from 'fs'


//constantes
const app = express()
const PORT = 5000
const PATH = path.resolve()

mkdir(path.join(PATH,'pdfs'),()=>{})

//configurações do servidor
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

//rota principal
app.route('/')
    .get((req,res)=>{
        //plantando html
        res.sendFile(PATH+'/public/index.html')
    })
    .post((req,res)=>{
        //verificando se há algo no corpo
        if(req.body){
            //formatando o texto
            let text = `name: ${req.body['nome']}\ne-mail: ${req.body['email']}\nnúmero: ${req.body['numero']}\nmotivo: ${req.body['motivo']}`
            //gerar o pdf 
            generate(text,req.body['nome'],PATH)
            //enviar email com as informações
            let transporter = enviar(req.body['nome'],req.body['email'],PATH)
            transporter.then(msg=>{
                //mensagem para o servidor
                console.log(msg)
                //json de confirmação para o client
                res.send({'resp':`<p>Informações enviadas via email para ${req.body['email']}</p><p>OBS: Verificar caixa de spam</p>`})
            })
            .catch(err=>{
                //mensagem para o servidor
                console.log(err)
                //json de alerta para o client
                res.send({'resp':`<p>Algo de errado aconteceu. Tente novamente mais tarde.</p>`})
            })
        }
    })

//rodando o servidor
app.listen(PORT, ()=>{
    console.log(':. http://localhost:'+PORT)
})