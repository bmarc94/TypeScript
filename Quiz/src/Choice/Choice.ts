declare var quizConfiguration: any;

export abstract class Choice {
    public isExpected: boolean = false;
    private _isSelected: boolean = false;
    private _queryStateChangedCallbacks: Function[] = [];
    protected node: HTMLElement = document.createElement("DIV");

    /*Constructor*/
    constructor(text: string, expected: boolean) {
        this.isExpected = expected;
        let inputContainer = document.createElement('SPAN');
        inputContainer.appendChild(this.buildInput());
        this.node.className = quizConfiguration.className.choice;
        this.node.appendChild(inputContainer);
        this.node.appendChild(this.buildText(text));

        this.node.addEventListener("click", function () {
            this.fireQueryStateChangedCallbacks();
        }.bind(this));
    }

    /*getter Setter*/
    
    public get isSelected(): boolean {
        return this._isSelected;
    }

    public set isSelected(value: boolean) {
        this._isSelected = value;
        if (this._isSelected) {
            this.selectGUI();
        } else {
            this.unSelectGUI();
        }
    }

    /*abstract*/
    protected abstract selectGUI(): void;
    protected abstract unSelectGUI(): void;
    protected abstract buildInput(): HTMLElement;

    /*Public*/
    public getNode(): HTMLElement {
        return this.node;
    }

    public validate(): boolean {
        return this.isSelected === this.isExpected;
    }


    public addQueryStateChangedEventListener(callback: Function) {
        this._queryStateChangedCallbacks.push(callback);
    }

    public removeQueryStateChangedEventListener(callback: Function) { }

    private fireQueryStateChangedCallbacks(): void {
        this._queryStateChangedCallbacks.map(function (callback) {
            callback();
        })

    }

    protected buildText(text: string): HTMLElement {
        let textContent: HTMLElement = <HTMLInputElement>document.createElement('SPAN');
        textContent.innerHTML = text;
        return textContent;
    }
}
