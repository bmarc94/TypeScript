import { Question } from "./Question";

import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { UniqueChoiceQuestion } from "./UniqueChoiceQuestion";

import { Choice } from "../Choice/Choice";
import { HTMLRadioChoice } from "../Choice/HTMLRadioChoice";
import { HTMLCheckBoxChoice } from "../Choice/HTMLCheckBoxChoice";

export class QuestionFactory {
    private static _instance: QuestionFactory = new QuestionFactory();
    constructor() {
        if (QuestionFactory._instance) {
            throw new Error("Error: Instantiation failed: Use QuestionFactory.getInstance() instead of new.");
        }
    }

    public static get instance(): QuestionFactory {
        return QuestionFactory._instance;
    }

    public static buildMultipleChoiceQuestion(questionTitle: string, choiceList: string[], expectedChoice: number[], positiveFeedback: string, negativeFeedBack: string): Question {
        let choices: Choice[] = choiceList.map(function (choiceTitle: string, index: number) {
            return new HTMLCheckBoxChoice(choiceTitle, this.isChoiceAccepted(index +1, expectedChoice));
        }, this)
        return new MultipleChoiceQuestion(questionTitle, choices, positiveFeedback, negativeFeedBack);
    }

    public static buildSimpleChoiceQuestion(questionTitle: string, choiceList: string[], expectedChoice: number, positiveFeedback: string, negativeFeedBack: string): Question {
        let choices: Choice[] = choiceList.map(function (choiceTitle, index: number) {
            return new HTMLRadioChoice(choiceTitle, index === expectedChoice - 1);
        })
        return new UniqueChoiceQuestion(questionTitle, choices, positiveFeedback, negativeFeedBack);
    }

    private static isChoiceAccepted(choiceIndex: number, acceptedIndexes: number[]): boolean {
        for (let i = 0, l = acceptedIndexes.length; i < l; i++) {
            if (acceptedIndexes[i] === choiceIndex) {
                return true;
            }
        }
        return false;
    }
}