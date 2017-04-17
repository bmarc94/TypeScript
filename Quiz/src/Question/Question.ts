import { Choice } from "../Choice/Choice";

declare var window: any;
declare var quizConfiguration: any;

export abstract class Question {
    protected _node: HTMLElement = document.createElement("DIV");
    protected feedbackNode: HTMLElement = document.createElement("DIV");
    protected choices: Choice[] = [];
    public positiveFeedback: string;
    public negativeFeedback: string;
    public choicesContainer = document.createElement('DIV');

    constructor(title: string, choiceList: Choice[], positiveFeedback: string, negativeFeedBack: string) {
        this.choices = choiceList;
        this.positiveFeedback = positiveFeedback;
        this.negativeFeedback = negativeFeedBack;
        let questionText = document.createElement('DIV');
        this.choicesContainer = document.createElement('DIV');

        /*Build HTML*/
        this._node.className = quizConfiguration.className.questionContainer;
        questionText.className = quizConfiguration.className.questionText;
        questionText.innerHTML = title;
        this.choicesContainer.className = quizConfiguration.className.choicesContainer;
        this.feedbackNode.className = quizConfiguration.className.feedbackContainer

        /*Add callback on choice selection*/
        this.choices.map(function (choice: Choice) {
            choice.addQueryStateChangedEventListener(function () {
                this.onQueryStateChanged(choice);
            }.bind(this));
            this.choicesContainer.appendChild(choice.getNode());
        }.bind(this))

        /*AppendElements to Questionsontainer*/
        this._node.appendChild(questionText);
        this._node.appendChild(this.choicesContainer);
        this._node.appendChild(this.feedbackNode);
    }

    protected abstract onQueryStateChanged(choice: Choice): void;

    public get node(): HTMLElement {
        return this._node;
    }

    public validate(): boolean {
        for (var i = 0, l = this.choices.length; i < l; i++) {
            if (!this.choices[i].validate()) {
                return false;
            }
        }
        return true;
    }

    public isAnswered(): boolean {
        for (var i = 0, l = this.choices.length; i < l; i++) {
            if (this.choices[i].isSelected) {
                return true;
            }
        }
        return false;
    }

    public testPositive(): void {
        this.feedbackNode.className += " " + quizConfiguration.className.positiveFeedback;
        this.feedbackNode.innerHTML = this.positiveFeedback;
        this.choicesContainer.className += " " + quizConfiguration.className.positiveFeedback;

    }
    public testNegative(): void {
        this.feedbackNode.className += " " + quizConfiguration.className.negativeFeedback;
        this.feedbackNode.innerHTML = this.negativeFeedback;
        this.choicesContainer.className += " " + quizConfiguration.className.negativeFeedback;
    }
}