//pegando tag form
let form = document.querySelector('form')
let button = document.querySelector('button')

let container_resp = document.querySelector('#resp')

//gera mensagem de corfimação ou aviso
function generate(msg=''){
    container_resp.innerHTML = msg
}

//função assincrona para pegar e plantar o json
async function send_info(info={}){
    //guardando promise
    let resp = await fetch('/',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(info)
    })
    //pegando dados atraves do metodo json()
    let data = await resp.json()
    //retornando valores
    return data
}

//atribuindo função arrow ao evento submit
form.onsubmit = (event) =>{
    //evitando o comportamento padrão (reload da página)
    event.preventDefault()
    //json para as informações
    let info = {}
    //pegando cada input (chave:valor)
    for(input of form.children){
        if(input.value){
            info[input.getAttribute('name')] = input.value
        }
    }
    //adicionando pseudo class "click"
    button.classList.add('click')
    container_resp.innerHTML = 'carregando...'
    form.style.paddingBottom = '0'
    //enviando e recebendo as informações
    send_info(info)
    .then(data=>{
        generate(data['resp'])
        //removendo "click"
        button.classList.remove('click')
        form.style.paddingBottom = '20px'
    })
}