export class Radio {
    private input: HTMLInputElement;
    private _dom: HTMLSpanElement;
    private _stateChangedCallbacks: Function[] = [];

    constructor(text: String) {
        this.buildNode(text);
        this.initBehavior();
    }

    get getDom():HTMLSpanElement{
        return this._dom;
    }

    get selected() {
        return this.input.checked;
    }

    private buildNode(text: any /*bug pour gérer le innerHTML....*/) {
        this._dom = <HTMLSpanElement>document.createElement('SPAN');
        let label: HTMLElement = <HTMLSpanElement>document.createElement('LABEL');
        this.input = <HTMLInputElement>document.createElement('INPUT');

        label.innerHTML = text;
        this.input.type = "radio";

        this.getDom.appendChild(this.input);
        this.getDom.appendChild(label);

    }
    private initBehavior(){
        this._dom.addEventListener('click',() => {
            this.input.checked = true;
            this._fireStateChangedCallbacks();
        })
    }

    public addGroupName(name:any /*bug pour gérer le innerHTML....*/){
        this.input.name = name;
    }

    public addStateChangedEventListener(callback: Function) {
        this._stateChangedCallbacks.push(callback);
    }

    public removeStateChangedEventListener(callback: Function) { }

    private _fireStateChangedCallbacks(): void {
        this._stateChangedCallbacks.map((callback) =>{
            callback();
        })
    }
}