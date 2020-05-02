const questions = [
    ["x + 2 = 5, What is 'x' ?", ['5', '4', '3', '2']],
    ["What is 20% of x from the previous question?", ['3', '10', '0.2', '0.6']],
    ["What is three quaters of half of the square root of the answer to question 2", ['0.1', '0.29', '2.5', '4.25']],
    ["find r + 2, where r = 0.5 * infinity", ['0', 'r', 'infinity', '1/2']],
    ["what is 2 + 2?", ['15million', '22', '2', 'none of the above']]
];
let qCount = 0;
let currScore = 0
const answerPos = [2, 2, -1, -1, -1];
const nav = document.getElementById('nav');
const content = document.getElementById('content');
const finalScore = document.getElementById('final-score');
const fScore = document.getElementById('fscore');
const currQuestion = document.getElementById('q-txt');
const question = document.getElementById('question');
const score = document.getElementById('score');
score.innerHTML = `${currScore}/5`;
const ACTIVATE = e => {
    if (document.getElementById('next') !== null) {
        return;
    }
    if (document.getElementById(`o${(e.id).slice(3)}`).innerHTML !== questions[qCount][1][qCount + answerPos[qCount]]) {
        e.classList.add('wrong');
        for (let i = 0; i < 4; i++) {
            if (document.getElementById(`o${i}`).innerHTML === questions[qCount][1][qCount + answerPos[qCount]]) {
                document.getElementById(`opt${i}`).classList.add('correct');
            }
        }
    } else {
        e.classList.add('correct');
        currScore++;
        score.innerHTML = `${currScore}/5`;
    }
    const next = document.createElement('p');
    next.innerHTML = 'Next';
    next.id = 'next';
    next.classList.add('next');
    next.addEventListener('click', () => {
        LOAD_QUESTION();
    })
    nav.append(next);
    qCount++;
}
const ACTIVATE_OPTIONS = () => {
    for (let i = 0; i < 4; i++) {
        document.getElementById(`opt${i}`).addEventListener('click', () => {
            ACTIVATE(document.getElementById(`opt${i}`));
        });
    }
}
ACTIVATE_OPTIONS();
const LOAD_QUESTION = () => {
    if (document.getElementById('next') !== null) {
        nav.removeChild(document.getElementById('next'));
    }
    if (qCount === 5) {
        content.style.display = 'none';
        finalScore.style.display = 'flex';
        fScore.innerHTML = `${currScore}/5`;
        return;
    }
    currQuestion.innerHTML = `${qCount + 1} out of 5`;
    question.innerHTML = questions[qCount][0];
    for (let i = 0; i < questions[qCount][1].length; i++) {
        document.getElementById(`opt${i}`).classList.remove('correct', 'wrong');
        document.getElementById(`o${i}`).innerHTML = questions[qCount][1][i];
    }
}
LOAD_QUESTION();