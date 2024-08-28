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
    idade: 5,
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
      const contentContainer = document.getElementById("content-container");
      if (!isJsonString(JSON.stringify(response))) {
        contentContainer.innerHTML = response
        return
      }
      const entries = response[0]

      localStorage.setItem('dddata', JSON.stringify(entries))

      const ul = document.createElement("ul")
      ul.classList.add('list-group')

      for (const [key, value] of Object.entries(response[0])) {
        // content
        const li = document.createElement("li");
        li.classList.add('list-grou-item', 'd-flex', 'justify-content-between', 'align-items-start')

        const p = document.createElement("p")
        p.innerHTML = `<strong>${key}:</strong> ${value}`;
        li.appendChild(p)

        // copy
        const copyIcon = document.createElement("i");
        copyIcon.className = "fas fa-copy";
        copyIcon.style.cursor = "pointer";
        copyIcon.addEventListener("click", () => copyToClipboard(value));
        li.appendChild(copyIcon);

        ul.appendChild(li);
      }
      contentContainer.appendChild(ul)
    }
  )
}

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function copyToClipboard(text) {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

const personInput = document.getElementById('person')
const companyInput = document.getElementById('company')
const generateButton = document.getElementById('button')

let currentCheckedValue = 'person'

function handleCheckedValue(event) {
  currentCheckedValue = event.target.name
  if (event.target.checked && event.target.name === 'person') {
    companyInput.checked = false
    return
  }


  if (event.target.checked && event.target.name === 'company') {
    personInput.checked = false
    return
  }
}

async function handleGenerateButon() {
  request4devs(
    currentCheckedValue === 'person'
      ? 'gerar_pessoa'
      : 'gerar_empresa'
  )
}

personInput.addEventListener('change', handleCheckedValue)
companyInput.addEventListener('change', handleCheckedValue)
generateButton.addEventListener('click', handleGenerateButon)

document.addEventListener('DOMContentLoaded', () => {
  const metadata = localStorage.getItem('dddata')
  if (metadata) {
    const data = JSON.parse(metadata)
    const contentContainer = document.getElementById("content-container");
    const ul = document.createElement("ul")
    ul.classList.add('list-group')

    for (const [key, value] of Object.entries(data)) {
      // content
      const li = document.createElement("li");
      li.classList.add('list-grou-item', 'd-flex', 'justify-content-between', 'align-items-start')

      const p = document.createElement("p")
      p.innerHTML = `<strong>${key}:</strong> ${value}`;
      li.appendChild(p)

      // copy
      const copyIcon = document.createElement("i");
      copyIcon.className = "fas fa-copy";
      copyIcon.style.cursor = "pointer";
      copyIcon.addEventListener("click", () => copyToClipboard(value));
      li.appendChild(copyIcon);

      ul.appendChild(li);
    }
    contentContainer.appendChild(ul)
  }
});
