
document.addEventListener("DOMContentLoaded", function () {
  // Elementos do jogo.
  const questionElement = document.getElementById('question');
  const answersContainer = document.getElementById('answers');
  const resultElement = document.getElementById('result');
  const returnButton = document.getElementById('returnBtn');
  // Variáveis do jogo.
  let questions = [];
  let currentQuestionIndex = 0;
  let totalPoints = 0;

  // Inicia o jogo.
  function startGame() {
    currentQuestionIndex = 0;
    totalPoints = 0;
    resultElement.innerText = '';
    setNextQuestion();
  }

  // Define a próxima pergunta.
  function setNextQuestion() {
    if (currentQuestionIndex < questions.length) {
      resetState();
      showQuestion(questions[currentQuestionIndex]);
    } else {
      console.log('Quiz concluído!');
      determineProfile(totalPoints);
      answersContainer.innerHTML = '';
      questionElement.innerText = '';
      resultElement.style.display = 'block';
      resultElement.innerHTML = determineProfile(totalPoints);
      returnButton.classList.remove('none');
    }
  }

  // Mostra a pergunta e as alternativas.
  function showQuestion(question) {
    const { id, question: text, answers } = question;

    questionElement.classList.add('transition-question');

    setTimeout(() => {
      questionElement.innerText = `${id} - ${text}`;
      answers.forEach(answer => {
        const { answer: text, points } = answer;
        const answerButton = document.createElement('button');
        answerButton.innerText = text;
        answerButton.classList.add('answer');
        answerButton.addEventListener('click', () => selectAnswer(points));
        answersContainer.appendChild(answerButton);
      });

      questionElement.classList.remove('transition-question');
    }, 500);
  }
  // Limpa o estado anterior.
  function resetState() {
    answersContainer.innerHTML = '';
  }

  // Seleciona a resposta.
  function selectAnswer(points) {
    totalPoints += points;
    currentQuestionIndex++;
    setNextQuestion();
  }

  // Determina o perfil do investidor
  function determineProfile(points) {
    let profileText = '';
    if (points <= 110) {
      profileText = 'Seu perfil é <u>Super Conservador</u>.';
    } else if (points <= 210) {
      profileText = 'Seu perfil é <u>Conservador</u>.';
    } else if (points <= 310) {
      profileText = 'Seu perfil é <u>Moderado</u>.';
    } else {
      profileText = 'Seu perfil é <u>Agressivo</u>.';
    }
    return profileText;
  }



  // Perguntas e respostas
  const data = {
    "questions": [
      {
        "id": 1,
        "question": "Você acompanha as informações do mercado financeiro?",
        "answers": [
          {
            "answer": "Não acompanho.",
            "points": 10
          },
          {
            "answer": "Acompanho apenas as notícias mais comentadas em jornais e revistas, sem regularidade",
            "points": 30
          },
          {
            "answer": "Sim, acompanho regularmente por meios de comunicação especializados (plataformas digitais, mídias etc.)",
            "points": 50
          }
        ]
      },
      {
        "id": 2,
        "question": "Como você classifica sua experiência com investimentos?",
        "answers": [
          {
            "answer": "Nenhum: Não conheço e nunca investi no Mercado Financeiro.",
            "points": 10
          },
          {
            "answer": "Básico: Pois acompanho esporadicamente o mercado, e me sinto desconfortável para tomar decisões sem aconselhamento profissional. Exemplos: Poupança, CDBs e outros produtos bancários de Renda Fixa.",
            "points": 30
          },
          {
            "answer": "Suficiente: Invisto e tenho conhecimento pleno sobre os produtos oferecidos da Instituição e do Mercado Financeiro. Exemplos: Ações e Produtos Estruturados.",
            "points": 50
          }
        ]
      },
      {
        "id": 3,
        "question": "Quando você pensa em investir seu dinheiro, o que é mais importante para você?",
        "answers": [
          {
            "answer": "Tranquilidade. Saber que meu dinheiro está rendendo, mesmo que pouco, mas que não tenho perdas.",
            "points": 10
          },
          {
            "answer": "Equilíbrio. Saber que meu dinheiro está investido e os ganhos e perdas estão nivelados no curto prazo.",
            "points": 30
          },
          {
            "answer": "Rentabilidade. Assumir riscos para ter altos ganhos.",
            "points": 50
          }
        ]
      },
      {
        "id": 4,
        "question": "Qual a alternativa melhor descreve o seu comportamento em relação ao risco de perda na sua aposentadoria",
        "answers": [
          {
            "answer": "Não quero perdas, mesmo que ocasionais, e aceito que minha rentabilidade poderá ser menor.",
            "points": 10
          },
          {
            "answer": "Posso aceitar perdas ocasionais em busca de retornos maiores no médio prazo, desde que sejam pequenas parcelas do total.",
            "points": 30
          },
          {
            "answer": "Posso aceitar perdas ocasionais em busca de retornos muito elevados no longo prazo, mesmo que eventualmente implique em perdas significativas do total investido.",
            "points": 50
          }
        ]
      },
      {
        "id": 5,
        "question": "Como você reagiria se os seus investimentos apresentassem perda (mesmo que temporariamente)?",
        "answers": [
          {
            "answer": "Não sei responder essa questão.",
            "points": 10
          },
          {
            "answer": "Na próxima oportunidade trocaria de perfil de Investimento.",
            "points": 20
          },
          {
            "answer": "Entendo que isso pode acontecer em determinados momentos, mas ficaria no mesmo perfil.",
            "points": 40
          },
          {
            "answer": "Ficaria no mesmo perfil, pois entendo que o perfil de investimentos está sujeito a variações na rentabilidade no curto prazo.",
            "points": 50
          }
        ]
      },
      {
        "id": 6,
        "question": "Você acredita que, em períodos de mais de cinco anos, produtos de maior risco (exemplo ações) são mais atrativos do que produtos de menor risco?",
        "answers": [
          {
            "answer": "Não faço idéia",
            "points": 10
          },
          {
            "answer": "Não tenho esta expectativa",
            "points": 20
          },
          {
            "answer": "Tenho esta expectativa",
            "points": 40
          },
          {
            "answer": "Tenho certeza",
            "points": 50
          }
        ]
      },
      {
        "id": 7,
        "question": "Quando você pretende utilizar estes recursos de sua aposentadoria?",
        "answers": [
          {
            "answer": "Já sou aposentado, e estou utilizando meus recursos.",
            "points": 10
          },
          {
            "answer": "Pretendo utilizar um percentual relevante dos meus investimentos no curto prazo (até 1 ano)",
            "points": 20
          },
          {
            "answer": "Pretendo utilizar um percentual relevante dos meus investimentos entre 1 e 5 anos",
            "points": 30
          },
          {
            "answer": "Pretendo utilizar um percentual relevante dos meus investimentos entre 5 e 10 anos",
            "points": 40
          },
          {
            "answer": "Sim, pretendo utilizar um percentual relevante dos meus investimentos entre 10 e 20 anos",
            "points": 50
          }
        ]
      },
      {
        "id": 8,
        "question": "Expectativa dos investimentos.",
        "answers": [
          {
            "answer": "Não estou disposto a sofrer flutuações negativas nos meus investimentos, mesmo em períodos curtos (1 mês).",
            "points": 10
          },
          {
            "answer": "Com a expectativa de superar o CDI, admito flutuações negativas do meu saldo no curto prazo.",
            "points": 20
          },
          {
            "answer": "Com a expectativa de superar o CDI, admito flutuações negativas dos meus investimentos no curto prazo; porém, entendo que devem ser recuperadas em até 6 meses.",
            "points": 30
          },
          {
            "answer": "Com a expectativa de superar de forma significativa o CDI, admito flutuações negativas dos meus investimentos; porém, entendo que devem ser recuperadas em até 12 meses.",
            "points": 40
          },
          {
            "answer": "Busco retornos absolutos e admito flutuações negativas dos meus investimentos em períodos superiores a 12 meses.",
            "points": 50
          }
        ]
      }
    ]
  };

  // Inicia o jogo.
  if (Array.isArray(data.questions)) {
    questions = [...data.questions];
    startGame();
  } else {
    console.error('Os dados não são uma matriz:', data);
  }
});
