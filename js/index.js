import Question from "./question.js";
import Quiz from "./quiz.js";

const categoryMenu = document.getElementById("categoryMenu");
const quizOptions = document.getElementById("quizOptions");
const difficultyOptions = document.getElementById("difficultyOptions");
const questionsNumber = document.getElementById("questionsNumber");
const startQuizBtn = document.getElementById("startQuiz");
export const questionsContainer = document.querySelector(".questions-container");

export let questions = [];
export let currentQuiz = {};

startQuizBtn.addEventListener("click", async function(){
    const category = categoryMenu.value;
    const difficulty = difficultyOptions.value;
    const amount = questionsNumber.value;

    currentQuiz = new Quiz(difficulty , amount , category);
    questions = await currentQuiz.getQuestion();
    console.log(questions);
    quizOptions.classList.replace("d-flex" , "d-none");

    const firstQuestion = new Question(0);
    firstQuestion.displayQuestion();
    console.log(firstQuestion);

})
