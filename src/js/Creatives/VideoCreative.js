import { Observable, Listenable } from '../Helpers/Behaviors';
import * as VPAIDEvents from '../Enum/VPAIDEvents';
import BaseCreative from './BaseCreative';
import QuartileTimeUpdateHandler from './Timers/QuartileTimeUpdateHandler';

@Listenable
export default class VideoCreative extends BaseCreative {
  constructor(videoElement, { videoURL }, parentInterface) {
    super();

    if(videoElement && videoURL) {
      this.initializeState(videoElement, videoURL);
      this.registerEvents(videoElement);
    } else {
      throw 'Fatal Error - videoElement or videoURL not provided';
    }
  }

  get duration() {
    return this.videoEl.duration > 0 ? this.videoEl.duration : -2;
  }

  get remaining() {
    return this.videoEl.duration ? this.videoEl.duration - this.videoEl.currentTime : -2;
  }

  get volume() {
    if(this.videoEl) {
      this.videoEl.volume;
    }
  }

  set volume(v) {
    if(this.videoEl && !isNaN(v)) {
      this.videoEl.volume = v;
    }
  }

  play() {
    if(this.videoEl) {
      this.videoEl.play();
    }
  }

  pause() {
    if(this.videoEl) {
      this.videoEl.pause();
    }
  }

  initializeState(videoElement, videoURL) {
    this.videoEl = videoElement;
    this.videoURL = videoURL;
    this.videoEl.autoplay = true;
    this.videoEl.src = videoURL;
    this.videoEl.play();
  }

  registerEvents(videoElement) {
    this.registerListener(videoElement, 'loadedmetadata', this.onLoadedMetaData, this);
    this.registerListener(videoElement, 'ended', this.onEnded, this);
  }

  // to do - support configurable time update handler
  onLoadedMetaData(event) {
    this.timeUpdateHandler = new QuartileTimeUpdateHandler(event.target.duration);
    this.registerListener(event.target, 'timeupdate', this.onTimeUpdate, this);
    this.unregisterListener(event.target, 'loadedmetadata');
    this.publish(VPAIDEvents.AD_DURATION_CHANGE);
  }

  onTimeUpdate(event) {
    const updates = this.timeUpdateHandler.onTimeUpdate(event);
    this.publishAll(updates);
  }

  onEnded() {
    this.publish(VPAIDEvents.AD_VIDEO_COMPLETE);
    this.publish(VPAIDEvents.AD_STOPPED);
    this.destory();
  }

  destory() {
    if(this.videoEl) {
      this.videoEl.pause();
      this.unregisterAll();
    }
  }
}