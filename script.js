document.addEventListener('DOMContentLoaded', () => {
  // 1. MENU MOBILE
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
  });

  // 2. NAVEGAÇÃO ENTRE JOGOS (ABAS)
  const tabQuiz = document.getElementById('tabQuiz');
  const tabPhishing = document.getElementById('tabPhishing');
  const gameQuiz = document.getElementById('gameQuiz');
  const gamePhishing = document.getElementById('gamePhishing');

  tabQuiz.addEventListener('click', () => {
    tabQuiz.classList.add('active');
    tabPhishing.classList.remove('active');
    gameQuiz.classList.remove('hidden');
    gamePhishing.classList.add('hidden');
  });

  tabPhishing.addEventListener('click', () => {
    tabPhishing.classList.add('active');
    tabQuiz.classList.remove('active');
    gamePhishing.classList.remove('hidden');
    gameQuiz.classList.add('hidden');
  });

  // 3. JOGO 1: QUIZ INTERATIVO
  const quizData = [
    {
      question: "O que caracteriza o golpe de Phishing?",
      options: [
        "Acelerar o desempenho do computador",
        "Mensagens falsas para enganar o usuário e roubar dados",
        "Um antivírus gratuito e seguro",
        "Atualização automática de programas"
      ],
      correct: 1
    },
    {
      question: "Qual destas é considerada uma senha forte?",
      options: [
        "12345678",
        "nome123",
        "P@ssw0rd2026!#",
        "data de nascimento"
      ],
      correct: 2
    },
    {
      question: "Para que serve a Autenticação em Dois Fatores (2FA)?",
      options: [
        "Duplicar a velocidade da internet",
        "Exigir uma segunda confirmação além da senha para fazer login",
        "Salvar arquivos automaticamente em dois computadores",
        "Impedir o recebimento de e-mails"
      ],
      correct: 1
    },
    {
      question: "O que você deve fazer ao receber um link suspeito com uma grande oferta?",
      options: [
        "Clicar imediatamente para não perder a promoção",
        "Encaminhar para todos os amigos",
        "Desconfiar, não clicar e verificar nos canais oficiais da loja",
        "Preencher o cadastro com seus dados bancários"
      ],
      correct: 2
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const questionTitle = document.getElementById('questionTitle');
  const quizOptions = document.getElementById('quizOptions');
  const btnNext = document.getElementById('btnNext');
  const quizBox = document.getElementById('quizBox');
  const quizResult = document.getElementById('quizResult');
  const scoreText = document.getElementById('scoreText');
  const btnRestart = document.getElementById('btnRestart');

  function loadQuiz() {
    const q = quizData[currentQuestion];
    questionTitle.textContent = `${currentQuestion + 1}. ${q.question}`;
    quizOptions.innerHTML = '';
    btnNext.classList.add('hidden');

    q.options.forEach((opt, index) => {
      const button = document.createElement('button');
      button.classList.add('option-btn');
      button.textContent = opt;
      button.addEventListener('click', () => selectAnswer(index, q.correct));
      quizOptions.appendChild(button);
    });
  }

  function selectAnswer(selectedIndex, correctIndex) {
    const buttons = quizOptions.querySelectorAll('.option-btn');
    buttons.forEach((btn, index) => {
      btn.disabled = true;
      if (index === correctIndex) btn.classList.add('correct');
      if (index === selectedIndex && selectedIndex !== correctIndex) btn.classList.add('wrong');
    });

    if (selectedIndex === correctIndex) score++;
    btnNext.classList.remove('hidden');
  }

  btnNext.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuiz();
    } else {
      quizBox.classList.add('hidden');
      quizResult.classList.remove('hidden');
      scoreText.textContent = `Você acertou ${score} de ${quizData.length} perguntas!`;
    }
  });

  btnRestart.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizResult.classList.add('hidden');
    quizBox.classList.remove('hidden');
    loadQuiz();
  });

  loadQuiz();

  // 4. JOGO 2: DETECTIVE DE PHISHING
  const phishingData = [
    {
      sender: "seguranca@banc0-oficial.com.br",
      message: "URGENTE: Sua conta será bloqueada em 2 horas! Clique no link para atualizar seus dados bancários: http://bit.ly/bloqueio-conta",
      isFake: true,
      explanation: "É GOLPE! O remetente usa números no lugar de letras ('banc0') e há um senso de urgência falso acompanhado de link suspeito."
    },
    {
      sender: "no-reply@sua-loja-favorita.com.br",
      message: "Seu pedido #45892 foi enviado! Acompanhe a entrega pelo nosso aplicativo oficial ou pelo painel do cliente no nosso site.",
      isFake: false,
      explanation: "É LEGÍTIMO! A mensagem apenas informa sobre o envio e não pede senhas ou dados confidenciais diretamente."
    },
    {
      sender: "atendimento@whatsapp-suporte-br.xyz",
      message: "Você ganhou um cupom de R$ 500! Encaminhe esta mensagem para 10 contatos para liberar o resgate.",
      isFake: true,
      explanation: "É GOLPE! O domínio '.xyz' é suspeito e a exigência de compartilhar para ganhar prêmios é uma tática comum de phishing."
    }
  ];

  let currentPhishing = 0;
  let phishingScore = 0;

  const phishingSender = document.getElementById('phishingSender');
  const phishingMessage = document.getElementById('phishingMessage');
  const phishingFeedback = document.getElementById('phishingFeedback');
  const btnReal = document.getElementById('btnReal');
  const btnFake = document.getElementById('btnFake');
  const btnNextPhishing = document.getElementById('btnNextPhishing');
  const phishingBox = document.getElementById('phishingBox');
  const phishingResult = document.getElementById('phishingResult');
  const phishingScoreText = document.getElementById('phishingScoreText');
  const btnRestartPhishing = document.getElementById('btnRestartPhishing');

  function loadPhishing() {
    const item = phishingData[currentPhishing];
    phishingSender.textContent = `Remetente: ${item.sender}`;
    phishingMessage.textContent = `"${item.message}"`;
    phishingFeedback.textContent = '';
    btnReal.disabled = false;
    btnFake.disabled = false;
    btnNextPhishing.classList.add('hidden');
  }

  function evaluatePhishing(userChoiceIsFake) {
    const item = phishingData[currentPhishing];
    btnReal.disabled = true;
    btnFake.disabled = true;

    if (userChoiceIsFake === item.isFake) {
      phishingScore++;
      phishingFeedback.textContent = `Correcto! ${item.explanation}`;
      phishingFeedback.style.color = 'var(--success)';
    } else {
      phishingFeedback.textContent = `Incorreto. ${item.explanation}`;
      phishingFeedback.style.color = 'var(--danger)';
    }

    btnNextPhishing.classList.remove('hidden');
  }

  btnReal.addEventListener('click', () => evaluatePhishing(false));
  btnFake.addEventListener('click', () => evaluatePhishing(true));

  btnNextPhishing.addEventListener('click', () => {
    currentPhishing++;
    if (currentPhishing < phishingData.length) {
      loadPhishing();
    } else {
      phishingBox.classList.add('hidden');
      phishingResult.classList.remove('hidden');
      phishingScoreText.textContent = `Você acertou ${phishingScore} de ${phishingData.length} análises!`;
    }
  });

  btnRestartPhishing.addEventListener('click', () => {
    currentPhishing = 0;
    phishingScore = 0;
    phishingResult.classList.add('hidden');
    phishingBox.classList.remove('hidden');
    loadPhishing();
  });

  loadPhishing();

  // 5. CHECKLIST DE HÁBITOS
  const checkboxes = document.querySelectorAll('.chk-item');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');

  function updateChecklistProgress() {
    const total = checkboxes.length;
    let checkedCount = 0;
    checkboxes.forEach(chk => { if (chk.checked) checkedCount++; });

    const percentage = Math.round((checkedCount / total) * 100);
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}% dos hábitos adotados`;
  }

  checkboxes.forEach(chk => chk.addEventListener('change', updateChecklistProgress));
});
