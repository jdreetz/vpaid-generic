import { Listenable } from '../src/js/Helpers/Behaviors.js';

import is from 'is';
import test from 'tape';

test('Tests Listenable behavior can register and unregister events', assert => {
  const SubjectClass = class {
    onEvent() {
      this.callCount = this.callCount ? this.callCount + 1 : 1;
    }
  };
  
  const { subjectInstance, el } = setup(Listenable, SubjectClass);

  subjectInstance.registerListener(el, 'onFoo', subjectInstance.onEvent, subjectInstance);
  assert.ok(subjectInstance.listeners.length > 0, 'event handler added to listeners');
  assert.ok(is.fn(el.onFoo), 'event handler added to element');

  el.onFoo();
  assert.equal(subjectInstance.callCount, 1, 'event listener calls assigned callback');
  
  subjectInstance.unregisterAll();
  assert.ok(subjectInstance.listeners.length === 0, 'removes all event listeners');
  assert.ok(is.undef(el.onFoo), 'removes event listener from element');

  assert.end();
});

function setup(decorator, klass) {
  return {
    subjectInstance: instantiate(decorate(decorator, klass)),
    el: mockElement()
  }
}

function mockElement() {
  return {
    addCalled: false, 
    removeCalled: false,
    addEventListener(eventName, fn) {
      this[eventName] = fn;
    },
    removeEventListener(eventName, fn) {
      if(fn === this[eventName]) {
        delete this[eventName]
      }
    }
  };
}

function decorate(decorator, klass) {
  return decorator(klass);
}

function instantiate(klass) {
  return new klass();
}