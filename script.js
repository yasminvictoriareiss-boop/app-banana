function verificarElegibilidade() {
    // Obtém os valores inseridos nos campos do formulário
    const nome = document.getElementById('nome').value.trim();
    const idade = parseInt(document.getElementById('idade').value);
    const altura = parseFloat(document.getElementById('altura').value);
    
    // Elemento onde será exibido o resultado
    const divResultado = document.getElementById('resultado');

    // Limpa classes anteriores de resultado
    divResultado.className = 'resultado';

    // Validação básica se os campos foram preenchidos corretamente
    if (!nome || isNaN(idade) || isNaN(altura)) {
        divResultado.innerText = "Por favor, preencha todos os campos corretamente.";
        divResultado.classList.add('erro');
        return;
    }

    // Aplicação da regra de negócio:
    // Altura precisa ser maior ou igual a 1.70 M E idade maior ou igual a 18 ANOS
    if (altura >= 1.70 && idade >= 18) {
        divResultado.innerText = `${nome}, parabéns! Você pode prosseguir no processo para a vaga!`;
        divResultado.classList.add('sucesso');
    } else {
        divResultado.innerText = `${nome}, infelizmente você não é apto à vaga.`;
        divResultado.classList.add('erro');
    }
}