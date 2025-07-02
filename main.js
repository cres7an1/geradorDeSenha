const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 10;
numeroSenha.textContent = tamanhoSenha;
const botao = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const checkboxSemRepeticao = document.getElementById('sem-repeticao');
const checkboxSemSequencia = document.getElementById('sem-sequencia');
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+[]{}|;:,.<>?';
const forcaSenha = document.querySelector('.forca');

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

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = gerarSenha;
}
checkboxSemRepeticao.onclick = gerarSenha;
checkboxSemSequencia.onclick = gerarSenha;

gerarSenha();

function gerarSenha() {
    let alfabeto = '';
    if (document.getElementById('maiusculo').checked) {
        alfabeto += letrasMaiusculas;
    }
    if (document.getElementById('minusculo').checked) {
        alfabeto += letrasMinusculas;
    }
    if (document.getElementById('numero').checked) {
        alfabeto += numeros;
    }
    if (document.getElementById('simbolo').checked) {
        alfabeto += simbolos;
    }
    if (alfabeto === '') {
        alfabeto = letrasMaiusculas;
    }

    let senha = '';
    let caracteresUsados = new Set();
    
    for (let i = 0; i < tamanhoSenha; i++) {
        let charsAvailable = alfabeto;
        if (checkboxSemRepeticao.checked) {
            charsAvailable = alfabeto.split('').filter(char => !caracteresUsados.has(char)).join('');
            if (charsAvailable === '') {
                charsAvailable = alfabeto;
                caracteresUsados.clear();
            }
        }

        const indiceAleatorio = Math.floor(Math.random() * charsAvailable.length);
        let caractere = charsAvailable[indiceAleatorio];
        
        if (checkboxSemSequencia.checked && /[0-9]/.test(caractere)) {
            const ultimaParte = senha.slice(-2) + caractere;
            const sequenciasProibidas = [
                '012', '123', '234', '345', '456', '567', '678', '789',
                '210', '321', '432', '543', '654', '765', '876', '987'
            ];
            
            if (sequenciasProibidas.some(seq => ultimaParte.includes(seq))) {
                let tentativas = 0;
                let novoCaractere;
                do {
                    const novoIndice = Math.floor(Math.random() * charsAvailable.length);
                    novoCaractere = charsAvailable[novoIndice];
                    tentativas++;
                } while (tentativas < 10 && 
                         sequenciasProibidas.some(seq => (senha.slice(-2) + novoCaractere).includes(seq)));
                
                if (tentativas < 10) {
                    caractere = novoCaractere;
                }
            }
        }
        
        senha += caractere;
        caracteresUsados.add(caractere);
    }
    
    campoSenha.value = senha;
    calcularForcaSenha(alfabeto.length);
}

function calcularForcaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log('Entropia:', entropia);
    forcaSenha.classList.remove('fraca', 'media-fraca', 'media', 'media-forte', 'forte');
    
    if (entropia > 80) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 60) {
        forcaSenha.classList.add('media-forte');
    } else if (entropia > 40) {
        forcaSenha.classList.add('media');
    } else if (entropia > 20) {
        forcaSenha.classList.add('media-fraca');
    } else {
        forcaSenha.classList.add('fraca');
    }
    
    const valorEntropia = document.querySelector('.entropia');
    let segundos = Math.pow(2, entropia) / 100e6;
    
    if (segundos > 60 * 60 * 24 * 365 * 1000000) {
        valorEntropia.textContent = "Um computador pode demorar mais que a idade do universo para encontrar sua senha.";
    } else if (segundos > 60 * 60 * 24 * 365) {
        valorEntropia.textContent = "Um computador pode demorar " + Math.floor(segundos / (60 * 60 * 24 * 365)) + " anos para encontrar sua senha.";
    } else if (segundos > 60 * 60 * 24) {
        valorEntropia.textContent = "Um computador pode demorar " + Math.floor(segundos / (60 * 60 * 24)) + " dias para encontrar sua senha.";
    } else if (segundos > 60 * 60) {
        valorEntropia.textContent = "Um computador pode demorar " + Math.floor(segundos / (60 * 60)) + " horas para encontrar sua senha.";
    } else if (segundos > 60) {
        valorEntropia.textContent = "Um computador pode demorar " + Math.floor(segundos / 60) + " minutos para encontrar sua senha.";
    } else {
        valorEntropia.textContent = "Um computador pode demorar " + Math.floor(segundos) + " segundos para encontrar sua senha.";
    }
}