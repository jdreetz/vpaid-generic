import { Observable } from '../Helpers/Behaviors';

@Observable
export default class BaseCreative {
  constructor(){}
  get duration() { return -2 }
  get remaining() { return -2 }
  set volume(v) {}
  play() {}
  pause() {}
  destroy() {}
  publish() {}
  subscribe() {}
  unsubscribe() {}
}