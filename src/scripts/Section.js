import Card from './Card.js';

export default class Section {
    constructor({data, renderer}, containerSelector){
        this._container = document.querySelector(containerSelector);
        this._initalArray = data;
        this._renderer = renderer;
    }

    renderItems(){
        for (let i = 0, len = this._initalArray.length; i < len; i++) {
            this._renderer(this._initalArray[i]);
            }
    }

    addItem(element){
        this._container.append(element);
    }
}