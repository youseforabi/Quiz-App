import { questions, questionsContainer , currentQuiz } from "./index.js";
export default class Question {
    constructor(index){

        this.index = index;
        this.question = questions[index].question;

        this.correct = questions[index].correct_answer;
        this.wrongAnswers = questions[index].incorrect_answers;
        this.category = questions[index].category;
        this.allAnswers = this.getAllAnswers();
        this.answered = false;
    }

    getAllAnswers(){
        return this.wrongAnswers.concat(this.correct).sort();
    }

    displayQuestion(){

        const questionHTML = `     
        <div
      class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
    >
      <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-category">${this.category}</span>
        <span class="fs-6 btn btn-questions">${this.index + 1} of ${
      questions.length
    } Questions</span>
      </div>
      <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
      <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
      ${this.allAnswers.map((choice) => `<li>${choice}</li>`).join("")}
      </ul>
      <h2 class="text-capitalize text-center score-color h3 fw-bold">
        <i class="bi bi-emoji-laughing"></i> 
        Score: ${currentQuiz.score}
      </h2>        
    </div>
        `;
    questionsContainer.innerHTML = questionHTML;
    const allChoices = document.querySelectorAll(".choices li");
     
    allChoices.forEach((choice) => { 

        choice.addEventListener("click" , (eventInfo) => {
            this.checkAnswer(eventInfo);
        })

    } )



    }

    checkAnswer(eventInfo){

     if(!this.answered){
        this.answered = true; 
        if(this.correct.toLowerCase() == eventInfo.target.innerHTML.toLowerCase()){
            eventInfo.target.classList.add(
                "correct",
                "animate__animated",
                "animate__flipInY"
              );
                currentQuiz.score++;
        }
        else {
            eventInfo.target.classList.add(
                "wrong",
                "animate__animated",
                "animate__shakeX"
              );

        }
        this.animateQuestion(eventInfo.target);
     }

    }

    nextQuestion(){
        this.index++;
        if (this.index < questions.length){
            const nextQuestion = new Question(this.index);
            nextQuestion.displayQuestion(); 
            return;
        }
        
            const endQuizHTMl = currentQuiz.endQuiz();
            questionsContainer.innerHTML = endQuizHTMl;

            const tryAgainBtn = document.querySelector(".again");
            tryAgainBtn.addEventListener("click",function(){
                window.location.reload();
            })
        
    }

    animateQuestion(element){
        setTimeout(() =>{
            element.closest(".question").classList.add("animate__animated" , "animate__bounceOutLeft");
            
            setTimeout(()=> this.nextQuestion(),800)
        },500)
    }
}