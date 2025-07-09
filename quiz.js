// quiz.js

const questions = [
    {
        question: "Aşağıdaki kelimelerden hangisi 'özel isim' değildir?",
        options: ["Ankara", "Ayşe", "Kitap", "Türkiye"],
        answer: "Kitap"
    },
    {
        question: "'Bugün hava çok güzel.' cümlesinde kaç tane sıfat vardır?",
        options: ["Bir", "İki", "Üç", "Hiçbiri"],
        answer: "Bir" // 'güzel' kelimesi sıfattır.
    },
    {
        question: "'Kalemimi kaybettim.' cümlesinde hangi noktalama işareti kullanılmalıdır?",
        options: [".", "?", "!", ","],
        answer: "."
    },
    {
        question: "Aşağıdaki cümlelerin hangisinde 'de/da' bağlacı yanlış yazılmıştır?",
        options: [
            "Evde kitap okuyorum.",
            "Ben de geldim.",
            "Oku dada öğren.",
            "Okulda çok eğlendik."
        ],
        answer: "Oku dada öğren."
    },
    {
        question: "'Kediler çok zeki hayvanlardır.' cümlesinin yüklemi hangisidir?",
        options: ["Kediler", "çok zeki", "hayvanlardır", "zeki hayvanlardır"],
        answer: "hayvanlardır"
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let totalScore = 0;
const pointsPerCorrectAnswer = 10; // Her doğru cevap için verilecek puan

const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');

const correctCountElement = document.getElementById('correct-count');
const incorrectCountElement = document.getElementById('incorrect-count');
const totalScoreElement = document.getElementById('total-score');

function loadQuestion() {
    // Geri bildirim ve sonraki butonunu gizle
    feedbackElement.textContent = '';
    nextButton.style.display = 'none';
    optionsContainer.querySelectorAll('button').forEach(button => {
        button.classList.remove('correct', 'incorrect');
        button.disabled = false; // Butonları tekrar aktif et
    });

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionTextElement.textContent = currentQuestion.question;
        optionsContainer.innerHTML = ''; // Önceki seçenekleri temizle

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option, currentQuestion.answer, button);
            optionsContainer.appendChild(button);
        });
    } else {
        showResults();
    }
}

function checkAnswer(selectedOption, correctAnswer, buttonElement) {
    // Tüm seçenek butonlarını devre dışı bırak
    optionsContainer.querySelectorAll('button').forEach(button => {
        button.disabled = true;
    });

    if (selectedOption === correctAnswer) {
        correctAnswers++;
        totalScore += pointsPerCorrectAnswer;
        feedbackElement.textContent = 'Doğru Cevap!';
        feedbackElement.style.color = '#28a745'; // Yeşil
        buttonElement.classList.add('correct');
    } else {
        incorrectAnswers++;
        feedbackElement.textContent = `Yanlış Cevap. Doğru cevap: "${correctAnswer}"`;
        feedbackElement.style.color = '#dc3545'; // Kırmızı
        buttonElement.classList.add('incorrect');
        // Doğru cevabı da işaretle
        optionsContainer.querySelectorAll('button').forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }
    
    // Son soru ise "Sonraki Soru" yerine "Sonuçları Gör" gibi bir metin olabilir veya direkt sonuç ekranına geçebiliriz.
    // Şimdilik hepsi için "Sonraki Soru" ve son sorudan sonra direk showResults'a geçiyor.
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.textContent = 'Sonraki Soru';
        nextButton.style.display = 'block'; 
    } else {
        nextButton.textContent = 'Quiz Bitir'; // Son soru için butonu değiştir
        nextButton.style.display = 'block';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    quizScreen.style.display = 'none';
    resultsScreen.style.display = 'block';
    correctCountElement.textContent = correctAnswers;
    incorrectCountElement.textContent = incorrectAnswers;
    totalScoreElement.textContent = totalScore;

    // Sonuçları localStorage'a kaydet (şimdilik bireysel öğrenci için)
    const quizResults = {
        correct: correctAnswers,
        incorrect: incorrectAnswers,
        score: totalScore,
        date: new Date().toISOString() // Quizin ne zaman çözüldüğü
    };
    
    let allQuizResults = JSON.parse(localStorage.getItem('quiz_results_individual') || '[]');
    allQuizResults.push(quizResults);
    localStorage.setItem('quiz_results_individual', JSON.stringify(allQuizResults));
    console.log("Quiz sonuçları localStorage'a kaydedildi:", quizResults);
}

// Olay dinleyicileri
nextButton.addEventListener('click', nextQuestion);

// Quiz başladığında ilk soruyu yükle
loadQuestion();
