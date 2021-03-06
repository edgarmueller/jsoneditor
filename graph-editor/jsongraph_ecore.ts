// import {JsonForms} from 'jsonforms';
// import {masterDetail} from './masterdetail';

class JSONGraphEcore extends HTMLElement {
  private connected = false;
  private _data;
  constructor() {
    super();
  }
  connectedCallback(): void {
    this.connected = true;
    this.render();
  }
  diconnectedCallback(): void {
    this.connected = false;
  }
  get data() {
    return this._data;
  }
  set data(data: object){
    this._data = data;
    this.render();
  }
  private render():void {
    if(!this.connected || !this._data){
      return;
    }
    const jsonforms = document.createElement('json-graph');
    jsonforms['data'] = this._data;
    jsonforms['diagramConfiguration'] = {
    showRoot: false,
    referenceClasses: {
      '#class': [
        {incomingReference: 'eStructuralFeatures',
        outgoingReference: 'eType',
        schemaIdOfReferenceClass: '#reference'}
      ]
    }};
    const that = this;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       jsonforms['dataSchema'] = JSON.parse(this.responseText);
       that.appendChild(jsonforms);
      }
    };
    xhttp.open("GET", "http://localhost:3001/schema.json", true);
    // xhttp.open("GET", "http://localhost:3001/task.schema.json", true);
    xhttp.send();
  }
}
if (!customElements.get('jsongraph-ecore')) {
  customElements.define('jsongraph-ecore', JSONGraphEcore);
}
