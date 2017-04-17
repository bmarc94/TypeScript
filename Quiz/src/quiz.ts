import { Quiz } from "./js/Quiz/Quiz";

declare var quizConfiguration:any;
declare var window: any;



/*TEST*/
window.Quiz = Quiz.instance;

window.addMultipleChoiceQuestion = function(title:string, answers:string[], goodAnswers:number[], positiveFeedback:string, negativeFeedback:string){ 
     Quiz.createMCQ(title, answers, goodAnswers, positiveFeedback, negativeFeedback);
}
window.addUniqueChoiceQuestion = function(title:string, answers:string[], goodAnswer:number, positiveFeedback:string, negativeFeedback:string){
    Quiz.createUCQ(title, answers, goodAnswer, positiveFeedback, negativeFeedback);
}

window.onload = function() {
   
    window.addMultipleChoiceQuestion("Question 1",["Bonne réponse","Mauvaise réponse", "Bonne réponse"],[1,3],"SI SI","CASSES TOI POV'CON");
    window.addMultipleChoiceQuestion("Question 2",["Bonne réponse","Mauvaise réponse", "Mauvaise réponse"],[1],"SI SI","CASSES TOI POV'CON");
    window.addUniqueChoiceQuestion("Question 4",["Bonne réponse","Mauvaise réponse", "Mauvaise réponse"],1,"SI SI","CASSES TOI POV'CON");

    document.getElementById('submit').onclick = function(){
            Quiz.validate();
        }
}

/*Alias*/