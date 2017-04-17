import { Choice } from "../Choice/Choice";
import { Question } from "./Question";

export class MultipleChoiceQuestion extends Question {

    constructor(title: string, choiceList: Choice[], positiveFeedback: string, negativeFeedback: string) {
        super(title, choiceList,positiveFeedback,negativeFeedback);
    }
    
    protected onQueryStateChanged(choice:Choice): void {
        debugger;
        choice.isSelected ? choice.isSelected = false : choice.isSelected = true;
    }
}