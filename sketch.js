
const perfis = [
    {
        id: 1,
        nome: "Engenheiro de Sistemas",
        categoria: "Construção",
        descricao: "Transforma problemas em soluções.",
        imagem: "imagem1.jpg"
    },
    {
        id: 2,
        nome: "Investigador Científico",
        categoria: "Investigação",
        descricao: "Analisa evidências e busca descobrir como as coisas funcionam.",
        imagem: "imagem2.jpg"
    },
    {
        id: 3,
        nome: "Explorador",
        categoria: "Exploração",
        descricao: "Gosta de experimentar alternativas e lidar com situações novas.",
        imagem: "imagem3.jpg"
    },
    {
        id: 4,
        nome: "Estrategista",
        categoria: "Planejamento",
        descricao: "Coordena pessoas e decide os próximos passos.",
        imagem: "imagem4.jpg"
    }
];

function getAnswers() {

    // Dados pessoais
    const dataNascimento = document.getElementById("data").value;
    const nome = document.getElementById("nome").value;

    if (!dataNascimento || !nome.trim()) {
        alert("Preencha seu nome e sua data de nascimento!");
        return;
    }

    // Cálculo da idade
    const nascimento = new Date(dataNascimento + "T00:00:00");
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if (
        mes < 0 ||
        (mes === 0 && hoje.getDate() < nascimento.getDate())
    ) {
        idade--;
    }

    if (idade < 0) {
        alert("Informe uma data de nascimento válida!");
        return;
    }

    // Captura das respostas
    const respostas = [
        document.getElementById("pergunta1").value,
        document.getElementById("pergunta2").value,
        document.getElementById("pergunta3").value,
        document.getElementById("pergunta4").value
    ];

    // Pontuação dos perfis
    const pontuacao = [0, 0, 0, 0];

    respostas.forEach(function(resposta) {
        pontuacao[Number(resposta) - 1]++;
    });

    // Maior pontuação
    const maiorPontuacao = Math.max(...pontuacao);

    // Identifica todos os perfis vencedores
    const perfisResultado = perfis.filter(function(perfil, index) {
        return pontuacao[index] === maiorPontuacao;
    });

    // Exibe os dados pessoais
    document.getElementById("nome_resultado").textContent = nome;
    document.getElementById("idade_resultado").textContent = idade;

    // Mensagem do resultado
    const resultado = document.getElementById("resultado");

    if (perfisResultado.length === 1) {
        resultado.textContent =
            "Seu perfil predominante é: " + perfisResultado[0].nome;
    } else {
        resultado.textContent =
            "EMPATE! Você possui características de mais de um perfil.";
    }

    // Exibe informações e imagens dos perfis
    const cardsResultado = document.getElementById("cards_resultado");

    cardsResultado.innerHTML = "";

    perfisResultado.forEach(function(perfil) {

        const card = document.createElement("div");
        card.classList.add("card-perfil");

        const titulo = document.createElement("h2");
        titulo.textContent = perfil.nome;

        const categoria = document.createElement("h3");
        categoria.textContent = "Categoria: " + perfil.categoria;

        const descricao = document.createElement("p");
        descricao.textContent = perfil.descricao;

        const imagem = document.createElement("img");
        imagem.src = perfil.imagem;
        imagem.alt = perfil.nome;

        card.appendChild(titulo);
        card.appendChild(categoria);
        card.appendChild(descricao);
        card.appendChild(imagem);

        cardsResultado.appendChild(card);

    });

    // Mostra a seção de resultado
    document.getElementById("sessao-resultado").style.visibility = "visible";
}

// Reiniciar o teste
function reiniciarPagina() {
    window.location.reload();
}
