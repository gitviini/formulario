//CONFIGURAÇÕES
//poderia ter usado um .json, mas deu preguiça
//utiliza conta da microsoft, que oferece serviço gratuito de smtp
const CONFIG = {
    host: 'smtp.office365.com',
    port: 587,
    auth:{
        user:'teste.deprograminhas@gmail.com',
        pass:'senha54321'
    },
}

export default CONFIG