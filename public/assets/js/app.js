
document.addEventListener("DOMContentLoaded", function () {
    const questionElement = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const resultElement = document.getElementById('result');
    const termometroElement = document.getElementById('img-termometro');
    const womanElement = document.getElementById('img-woman');
    const womanAnswer = document.getElementById('img-woman-answer')
    const btnPrevious = document.getElementById('btn-previous');
    const btnNext = document.getElementById('btn-next');
    const btnReturn = document.getElementById('btn-return');


    let questions = [];
    let currentQuestionIndex = 0;
    let totalPoints = 0;
    const selectedAnswerPoints = [];


    function goToNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            setNextQuestion();
        }
    }

    btnNext.addEventListener('click', handleButtonNext);

    btnPrevious.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            setNextQuestion();
        }
    });


    function startGame() {
        currentQuestionIndex = 0;
        totalPoints = 0;
        resultElement.innerText = '';
        btnReturn.classList.add('d-none');
        setNextQuestion();
    }
    function setNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            resetState();
            showQuestion(questions[currentQuestionIndex]);
        } else {
            determineProfile(totalPoints);
            answersContainer.style.display = 'none';
            questionElement.innerText = '';
            termometroElement.classList.add('d-none');
            womanElement.classList.remove('d-none');
            womanAnswer.classList.add('d-none');
            resultElement.style.display = 'block';
            if (currentQuestionIndex === questions.length) {
                resultElement.innerHTML = determineProfile(totalPoints);
            }
        }
    }

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
                answerButton.setAttribute('data-points', points);
                answerButton.addEventListener('click', () => selectAnswer(points, answerButton));
                answersContainer.appendChild(answerButton);

                if (selectedAnswerPoints[currentQuestionIndex] === points) {
                    answerButton.classList.add('selected');
                }
            });
            questionElement.classList.remove('transition-question');
        }, 500);
    }

    function handleButtonNext() {
        if (currentQuestionIndex < questions.length) {
            const selectedAnswerButtons = document.querySelectorAll('.answer.selected');
            if (selectedAnswerButtons.length > 0) {
                const points = parseInt(selectedAnswerButtons[0].getAttribute('data-points'));
                selectedAnswerPoints[currentQuestionIndex] = points;

                if (currentQuestionIndex === questions.length - 1) {
                    const allQuestionsAnswered = selectedAnswerPoints.every(points => typeof points === 'number');
                    if (allQuestionsAnswered) {
                        const totalPoints = selectedAnswerPoints.reduce((acc, points) => acc + points, 0);
                        const profileText = determineProfile(totalPoints);
                        answersContainer.innerHTML = '';
                        questionElement.innerText = '';
                        questionElement.classList.add('d-none');
                        womanElement.classList.remove('d-none');
                        womanAnswer.classList.add('d-none');
                        resultElement.style.display = 'block';
                        resultElement.innerHTML = profileText;
                    } else {
                        alert("Por favor, responda todas as perguntas antes de avançar para o resultado.");
                    }
                } else {
                    goToNextQuestion();
                }
            } else {
                alert("Por favor, selecione uma resposta antes de avançar.");
            }
        }
    }

    function resetState() {
        answersContainer.innerHTML = '';
    }

    function selectAnswer(points, selectedButton) {
        const answerButtons = document.querySelectorAll('.answer');
        answerButtons.forEach(button => button.classList.remove('selected'));
        selectedButton.classList.add('selected');
        selectedAnswerPoints[currentQuestionIndex] = points;
    }
    // Determina o perfil do investidor
    function determineProfile(points) {
        let profileText = '';
        if (points <= 110) {
            profileText = '<p class="profile-text">Seu perfil é </p><p><span style="font-size: 40px; font-weight: bolder; text-decoration: underline; font-family: \'Vonique 43\', sans-serif;">Super Conservador</span> <br>É composto por ativos com baixo risco com foco na preservação de capital. É recomendado para os participantes que possuem aversão a riscos e que estejam próximos à aposentadoria ou já em recebimento de benefício. No Ciclo de Vida, estão enquadradas neste perfil as pessoas acima de 60 anos de idade.</p><p>A Néos também oferece o perfil de Ciclo de Vida, composto pelos perfis Super Conservador, Conservador, Moderado e Agressivo. Nesta opção, a mudança do perfil fica condicionada a Fase de vida do participante, ou seja, conforme a idade do participante será definido o perfil de investimentos mais adequado de acordo com o ciclo de vida. Cabe ressaltar que o Participante/Assistido que optar pelo Ciclo de Vida autoriza a Entidade a ajustar o seu perfil de acordo com a sua idade e ciclo de vida.</p><p>Na Néos, a mudança do seu Perfil de Investimento é permitida a qualquer tempo, desde que respeitado o intervalo de 6 meses entre elas.</p>';
        } else if (points <= 210) {
            profileText = '<p class="profile-text">Seu perfil é</p><p><span style="font-size: 40px; font-weight: bolder; text-decoration: underline; font-family: \'Vonique 43\', sans-serif;">Conservador:</span><br>Sua composição apresenta um grau de risco um pouco superior ao Superconservador. O foco é a preservação de capital, porém com uma relação risco x retorno entre superconservador e moderado. Tem 90% de seus recursos alocados em ativos defensivos, tais como: renda fixa, renda fixa no exterior, multimercados com baixa volatilidade. E os 10% restantes alocados em ativos dinâmicos, tais como: FIP, imobiliários, multimercado estruturados, renda variável local e no exterior. Recomendado para aqueles participantes que aceitam correr um pouco mais de risco para ter um retorno melhor que o taxa de juros livre de risco ou/e que estão se aproximando da idade para se aposentar. No Ciclo de Vida, estão enquadradas neste perfil as pessoas até 60 anos de idade.</p><p>A Néos também oferece o perfil de Ciclo de Vida, composto pelos perfis Super Conservador, Conservador, Moderado e Agressivo. Nesta opção, a mudança do perfil fica condicionada a Fase de vida do participante, ou seja, conforme a idade do participante será definido o perfil de investimentos mais adequado de acordo com o ciclo de vida. Cabe ressaltar que o Participante/Assistido que optar pelo Ciclo de Vida autoriza a Entidade a ajustar o seu perfil de acordo com a sua idade e ciclo de vida.</p><p>Na Néos, a mudança do seu Perfil de Investimento é permitida a qualquer tempo, desde que respeitado o intervalo de 6 meses entre elas.</p>';
        } else if (points <= 310) {
            profileText = '<p class="profile-text">Seu perfil é</p><p><span style="font-size: 40px; font-weight: bolder; text-decoration: underline; font-family: \'Vonique 43\', sans-serif;">Moderado:</span><br>Sua composição apresenta um grau de risco um pouco superior ao Superconservador. O foco é a preservação de capital, porém com uma relação risco x retorno entre superconservador e moderado. Tem 90% de seus recursos alocados em ativos defensivos, tais como: renda fixa, renda fixa no exterior, multimercados com baixa volatilidade. E os 10% restantes alocados em ativos dinâmicos, tais como: FIP, imobiliários, multimercado estruturados, renda variável local e no exterior. Recomendado para aqueles participantes que aceitam correr um pouco mais de risco para ter um retorno melhor que o taxa de juros livre de risco ou/e que estão se aproximando da idade para se aposentar. No Ciclo de Vida, estão enquadradas neste perfil as pessoas até 60 anos de idade.</p><p>A Néos também oferece o perfil de Ciclo de Vida, composto pelos perfis Super Conservador, Conservador, Moderado e Agressivo. Nesta opção, a mudança do perfil fica condicionada a Fase de vida do participante, ou seja, conforme a idade do participante será definido o perfil de investimentos mais adequado de acordo com o ciclo de vida. Cabe ressaltar que o Participante/Assistido que optar pelo Ciclo de Vida autoriza a Entidade a ajustar o seu perfil de acordo com a sua idade e ciclo de vida.</p><p>Na Néos, a mudança do seu Perfil de Investimento é permitida a qualquer tempo, desde que respeitado o intervalo de 6 meses entre elas.</p>';
        } else {
            profileText = '<p class="profile-text">Seu perfil é</p><p><span style="font-size: 25px; font-weight: bolder; text-decoration: underline; font-family: \'Vonique 43\', sans-serif;">Agressivo:</span><br>Sua composição apresenta uma relação risco x retorno mais arrojada. O foco é a acumulação de capital. Tem 50% de seus recursos alocados em ativos defensivos, tais como: renda fixa, renda fixa no exterior, multimercados com baixa volatilidade. E os 50% restantes alocados em ativos dinâmicos, tais como: FIP, imobiliários, multimercado estruturados, renda variável local e no exterior. Recomendado para aqueles participantes ou assistidos que são tolerantes ao risco e aceitam correr risco em busca de maiores retornos. No Ciclo de Vida, estão enquadradas neste perfil as pessoas até 50 anos de idade.</p><p>A Néos também oferece o perfil de Ciclo de Vida, composto pelos perfis Super Conservador, Conservador, Moderado e Agressivo. Nesta opção, a mudança do perfil fica condicionada a Fase de vida do participante, ou seja, conforme a idade do participante será definido o perfil de investimentos mais adequado de acordo com o ciclo de vida. Cabe ressaltar que o Participante/Assistido que optar pelo Ciclo de Vida autoriza a Entidade a ajustar o seu perfil de acordo com a sua idade e ciclo de vida.</p><p>Na Néos, a mudança do seu Perfil de Investimento é permitida a qualquer tempo, desde que respeitado o intervalo de 6 meses entre elas.</p>';
        }
        btnReturn.classList.remove('d-none');
        btnNext.classList.add('d-none');
        btnPrevious.classList.add('d-none');

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
                        "answer": "Acompanho apenas as notícias mais comentadas em jornais e revistas, sem regularidade.",
                        "points": 30
                    },
                    {
                        "answer": "Sim, acompanho regularmente por meios de comunicação especializados (plataformas digitais, mídias e etc.).",
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
                "question": "Qual a alternativa melhor descreve o seu comportamento em relação ao risco de perda na sua aposentadoria?",
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
                        "answer": "Não faço ideia.",
                        "points": 10
                    },
                    {
                        "answer": "Não tenho esta expectativa.",
                        "points": 20
                    },
                    {
                        "answer": "Tenho esta expectativa.",
                        "points": 40
                    },
                    {
                        "answer": "Tenho certeza.",
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
                        "answer": "Pretendo utilizar um percentual relevante dos meus investimentos no curto prazo (até 1 ano).",
                        "points": 20
                    },
                    {
                        "answer": "Pretendo utilizar um percentual relevante dos meus investimentos entre 1 e 5 anos.",
                        "points": 30
                    },
                    {
                        "answer": "Pretendo utilizar um percentual relevante dos meus investimentos entre 5 e 10 anos.",
                        "points": 40
                    },
                    {
                        "answer": "Sim, pretendo utilizar um percentual relevante dos meus investimentos entre 10 e 20 anos.",
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
