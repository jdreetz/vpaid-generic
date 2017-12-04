import PubSub from 'PubSub';

// Add pub sub behavior to subject class
export const Observable = subject => class extends subject {
  subscribe(fn, event, listenerScope) {
    this.pubsub = this.pubsub || new PubSub();
    this.pubsub.subscribe(event, fn.bind(listenerScope));
    return this;
  }

  unsubscribe(fn, event) {
    this.pubsub = this.pubsub || new PubSub();
    this.pubsub.unsubscribe(event, fn);
    return this;
  }

  publish(event, args) {
    this.pubsub = this.pubsub || new PubSub();
    this.pubsub.publish(event, args);
    return this;
  }
};


// Add DOM event handlers with easy unregistration of all listeners 
export const Listenable = subject => class extends subject {
  registerListener(el, eventName, fn, scope) {
    this.listeners = this.listeners || [];
    fn = fn.bind(scope);
    this.listeners.push({ el, eventName, fn });
    el.addEventListener(eventName, fn);
  }

  unregisterListener(el, name) {
    this.listeners = this.listeners || [];
    this.listeners.filter( l => l.eventName === name).forEach( l => el.removeEventListener(l.eventName, l.fn) );
  }

  unregisterAll() {
    this.listeners = this.listeners || [];
    this.listeners.forEach( l => l.el.removeEventListener(l.eventName, l.fn) );
  }

}