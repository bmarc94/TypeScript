import { Radio } from '../radio/Radio'

export class RadioGroup {
    private radios: Radio[] = [];
    private _dom: HTMLDivElement = <HTMLDivElement>document.createElement('div');
    private statusLine:HTMLDivElement = <HTMLDivElement>document.createElement('div');
    

    constructor(radioLabels: String[], groupName: String) {
        radioLabels.map((radioLabel: String) => {
            var radio = new Radio(radioLabel);
            var div = <HTMLDivElement>document.createElement('DIV');

            radio.addStateChangedEventListener(this._updateStatus.bind(this));

            radio.addGroupName(groupName);
            this.getDom.appendChild(div);
            div.appendChild(radio.getDom);
            this.radios.push(radio);
        });

        this.getDom.appendChild(this.statusLine);


    }

    get getDom(): HTMLSpanElement {
        return this._dom;
    }

    private _updateStatus(){
        var statusText:any = "<br /><br />";
        this.radios.map((radio,index)=>{
            statusText += "Le radio " + (index + 1 ) + " est ";
            if(radio.selected){
                statusText += "coché<br />";
            }else{
                statusText += "décoché<br />";
            }
        })
        
        statusText +="<br />(géré par groupBox au moment du clic sur le radio)";

        this.statusLine.innerHTML = statusText;
    }


}


