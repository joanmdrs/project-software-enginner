const generateFormSearch = () => {
  document.getElementById('principal').innerHTML = `
    <form id='client-add-form' class='client-add-form'>       
        <div class="input">
            <input class='field' type='text' id='cpf-field' placeholder='Informe seu CPF' required>
        </div>

        <div class="button-save-cancel-clear">
            <button id='button-clear' class="button-clear" type="button" onClick='clearFields()'>Limpar</button>
            <button id='button-cancel' class="button-cancel" type="button" onClick='closeForm()'>Cancelar</button>
            <button id='button-search' class="button-search" type="button" onClick='searchClients()'>Buscar</button>
        </div>
    </form>
  `
}


const createTableSearch = () => {
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  thead.innerHTML = `
    <tr>
      <th>CPF</th>
      <th>Nome</th>
      <th>Idade</th>
      <th>Telefone</th>
      <th>Email</th>
      <th>Renda</th>
      <th>Conta</th>
      <th>Status</th>
    </tr>
  `
  table.appendChild(thead)
  const tbody = createTbodySearch()
  table.appendChild(tbody)
  document.getElementById('principal').innerHTML = ' ';
  document.getElementById('principal').appendChild(table)
}

const createTbodySearch = () => {
  const tbody = document.createElement('tbody')
  const cpf = document.getElementById('cpf-field').value;
  const dbClient = readClient()
  dbClient.forEach(client => {
      if(cpf == client.cpf){
        let tr = createRowSearch(client)
        tbody.appendChild(tr)
      }
  });
  return tbody
}

const createRowSearch = (client) => {
  const cpf = document.getElementById('cpf-field').value;
  if(cpf == client.cpf){
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
      <td>${client.cpf}</td>
      <td>${client.name}</td>
      <td>${client.age}</td>
      <td>${client.phone}</td>
      <td>${client.email}</td>
      <td>${client.income}</td>
      <td>${client.type_conta}</td>
      <td>${client.status}</td>
    `
    return newRow
  }
}

const closeFormSearch = () => {
  clearFieldsSearch()
  const footer = document.querySelector('.footer')
  footer.classList.toggle('toogle')
  document.querySelector('#principal').innerHTML = ``
}

const clearFieldsSearch = () => {
  const fields = document.querySelectorAll('.field')
  fields.forEach(field => field.value = "")
}

const openFormSearch = () => {
  generateFormSearch()
  const footer = document.querySelector('.footer')
  footer.classList.toggle('toogle')
}

// const errorCliente = () => {
//   const div = document.getElementsById('principal');
//   div.innerHTML = 'Cliente não encontrado!';
// }

const searchClients = () => {
  const cpf = document.getElementById('cpf-field').value;
  const dbClient = readClient()
  let cont = 0;
  dbClient.forEach(client => {
      if(cpf == client.cpf){
        cont += 1;
      }
  });
  if(cont >= 1){
    createTableSearch()
  } else{
    //errorCliente()
  }
}

document.querySelector('#search-client')
  .addEventListener('click', openFormSearch)