import { Question } from "../Question/Question";
import { QuestionFactory } from "../Question/QuestionFactory";

declare var window: any;
declare var quizConfiguration: any;

export class Quiz {
    private static _instance: Quiz = new Quiz();
    private static _score: number = 0;
    private static _questions: Question[] = [];
    private static feedback: HTMLElement;
    private static questionsLength: number = 0;



    constructor() {
        if (Quiz._instance) {
            throw new Error("Error: Instantiation failed: Use Quiz.instance instead of new.");
        }
    }

    public static get score(): number {
        return Quiz._score;
    }

    public static get instance(): Quiz {
        return Quiz._instance;
    }

    public static get questions(): Question[] {
        return Quiz._questions;
    }


    public static addQuestion(question: Question): void {
        this._questions.push(question);
        document.getElementById('quizContainer').appendChild(question.node);
    }

    /*Aliases*/
    public static createMCQ(questionTitle: string, choiceList: string[], expectedChoice: number[], positiveFeedback: string, negativeFeedBack: string) {
        this.questionsLength ++;
        questionTitle = this.questionsLength + ") " + questionTitle;
        this.addQuestion(QuestionFactory.buildMultipleChoiceQuestion(questionTitle, choiceList, expectedChoice, positiveFeedback, negativeFeedBack));

    }
    public static createUCQ(questionTitle: string, choiceList: string[], expectedChoice: number, positiveFeedback: string, negativeFeedBack: string) {
        this.questionsLength ++;
        questionTitle = this.questionsLength + ") " + questionTitle;
        this.addQuestion(QuestionFactory.buildSimpleChoiceQuestion(questionTitle, choiceList, expectedChoice, positiveFeedback, negativeFeedBack));
    }

    public static validate(): void {
        debugger;
        let goodAnswer: number = 0;
        let notAnswered: boolean = false;
        let message: string = "";

        Quiz.questions.map(function (question, index) {
            if (!question.isAnswered()) {
                notAnswered = true;
                message += "Vous n'avez pas répondu à la question " + (index + 1) + ".\n";
            }
        })

        if (notAnswered) {
            alert(message);
        } else {
            Quiz.questions.map(function (question) {
                if (question.validate()) {
                    goodAnswer++;
                    question.testPositive();
                } else {
                    question.testNegative();
                }
            })
            Quiz._score = Math.ceil(goodAnswer / this.questionsLength * 100);;
            Quiz.feedback = document.getElementById('result');
            document.getElementById('score').innerHTML = this._score + "%";
            if (Quiz.score >= quizConfiguration.validationScore) {
                document.getElementById('guidance').innerHTML = quizConfiguration.validationMessages;
                Quiz.feedback.className = " success";
            } else {
                document.getElementById('guidance').innerHTML = quizConfiguration.nullificationMessage;
                Quiz.feedback.className = " fail";
            }
            Quiz.feedback.style.display = "block";
            let button = <HTMLInputElement>document.getElementById('submit')
            button.disabled = true;
        }
    }
}