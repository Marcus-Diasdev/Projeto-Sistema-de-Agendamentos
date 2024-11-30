let protocoloAdicionado = false;
let finalizarExecutado = false;
let finalExe = false;
let protocoloCount = 0;
let x = "";

function inserirProtocolo(){
  const protocolo = document.getElementById('Protocolo');
  const novoProtocolo = document.createElement('div');
  novoProtocolo.id = `protocolo-${protocoloCount}`;
    novoProtocolo.innerHTML = `
    <br />
    <textarea id="text" class="protocolo-txt" required></textarea>
    <button onclick="fechar('${novoProtocolo.id}')">X</button>
  `;

  protocolo.appendChild(novoProtocolo);
    protocoloAdicionado = true;
    protocoloCount++;
  if(protocoloAdicionado == true && finalExe == false){
    const protocolo = document.getElementById('final');
    const btnFinal = document.createElement('span');
    btnFinal.innerHTML = '<button onclick="finalizar()">Finalizar Agendamento</button>';
    protocolo.appendChild(btnFinal);
    finalExe = true;
  }
  abrirPopup();
}

function finalizar() {
  if (protocoloAdicionado) {
  if (!finalizarExecutado) {
    const protocolo = document.getElementById('Protocolos');
    const btnEncerrar = document.createElement('span');
    btnEncerrar.innerHTML = '<button type="submit" onclick="enviarAgendamento()">Encerrar</button>';
    protocolo.appendChild(btnEncerrar);
    finalizarExecutado = true;
  }}
}

function fechar(protocoloId) {
  const protocolo = document.getElementById(protocoloId);
  protocolo.parentNode.removeChild(protocolo);
  fecharPopup();
}

function abrirPopup() {
  const popup = document.getElementById('popup');
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  const popupContent = `
    <h4 class="tituloP">Selecione o Tipo de Agendamento</h4>
    <select id="dropdown" >
        <label>
          <option>selecione</option>
          <option>Consulta</option>
          <option>Exame</option>
          <option>Cancelamento</option>
          <option>Reagendamento</option>
          <option>PAT</option>
          <option>Informação</option>
          <option>Indicação de Rede</option>
          <option>Dani</option>
        </label>
      </select>
    <button onclick="selecionar()">Enter</button>
    <br />
    <br />
  `;
  popup.innerHTML = popupContent;
  document.body.appendChild(overlay);
  popup.style.display = 'block';
}

function selecionar() {
  var element = document.getElementById("dropdown");
x = element.options[element.selectedIndex].text;
if(x == 'selecione') {
     return alert('Selecione uma opção!');
   }
   else  {
    const currentProtocolo = document.getElementById(`protocolo-${protocoloCount - 1}`);
    const textArea = currentProtocolo.querySelector('textarea');
    const nomePaciente = document.getElementById('nome').textContent;

    let textToInsert;
    switch (x) {
      case 'Consulta':
        textToInsert = ' Senhor(a) * solicita agendamento para o beneficiário  $, na especialidade *. Realizado o agendamento conforme a seguir: Orientações e dados do agendamento enviado para e-mail * .';
        break;
      case 'Exame':
        textToInsert = " Senhor(a) * solicita agendamento para o beneficiário $, na procedimento *. Realizado o agendamento conforme a seguir: Orientações e dados do agendamento enviado para e-mail * .";
        break;
      case 'Cancelamento':
        textToInsert = " Senhor(a) * solicita cancelamento para o beneficiário $, na especialidade/procedimento *. Realizado o cancelamento conforme motivo a seguir: * ";
        break;
      case 'Reagendamento':
        textToInsert = '" Senhor(a) * solicita agendamento para o beneficiário $, na especialidade/procedimento *. Realizado o agendamento conforme a seguir: Orientações e dados do agendamento enviado para e-mail * ."';
        break;
      case 'PAT':
        textToInsert = 'Sr(a) $ solicita renovar sua receita / pedido médico com a especialidade * doutor(a)*. Informo sobre abertura de PAT, sendo possível realizar já que se encaixa nos critérios. Confirmo telefone de contato: * Solicitado em sistema. Beneficiário ciente sobre prazo de retorno em até *			';
        break;
      case 'Informação':
        textToInsert = "Senhor(a) * solicita informação para o beneficiário $, sobre a especialidade/procedimento *. Realizado o agendamento conforme a seguir: Orientações e dados do agendamento enviado para e-mail * ."			;
        break;
      case 'Indicação de Rede':
      textToInsert = "Sr.(a) * solicita agendamento de procedimento/consulta na especialidade *, procedimento * para beneficiário $ Não tem horário dentro do prazo na rede própria OU não possui na rede na rede própria.Realizado indicação de rede e enviado para o e-mail * OU verbalizado em linha." ;
      break;
      case 'Dani' :
      euTeAmo();
      textToInsert ='';
      break;
      default:
        textToInsert = ''; 
    }
    textArea.value = textToInsert.replace(/\$/g, nomePaciente);
    fecharPopup();
   }
}  
    
function fecharPopup() {
  const popup = document.getElementById('popup');
  const overlay = document.querySelector('.overlay');
  popup.style.display = 'none';
  overlay.remove();
}

function enviarAgendamento() {
    const todasTextareas = document.querySelectorAll('.protocolo-txt');
    let todasPreenchidas = true;

    todasTextareas.forEach(textarea => {
        if (textarea.value.trim() === '') {
            todasPreenchidas = false;
        }
    });

    if (todasPreenchidas) {
      document.getElementById('Protocolos').innerHTML = '';
      alert("Agendamento concluído!")
      self.location.href= self.location.href;
        
    return;} 
    else{
        alert('Por favor, preencha o protocolo.');
        }
}

function euTeAmo() {
  const elementos = document.body.querySelectorAll('*');
  elementos.forEach(elemento => {
    elemento.style.display = 'none';
  });
  const titulo = document.createElement('h1');
  const btnrefresh = document.createElement('span');
  titulo.textContent = 'EU TE AMO ❤️';
  btnrefresh.innerHTML = '<button id="recarregar" onclick="refresh()">Recarregar</button>';
  document.body.appendChild(titulo);
  document.body.appendChild(btnrefresh);
}

function refresh() {
    return self.location.href= self.location.href;
}

function textareaEstaVazia(idTextarea) {
    const textarea = document.getElementById(idTextarea);
    return textarea.value.trim() === '';
  }