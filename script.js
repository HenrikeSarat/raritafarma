// script.js

let currentQuestion = 0;
let answers = [];
let userName = "";
let userWhatsApp = "";
let userEmail = "";
let timestamp = "";
let isBackgroundMusicPlaying = false; // Para garantir que a música de fundo toque apenas uma vez

const questions = [
    { question: "Textura da base", options: ["Serum", "Creme"] },
    { question: "Tipo de pele", options: ["Seca", "Mista", "Oleosa"] },
    { question: "Idade", options: ["18 anos", "19 a 25 anos", "26 a 39 anos", "40 a 49 anos", "50+"] },
    { question: "Sua pele é", options: ["Oleosa", "Acneica", "Rugas", "Melasma"] },
    { question: "Gênero", options: ["Homem", "Mulher"] },
    { question: "Grávida", options: ["Sim", "Não"] }
];

const productCombinations = [
    {
        conditions: ["Serum", "Seca", "18 anos", "Oleosa", "Homem", "Não"],
        product: "Produto A",
        price: "R$ 150,00"
    },
    {
        conditions: ["Creme", "Mista", "19 a 25 anos", "Acneica", "Mulher", "Sim"],
        product: "Produto B",
        price: "R$ 200,00"
    },
    {
        conditions: ["Serum", "Oleosa", "26 a 39 anos", "Rugas", "Homem", "Não"],
        product: "Produto C",
        price: "R$ 180,00"
    },
    {
        conditions: ["Creme", "Seca", "40 a 49 anos", "Melasma", "Mulher", "Não"],
        product: "Produto D",
        price: "R$ 220,00"
    },
    {
        conditions: ["Serum", "Mista", "50+", "Oleosa", "Homem", "Não"],
        product: "Produto E",
        price: "R$ 250,00"
    }
];

const totalSteps = questions.length + 6;

const clickSound = document.getElementById('clickSound');
const transitionSound = document.getElementById('transitionSound');
const welcomeSound = document.getElementById('welcomeSound');
const whatsAppInstructionSound = document.getElementById('whatsAppInstructionSound');
const greetingSound = document.getElementById('greetingSound');
const backgroundMusic = document.getElementById('backgroundMusic');

function playClickSound() {
    clickSound.play();
}

function playTransitionSound() {
    transitionSound.play();
}

function playWelcomeSound() {
    welcomeSound.play();
}

function playWhatsAppInstructionSound() {
    whatsAppInstructionSound.play();
}

function playGreetingSound() {
    greetingSound.play();
}

function playBackgroundMusic() {
    if (!isBackgroundMusicPlaying) {
        backgroundMusic.play();
        isBackgroundMusicPlaying = true;
    }
}

function stopAllSounds() {
    welcomeSound.pause();
    welcomeSound.currentTime = 0;
    whatsAppInstructionSound.pause();
    whatsAppInstructionSound.currentTime = 0;
    greetingSound.pause();
    greetingSound.currentTime = 0;
    // Não parar a música de fundo aqui
}

function updateProgressBar() {
    let completedSteps = 0;
    if (document.getElementById('startSection').classList.contains('hidden')) completedSteps++;
    if (document.getElementById('welcomeSection').classList.contains('hidden')) completedSteps++;
    if (document.getElementById('whatsAppSection').classList.contains('hidden')) completedSteps++;
    if (document.getElementById('greetingSection').classList.contains('hidden')) completedSteps++;
    completedSteps += currentQuestion;
    if (document.getElementById('confirmationSection').classList.contains('hidden')) completedSteps++;
    if (document.getElementById('finalStep').classList.contains('hidden')) completedSteps++;
    if (document.getElementById('thankYouSection').classList.contains('hidden')) completedSteps++;
    const progress = (completedSteps / totalSteps) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function goToWelcome() {
    playClickSound();
    stopAllSounds();
    document.getElementById('startSection').classList.add('hidden');
    document.getElementById('welcomeSection').classList.remove('hidden');
    updateProgressBar();
    playTransitionSound();
    playWelcomeSound();
    playBackgroundMusic();  // Iniciar a música de fundo ao ir para a página de inserção do nome
}

function goToWhatsApp() {
    playClickSound();
    userName = document.getElementById('username').value;
    if (userName.trim() === "") {
        alert("Por favor, digite seu nome.");
        return;
    }
    stopAllSounds();
    document.getElementById('welcomeSection').classList.add('hidden');
    document.getElementById('whatsAppSection').classList.remove('hidden');
    updateProgressBar();
    playTransitionSound();
    playWhatsAppInstructionSound();
    playBackgroundMusic();  // Continuar a música de fundo
}

function goToGreeting() {
    playClickSound();
    userWhatsApp = document.getElementById('whatsapp').value;
    if (userWhatsApp.trim() === "") {
        alert("Por favor, digite seu número de WhatsApp.");
        return;
    }
    stopAllSounds();
    document.getElementById('whatsAppSection').classList.add('hidden');
    document.getElementById('greetingMessage').innerText = `Olá ${userName}, seja bem-vindo(a) à RaritáFarma`;
    document.getElementById('greetingSection').classList.remove('hidden');
    updateProgressBar();
    playTransitionSound();
    playGreetingSound();
    playBackgroundMusic();  // Continuar a música de fundo
}

function goBackToWelcome() {
    playClickSound();
    stopAllSounds();
    document.getElementById('whatsAppSection').classList.add('hidden');
    document.getElementById('welcomeSection').classList.remove('hidden');
    updateProgressBar();
    playTransitionSound();
    playWelcomeSound();
    playBackgroundMusic();  // Continuar a música de fundo
}

function goBackToWhatsApp() {
    playClickSound();
    stopAllSounds();
    document.getElementById('greetingSection').classList.add('hidden');
    document.getElementById('whatsAppSection').classList.remove('hidden');
    updateProgressBar();
    playTransitionSound();
    playWhatsAppInstructionSound();
    playBackgroundMusic();  // Continuar a música de fundo
}

function startQuestionnaire() {
    playClickSound();
    stopAllSounds();
    document.getElementById('greetingSection').classList.add('hidden');
    document.getElementById('questionnaire').classList.remove('hidden');
    showQuestion();
    updateProgressBar();
    playTransitionSound();
    playBackgroundMusic();  // Continuar a música de fundo
}

function showQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = `
        <h2>${questions[currentQuestion].question}</h2>
        <div class="button-group">
            ${questions[currentQuestion].options.map(option => `
                <button class="btn" onclick="selectOption('${option}')">${option}</button>
            `).join('')}
        </div>
    `;
}

function selectOption(option) {
    answers[currentQuestion] = option;
    nextQuestion();
}

function nextQuestion() {
    playClickSound();
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
        updateProgressBar();
        playTransitionSound();
        playBackgroundMusic();  // Continuar a música de fundo
    } else {
        stopAllSounds();
        document.getElementById('questionnaire').classList.add('hidden');
        document.getElementById('confirmationSection').classList.remove('hidden');
        showReview();
        updateProgressBar();
        playTransitionSound();
        playBackgroundMusic();  // Continuar a música de fundo
    }
}

function previousQuestion() {
    playClickSound();
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        updateProgressBar();
        playTransitionSound();
        playBackgroundMusic();  // Continuar a música de fundo
    }
}

function showReview() {
    const answersReview = document.getElementById('answersReview');
    answersReview.innerHTML = answers.map((answer, index) => `
        <div class="review-item">
            <strong>${questions[index].question}:</strong> ${answer}
        </div>
    `).join('');
}

function submitFinal() {
    playClickSound();
    stopAllSounds();
    document.getElementById('confirmationSection').classList.add('hidden');
    document.getElementById('finalStep').classList.remove('hidden');
    showProductResult(); // Mostrar o produto e valor baseados nas respostas
    updateProgressBar();
    playTransitionSound();
}

function showProductResult() {
    const productResult = document.getElementById('productResult');
    const matchingProduct = productCombinations.find(combination => 
        combination.conditions.every((condition, index) => condition === answers[index])
    );

    if (matchingProduct) {
        productResult.innerHTML = `
            <h2>Produto Recomendado</h2>
            <p><strong>Produto:</strong> ${matchingProduct.product}</p>
            <p><strong>Preço:</strong> ${matchingProduct.price}</p>
        `;
    } else {
        productResult.innerHTML = `
            <h2>Produto Recomendado</h2>
            <p>Não encontramos um produto específico para suas respostas. Por favor, consulte um especialista.</p>
        `;
    }
}

function formatDateToBrazilian(date) {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function validateEmail() {
    userEmail = document.getElementById('email').value;
    if (userEmail.trim() === "") {
        alert("Por favor, digite seu email.");
        return false;
    }
    const now = new Date();
    timestamp = formatDateToBrazilian(now);
    return true;
}

function goToThankYouPage() {
    playClickSound();
    stopAllSounds();
    document.getElementById('finalStep').classList.add('hidden');
    document.getElementById('thankYouSection').classList.remove('hidden');
    updateProgressBar();
    playTransitionSound();
}

function generatePDF() {
    if (!validateEmail()) return;

    playClickSound();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("RaritáFarma - Dados do Cliente", 10, 10);
    doc.text(`Nome: ${userName}`, 10, 20);
    doc.text(`WhatsApp: ${userWhatsApp}`, 10, 30);
    doc.text(`Email: ${userEmail}`, 10, 40);
    doc.text(`Data e Hora: ${timestamp}`, 10, 50);
    answers.forEach((answer, index) => {
        doc.text(`${questions[index].question}: ${answer}`, 10, 60 + (index * 10));
    });
    const productResult = document.getElementById('productResult').innerText;
    doc.text(productResult, 10, 60 + (answers.length * 10));
    doc.save("dados_cliente.pdf");

    goToThankYouPage();
}

function sendToWhatsApp() {
    if (!validateEmail()) return;

    playClickSound();
    const message = `Nome: ${userName}\nWhatsApp: ${userWhatsApp}\nEmail: ${userEmail}\nData e Hora: ${timestamp}\n${answers.map((answer, index) => `
${questions[index].question}: ${answer}
`).join('\n')}`;
    const productResult = document.getElementById('productResult').innerText;
    const fullMessage = `${message}\n${productResult}`;
    const url = `https://api.whatsapp.com/send?phone=5544991381532&text=${encodeURIComponent(fullMessage)}`;
    window.open(url, '_blank');

    goToThankYouPage();
}

function sendEmail() {
    if (!validateEmail()) return;

    playClickSound();
    const subject = "RaritáFarma - Dados do Cliente";
    const body = `Nome: ${userName}\nWhatsApp: ${userWhatsApp}\nEmail: ${userEmail}\nData e Hora: ${timestamp}\n${answers.map((answer, index) => `
${questions[index].question}: ${answer}
`).join('\n')}`;
    const productResult = document.getElementById('productResult').innerText;
    const fullBody = `${body}\n${productResult}`;
    const mailtoLink = `mailto:YOUR_EMAIL_ADDRESS?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
    window.location.href = mailtoLink;

    goToThankYouPage();
}

function printDocument() {
    if (!validateEmail()) return;

    playClickSound();

    const printContent = `
        <h2>RaritáFarma - Dados do Cliente</h2>
        <p><strong>Nome:</strong> ${userName}</p>
        <p><strong>WhatsApp:</strong> ${userWhatsApp}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Data e Hora:</strong> ${timestamp}</p>
        ${answers.map((answer, index) => `
            <p><strong>${questions[index].question}:</strong> ${answer}</p>
        `).join('')}
        <p>${document.getElementById('productResult').innerHTML}</p>
    `;

    const newWindow = window.open('', '', 'height=600,width=800');
    newWindow.document.write('<html><head><title>Imprimir Dados do Cliente</title>');
    newWindow.document.write('</head><body>');
    newWindow.document.write(printContent);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();

    goToThankYouPage();
}

function resetSystem() {
    playClickSound();
    currentQuestion = 0;
    answers = [];
    userName = "";
    userWhatsApp = "";
    userEmail = "";
    timestamp = "";

    // Limpar campos de entrada
    document.getElementById('username').value = "";
    document.getElementById('whatsapp').value = "";
    document.getElementById('email').value = "";

    document.getElementById('startSection').classList.remove('hidden');
    document.getElementById('welcomeSection').classList.add('hidden');
    document.getElementById('whatsAppSection').classList.add('hidden');
    document.getElementById('greetingSection').classList.add('hidden');
    document.getElementById('questionnaire').classList.add('hidden');
    document.getElementById('confirmationSection').classList.add('hidden');
    document.getElementById('finalStep').classList.add('hidden');
    document.getElementById('thankYouSection').classList.add('hidden');
    updateProgressBar();

    // Parar a música de fundo
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    isBackgroundMusicPlaying = false;
}

// Impede o envio do formulário ao pressionar os botões
document.getElementById('questionnaire').addEventListener('submit', function(event) {
    event.preventDefault();
});
