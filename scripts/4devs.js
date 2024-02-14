const url = 'https://www.4devs.com.br/ferramentas_online.php'
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const defaultParams = {
  'gerar_pessoa': {
    acao: 'gerar_pessoa',
    sexo: 'I',
    idade: 0,
    txt_qtde: 1,
  },
  'gerar_empresa': {
    acao: 'gerar_empresa',
    pontuaca: 'S',
    estado: 'SP',
    idade: 5
  }
}

const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');

function request4devs(requestType) {
  chrome.runtime.sendMessage({
    type: '4devs',
    url,
    method: 'POST',
    headers: config.headers,
    body: toUrlEncoded(defaultParams[requestType]),
  },
    response => {
      console.log('From 4devs', response)
    }
  )
}

module.exports = request4devs
