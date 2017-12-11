import * as VPAIDEvents from '../../Enum/VPAIDEvents';
import TimeUpdateHandler from './TimeUpdateHandler';
import TimeEvent from './TimeEvent';

export default class QuartileTimeUpdateHandler extends TimeUpdateHandler {
  generateTimeEvents(duration) {
    const quartile = duration / 4;
    return [
      new TimeEvent(VPAIDEvents.AD_VIDEO_FIRST_QUARTILE, quartile),
      new TimeEvent(VPAIDEvents.AD_VIDEO_MIDPOINT, quartile * 2),
      new TimeEvent(VPAIDEvents.AD_VIDEO_THIRD_QUARTILE, quartile * 3)
    ];
  }
}