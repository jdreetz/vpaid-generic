export default class TimeEvent {
  constructor(eventName, eventTime) {
    this.eventName = eventName;
    this.eventTime = eventTime;
    this.fired = false;
  }

  didEventOccur(currentTime) {
    if(!this.fired && currentTime > this.eventTime) {
      this.fired = true;
      return this.eventName;
    }
  }
}