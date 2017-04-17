import { Choice } from "../Choice/Choice";
import { Question } from "./Question";

export class UniqueChoiceQuestion extends Question {

    constructor(title: string, choiceList: Choice[], positiveFeedback: string, negativeFeedback: string) {
        super(title, choiceList,positiveFeedback,negativeFeedback);
    }

    protected onQueryStateChanged(choice: Choice): void {
        this.choices.map(function(choice: Choice) {
            choice.isSelected = false; 
        })
        choice.isSelected = true;
    }
}