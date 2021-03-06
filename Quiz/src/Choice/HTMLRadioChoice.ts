import { Choice } from "./Choice";

export class HTMLRadioChoice extends Choice {
    protected input: HTMLInputElement;

    constructor(text: string, isCorrect: boolean) {
        super(text, isCorrect);
    }

    protected selectGUI() {
        this.input.checked = true;
    }
    
    protected unSelectGUI() {
        this.input.checked = false;
    }
    
    protected buildInput() {
        this.input = <HTMLInputElement>document.createElement('INPUT');
        this.input.type = "radio";
        return this.input;
    }
}