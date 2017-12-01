import Subscribeable from './Subscribeable';
import * as VPAIDEvents from './VPAIDEvents';

export default class BasicControls extends Subscribeable {
  constructor(slotEl, clickThroughURL) {
    super();

    if(typeof slotEl != 'undefined') {
      this.slotEl = slotEl;

      var controls = this.generateControls();
      slotEl.appendChild(controls);

      if(clickThroughURL) {
        this.clickThroughURL = clickThroughURL;
        slotEl.addEventListener('click', this.onClick.bind(this));
      }
    } else {
      throw 'Fatal Error - slot element not provided';
    }
  }

  onClick(event) {
    this.publish(VPAIDEvents.AD_CLICK_THRU);
    window.open(this.clickThroughURL, '_blank');
  }

  onPlay(event) {
    event.preventDefault();
    this.publish(VPAIDEvents.AD_PAUSED);
  }

  onPause(event) {
    event.preventDefault();
    this.publish(VPAIDEvents.AD_PLAYING);
  }

  generateControls() {
    const placeholder = document.createDocumentFragment(), 
          play        = document.createElement('a'),
          pause       = document.createElement('a');

    play.innerHTML = 'Play';
    play.addEventListener('click', this.onPlay.bind(this));

    pause.innerHTML = 'Pause';
    pause.addEventListener('click', this.onPause.bind(this));
    placeholder.appendChild(play).appendChild(pause);
    return placeholder;
  }
}