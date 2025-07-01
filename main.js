const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 10;
numeroSenha.textContent = tamanhoSenha;

const botao = document.querySelectorAll('.parametro-senha__botao');

botao[0].onclick = diminuiTamanhoSenha;
botao[1].onclick = aumentaTamanhoSenha;

function diminuiTamanhoSenha() {
    if (tamanhoSenha > 1) {
    tamanhoSenha--;
    }

numeroSenha.textContent = tamanhoSenha;
gerarSenha();
}

function aumentaTamanhoSenha() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
numeroSenha.textContent = tamanhoSenha;
gerarSenha();

}

const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = gerarSenha;
}

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+[]{}|;:,.<>?';


gerarSenha();

function gerarSenha() {
    let alfabeto = '';
if (checkbox[0].checked) {
alfabeto = alfabeto + letrasMaiusculas;
}
if (checkbox[1].checked) {
alfabeto = alfabeto + letrasMinusculas;
}
if (checkbox[2].checked) {
alfabeto = alfabeto + numeros;
}
if (checkbox[3].checked) {
alfabeto = alfabeto + simbolos;
}
console.log(alfabeto);
    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {  
    let numeroAleatorio = Math.random() * alfabeto.length;
    numeroAleatorio = Math.floor(numeroAleatorio);
    senha = senha + alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
}


gerarSenha();