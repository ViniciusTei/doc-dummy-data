window.addEventListener('load', main, false)

const url = 'https://www.4devs.com.br/ferramentas_online.php'
const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');

function request4devs(requestType) {
	const bodyEncoded = toUrlEncoded({acao: requestType})
	return fetch(url, {
		method: 'POST',
		headers: config.headers,
		body: bodyEncoded,
		mode: 'no-cors'
	})
}

const gerarDados = {
	gerarPessoa: () => request4devs('gerar_pessoa'),
	gerarEmpresa: () => request4devs('gerar_empresa'),
}

async function main() {
	const inputs = document.querySelectorAll('input')
	const inputIds = []

	for (const input of inputs) {
		inputIds.push(input.id)
	}

	if (inputIds.includes('cpf')) {
		gerarDados.gerarPessoa().then(response => response.json()).then(data => {
			console.log('data from 4devs', data)
		})
	}
}
