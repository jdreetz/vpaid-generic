import { Observable, Listenable } from '../Helpers/Behaviors';
import * as VPAIDEvents from '../Enum/VPAIDEvents';
import BaseOverlay from './BaseOverlay';


// Simple overlay class. Handles clicks. Can be overriden to provide more complicated user interface
@Listenable
export default class SimpleControls extends BaseOverlay {
  constructor(slotEl, { clickThrough }, { size }) {
    super();

    if(typeof slotEl != 'undefined') {
      this.slotEl = slotEl;

      var controls = this.generateControls();
      slotEl.appendChild(controls);

      if(clickThrough) {
        this.clickThrough = clickThrough;
        this.setSize(size.width, size.height);
        this.registerListener(slotEl, 'click', this.onClick, this);
      }
    } else {
      throw 'Fatal Error - slot element not provided';
    }
  }

  onClick(event) {
    event.preventDefault();
    this.publish(VPAIDEvents.AD_CLICK_THRU);
    window.open(this.clickThrough, '_blank');
  }

  setSize(width, height) {
    this.slotEl.style = `cursor: pointer; width: ${width}px; height: ${height}px;`;
  }

  // override this if you want to inject custom overlay elements
  generateControls() {
    return document.createDocumentFragment();
  }

  destroy() {
    this.unregisterAll();
  }
}