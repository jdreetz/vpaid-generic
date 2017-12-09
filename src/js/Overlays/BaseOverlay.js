import { Observable } from '../Helpers/Behaviors';

@Observable
export default class BaseOverlay {
  constructor() {}
  setSize() {}
  generateControls() { return document.createDocumentFragment(); }
  destroy() {}
  publish() {}
  subscribe() {}
  unsubscribe() {}
}