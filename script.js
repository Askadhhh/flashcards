const DATA_URL = 'wowowow.json';

let cards = [];
let index = 0;

const flashcard = document.getElementById('flashcard');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const ticketLabel = document.getElementById('ticket-label');
const progressEl = document.getElementById('progress');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

function extractTicketNumber(id) {
    const num = parseInt(id, 10);
    return num;
}

function showCard() {
    const card = cards[index];
    questionEl.textContent = card.question;
    answerEl.textContent = card.answer;
    ticketLabel.textContent = card.ticket;
    progressEl.textContent = `${index + 1} / ${cards.length}`;
    btnPrev.disabled = index === 0;
    btnNext.disabled = index === cards.length - 1;
    flashcard.classList.remove('flipped');
}

function nextCard() {
    if (index < cards.length - 1) {
        index++;
        showCard();
    }
}

function prevCard() {
    if (index > 0) {
        index--;
        showCard();
    }
}

// Click on card → flip
flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
});

btnNext.addEventListener('click', nextCard);
btnPrev.addEventListener('click', prevCard);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextCard();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevCard();
    } else if (e.key === 'Enter' || e.key === 'ArrowDown') {
        e.preventDefault();
        flashcard.classList.toggle('flipped');
    }
});

// Load data
fetch(DATA_URL)
    .then(res => {
        if (!res.ok) throw new Error('Не удалось загрузить JSON');
        return res.json();
    })
    .then(data => {
        cards = data.flashcards;
        showCard();
    })
    .catch(err => {
        document.body.innerHTML = `<div style="color:#e94560;text-align:center;padding:40px;font-size:1.2rem;">
            <p>Ошибка загрузки данных.</p>
            <p style="margin-top:8px;color:#a0a0b0;font-size:0.9rem;">${err.message}</p>
        </div>`;
    });
