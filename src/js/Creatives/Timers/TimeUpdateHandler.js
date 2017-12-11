import * as VPAIDEvents from '../../Enum/VPAIDEvents';

export default class TimeUpdateHandler {
  constructor(duration) {
    this.lastTime = this.now;
    this.UPDATE_THRESHOLD = 250;
    this.timeEvents = this.generateTimeEvents(duration);
  }

  generateTimeEvents(duration) {
    return [];
  }

  collectEvents(currentTime) {
    return this.timeEvents.reduce( (collected, timeEvent) => {
      const occurred = timeEvent.didEventOccur(currentTime);
      if(occurred) {
        collected.push(occurred);
      }
      return collected;
    }, []);
  }

  onTimeUpdate(event) {
    let publications = [], currentTime = event.target.currentTime;

    if(this.now > this.lastTime + this.UPDATE_THRESHOLD) {
      publications = [...this.collectEvents(currentTime), VPAIDEvents.AD_REMAINING_TIME_CHANGE];
    }

    this.lastTime = this.now;

    return publications;
  }

  get now() {
    return new Date().getTime(); 
  }
}