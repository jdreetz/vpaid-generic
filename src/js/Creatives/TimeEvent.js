export default class TimeEvent {
  constructor(eventName, eventTime, publisher) {
    this.eventName = eventName;
    this.eventTime = eventTime;
    this.publish = publisher;
    this.fired = false;
  }

  onTimeUpdate(currentTime) {
    if(!this.fired && currentTime > this.eventTime) {
      this.fired = true;
      this.publish(this.eventName);
    }
  }
}