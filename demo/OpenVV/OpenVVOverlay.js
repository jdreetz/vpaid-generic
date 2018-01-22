import OpenVV from 'openvv-html';
import VPAIDInterface from '../../src/js/index';

export default class extends VPAIDInterface.BaseOverlay {
  constructor(element, options, { size }) {
    super();

    this.element = element;
    this.stateDisplayElement = this.createStateDisplay();
    this.element.appendChild(this.stateDisplayElement);
    this.openvv = new OpenVV();
    
    this
      .openvv
      .measureElement(element)
      .onViewableChange(this.viewableChange.bind(this))
      .onViewableComplete(this.viewableComplete.bind(this))
      .start();
  }

  viewableChange(changeDetails) {
    this.updateStateDisplay(changeDetails);
  }

  viewableComplete(changeDetails) {
    this.updateStateDisplay(changeDetails);
  }

  updateStateDisplay(value) {
    if(typeof value === 'object') {
      value = Object.keys(value).map( key => { 
        if(key === 'percentViewable') {
          value[key] = (value[key] * 100).toFixed(2) + '%';
        }
        return `${key}: ${value[key]}`;
      }).join('\n');
    }
    this.stateDisplayElement.innerHTML = `<pre>${value}</pre>`;
  }

  createStateDisplay() {
    const el = document.createElement('div');
    el.style.color = 'white';
    el.style.fontSize = '1.2em';
    el.style.padding   = '16px 24px';
    el.style.textShadow = '1px 1px 2px #00000078';
    return el;
  }
}