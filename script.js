// Data Kosakata
let words = [
    { arabic: "كتاب", meaning: "Buku" },
    { arabic: "قلم", meaning: "Pulpen" },
    { arabic: "باب", meaning: "Pintu" },
    { arabic: "نافذة", meaning: "Jendela" },
    { arabic: "مدرسة", meaning: "Sekolah" }
];

const wordList = document.getElementById("word-list");
const searchBox = document.getElementById("search-box");
const arabicInput = document.getElementById("arabic-word");
const meaningInput = document.getElementById("meaning");
const addButton = document.getElementById("add-word");
const themeToggle = document.getElementById("theme-toggle");

// Tampilkan daftar kosakata
function displayWords(filter = "") {
    wordList.innerHTML = "";
    words.forEach(word => {
        if (word.arabic.includes(filter) || word.meaning.toLowerCase().includes(filter.toLowerCase())) {
            let listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${word.arabic}</strong> - ${word.meaning} 
                <button onclick="playAudio('${word.arabic}')">🔊</button>`;
            wordList.appendChild(listItem);
        }
    });
}

// Cari kata
searchBox.addEventListener("input", () => displayWords(searchBox.value));

// Tambah kata baru
addButton.addEventListener("click", () => {
    let arabicWord = arabicInput.value.trim();
    let meaningWord = meaningInput.value.trim();
    if (arabicWord !== "" && meaningWord !== "") {
        words.push({ arabic: arabicWord, meaning: meaningWord });
        displayWords();
        arabicInput.value = "";
        meaningInput.value = "";
    }
});

// Mode Gelap/Terang
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Mode Terang" : "🌙 Mode Gelap";
});

// Pelafalan Audio
function playAudio(text) {
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "ar-SA";
    speech.text = text;
    window.speechSynthesis.speak(speech);
}

// 🔥 Kuis Interaktif 🔥
const quizContainer = document.getElementById("quiz-container");
const startQuiz = document.getElementById("start-quiz");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextQuestion = document.getElementById("next-question");

let currentQuestionIndex = 0;

// Mulai kuis
startQuiz.addEventListener("click", () => {
    quizContainer.classList.remove("hidden");
    loadQuestion();
});

// Tampilkan pertanyaan
function loadQuestion() {
    const question = words[currentQuestionIndex];
    questionEl.textContent = `Apa arti dari "${question.arabic}"?`;

    optionsEl.innerHTML = "";
    let choices = words.map(w => w.meaning).sort(() => Math.random() - 0.5);
    choices.forEach(choice => {
        let btn = document.createElement("button");
        btn.textContent = choice;
        btn.onclick = () => alert(choice === question.meaning ? "Benar!" : "Salah!");
        optionsEl.appendChild(btn);
    });
}

// Pertanyaan berikutnya
nextQuestion.addEventListener("click", () => {
    currentQuestionIndex = (currentQuestionIndex + 1) % words.length;
    loadQuestion();
});

// Tampilkan kata saat pertama kali
displayWords();
