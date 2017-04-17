import { RadioGroup } from "./radioGroup/RadioGroup";

function initRadioGroup() {
    var radioLabels: String[] = ['radio 1', 'radio 2', 'radio 3'];
    var radiosName: String = "test";
    var radioGroup: RadioGroup = new RadioGroup(radioLabels, radiosName);
    var body = document.body;

    body.appendChild(radioGroup.getDom);

}


window.addEventListener('load', function () {

    initRadioGroup();

})