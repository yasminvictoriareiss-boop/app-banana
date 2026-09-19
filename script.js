// --- 1. CANVAS INTERATIVO DE EMOJIS DE BANANA 🍌 ---
const canvas = document.getElementById('bananaCanvas');
const ctx = canvas.getContext('2d');

let bananas = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class BananaEmoji {
    constructor(x, y, burst = false) {
        this.x = x;
        this.y = y;
        // Tamanho do emoji de banana
        this.size = burst ? Math.random() * 20 + 25 : Math.random() * 15 + 18;
        
        // Movimento
        if (burst) {
            // Explosão em todas as direções (ao clicar)
            this.speedX = (Math.random() - 0.5) * 12;
            this.speedY = (Math.random() - 0.5) * 12 - 4;
        } else {
            // Flutuar suavemente para os lados e cair (ao mexer o rato)
            this.speedX = (Math.random() - 0.5) * 4;
            this.speedY = Math.random() * 3 + 1;
        }

        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.1;
        this.life = 1.0;
        this.decay = Math.random() * 0.015 + 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotSpeed;
        this.life -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = Math.max(0, this.life);
        
        // Renderiza o emoji da banana 🍌
        ctx.font = `${this.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🍌', 0, 0);

        ctx.restore();
    }
}

function handleBananas() {
    for (let i = 0; i < bananas.length; i++) {
        bananas[i].update();
        bananas[i].draw();
        if (bananas[i].life <= 0) {
            bananas.splice(i, 1);
            i--;
        }
    }
}

// Lançar explosão de bananas ao clicar na página
window.addEventListener('click', (e) => {
    lançarExplosaoBananas(e.clientX, e.clientY, 12);
});

function lançarExplosaoBananas(x, y, quantidade = 15) {
    for (let i = 0; i < quantidade; i++) {
        bananas.push(new BananaEmoji(x, y, true));
    }
}

// --- 2. LÓGICA DO MINION BOB QUE SEGUE O CURSOR ---
const follower = document.getElementById('minionFollower');
const pupilL = document.getElementById('pupilL');
const pupilR = document.getElementById('pupilR');
const speech = document.getElementById('minionSpeech');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let minionX = mouseX;
let minionY = mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Criar emojis de banana a soltar do cursor ao mover o rato
    if (Math.random() > 0.3) {
        bananas.push(new BananaEmoji(e.clientX, e.clientY));
    }

    // Calcular rotação das pupilas dos olhos
    const eyeOffsetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2) * 5;
    const eyeOffsetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2) * 5;

    pupilL.style.transform = `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`;
    pupilR.style.transform = `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`;
});

function animateScene() {
    // Posição suave do Minion
    minionX += (mouseX - minionX - 55) * 0.08;
    minionY += (mouseY - minionY - 75) * 0.08;

    follower.style.transform = `translate3d(${minionX}px, ${minionY}px, 0)`;

    // Renderizar bananas caindo no canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBananas();

    requestAnimationFrame(animateScene);
}
animateScene();

// --- 3. LÓGICA DO FORMULÁRIO ---
const minionForm = document.getElementById('minionForm');

minionForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const idade = parseInt(document.getElementById('idade').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Chuva extra de bananas ao submeter!
    lançarExplosaoBananas(window.innerWidth / 2, window.innerHeight / 2, 35);

    // Validação de Aptidão - outra altração
    const eApto = (altura >= 1.70) && (idade >= 18);

    if (eApto) {
        speech.innerText = "BELLO! BANANA! 🎉🍌";
        exibirResultado({
            status: 'aprovado',
            carimbo: '✅ ACEITO NO GRUPO',
            nome: nome,
            mensagem: `Bello! Cumpres os requisitos. Prepara o fato e vem comer muitas Bananas!`
        });
    } else {
        speech.innerText = "POOPAYE! MUITO PEQUENO! 🍌";
        exibirResultado({
            status: 'reprovado',
            carimbo: '❌ NÃO ELEGÍVEL',
            nome: nome,
            mensagem: `Tulaliloo ti amo, mas não cumpres a altura mínima de 1.70m ou idade de 18 anos.`
        });
    }
});

function exibirResultado({ status, carimbo, nome, mensagem }) {
    const overlay = document.getElementById('modalOverlay');
    const card = document.getElementById('modalCard');
    const stamp = document.getElementById('statusStamp');
    const nameEl = document.getElementById('candidateName');
    const msgEl = document.getElementById('resMsg');

    card.className = `modal-card ${status}`;
    stamp.innerText = carimbo;
    nameEl.innerText = nome;
    msgEl.innerText = mensagem;

    overlay.classList.add('active');
}

function fecharModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    speech.innerText = "BANANA! 🍌";
}

document.getElementById('modalOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
        fecharModal();
    }
});