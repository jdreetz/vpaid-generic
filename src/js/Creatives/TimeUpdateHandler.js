import * as VPAIDEvents from '../Enum/VPAIDEvents';
import { Observable } from '../Helpers/Behaviors';
import TimeEvent from './TimeEvent';

@Observable
export default class TimeUpdateHandler {
  constructor(duration) {
    const quartile = duration / 4;
    this.lastTime = this.now;
    this.UPDATE_THRESHOLD = 250;
    this.timeEvents = [
      new TimeEvent(VPAIDEvents.AD_VIDEO_FIRST_QUARTILE, quartile, this.publish),
      new TimeEvent(VPAIDEvents.AD_VIDEO_MIDPOINT, quartile * 2, this.publish),
      new TimeEvent(VPAIDEvents.AD_VIDEO_THIRD_QUARTILE, quartile * 3, this.publish)
    ];
  }

  onTimeUpdate(event) {
    if(event.target.currentTime > (this.lastTime + this.UPDATE_THRESHOLD) ) {
      this.timeEvents.forEach( timeEvent => timeupdate.onTimeUpdate(event.target.currentTime) );
      this.publish(VPAIDEvents.AD_REMAINING_TIME_CHANGE);
    }
    this.lastTime = this.now;
  }

  onTimeEvent(eventName) {
    this.publish(eventName);
  }

  get now() {
    return new Date().getTime(); 
  }
}