import PubSub from 'pubsub-js';

export default class Subscribeable {
  subscribe(fn, event, listenerScope) {
    PubSub.subscribe(event, fn.bind(listenerScope));
    return this;
  }

  unsubscribe(fn, event) {
    PubSub.unsubscribe(event, fn);
    return this;
  }

  publish(event, args) {
    PubSub.publish(event, args);
    return this;
  }
}