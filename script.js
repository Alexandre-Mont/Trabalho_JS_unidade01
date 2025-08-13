// Elementos
const form = document.getElementById("tabuadaForm");
const numeroInput = document.getElementById("numero");
const operacaoSelect = document.getElementById("operacao");
const mensagem = document.getElementById("mensagem");
const saida = document.getElementById("saida");
const limparBtn = document.getElementById("limparBtn");
const imprimirBtn = document.getElementById("imprimirBtn");

// Validação
function validarNumero(n) {
  if (n === "" || n === null)
    return { ok: false, msg: "Por favor insira um número." };
  const num = Number(n);
  if (Number.isNaN(num))
    return { ok: false, msg: "Valor inválido. Use apenas números." };
  if (!Number.isInteger(num))
    return { ok: false, msg: "Insira um número inteiro." };
  if (num < 1 || num > 20)
    return { ok: false, msg: "O número deve estar entre 1 e 20." };
  return { ok: true, value: num };
}

// Função para formatar operação (exibir símbolos bonitos)
function simbolo(op) {
  switch (op) {
    case "*":
      return "×";
    case "/":
      return "÷";
    case "+":
      return "+";
    case "-":
      return "−";
    default:
      return op;
  }
}

// Gera tabuada usando for (1 a 10 ou até 20 se desejar)
function gerarTabuada(n, op) {
  saida.innerHTML = "";
  saida.hidden = false;

  const titulo = document.createElement("div");
  titulo.className = "titulo";
  titulo.textContent = `Tabuada do ${n} — operação ${simbolo(op)}`;
  saida.appendChild(titulo);

  // Intervalo de 1..10 por padrão (ex: 1..10) — exibiremos até 10, mas o usuário definiu 1..20 para o número
  // Aqui o exercício pede multiplicações de 1 a 10; para gerar mais linhas troque max = 20
  const max = 20; // use 10 para seguir requisito; se quiser 20 altere para 20

  for (let i = 1; i <= max; i++) {
    const linha = document.createElement("div");
    linha.className = "linha";

    let resultado;
    switch (op) {
      case "*":
        resultado = n * i;
        break;
      case "/":
        resultado = (n / i).toFixed(2);
        break;
      case "+":
        resultado = n + i;
        break;
      case "-":
        resultado = n - i;
        break;
      default:
        resultado = n * i;
    }

    linha.textContent = `${n} ${simbolo(op)} ${i} = ${resultado}`;
    saida.appendChild(linha);
  }
}

// Submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  mensagem.hidden = true;

  const valor = numeroInput.value.trim();
  const valid = validarNumero(valor);
  if (!valid.ok) {
    saida.hidden = true;
    mensagem.textContent = valid.msg;
    mensagem.hidden = false;
    numeroInput.focus();
    return;
  }

  const op = operacaoSelect.value;
  gerarTabuada(valid.value, op);
});

// Limpar
limparBtn.addEventListener("click", () => {
  numeroInput.value = "";
  mensagem.textContent = "";
  mensagem.hidden = true;
  saida.hidden = true;
  saida.innerHTML = "";
  numeroInput.focus();
});

// Imprimir / exportar PDF (usa diálogo do navegador)
imprimirBtn.addEventListener("click", () => {
  // Se não tiver resultado, mostra aviso
  if (saida.hidden) {
    mensagem.textContent = "Gere a tabuada antes de imprimir/exportar.";
    mensagem.hidden = false;
    numeroInput.focus();
    return;
  }
  // Força foco na área de saída antes de imprimir (melhora acessibilidade)
  saida.setAttribute("tabindex", "-1");
  saida.focus();
  window.print();
});

// Preenche valor padrão para testes e mantém foco
window.addEventListener("load", () => {
  numeroInput.value = "2";
});

// Suporte a teclado: Enter no input também submete (já padrão), Escape limpa
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    limparBtn.click();
  }
});
