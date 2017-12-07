import { Observable } from '../src/js/Helpers/Behaviors.js';

import is from 'is';
import test from 'tape';

test('Tests Observable behavior decorates class', assert => {
  const SubjectClass = class {};
  const Decorated = Observable(SubjectClass);

  assert.ok(is.fn(Decorated.prototype.subscribe) && is.fn(Decorated.prototype.publish) && is.fn(Decorated.prototype.unsubscribe), 'Decorated class has subscribe, publish, and unsubscribe methods');
  assert.end();
});

test('Tests Observable decorated class can publish events', assert => {
  const FOO_EVENT = 'foo';
  const { subjectInstance } = setup(Observable, class {});

  subjectInstance.subscribe( evt => {
    assert.ok('foo event called');
    assert.end();
  }, FOO_EVENT);

  subjectInstance.publish(FOO_EVENT);
});

test('Tests Observable decorated class can unsubscribe from events', assert => {
  let callCount = 0;
  const FOO_EVENT = 'foo';
  const { subjectInstance } = setup(Observable, class {});

  subjectInstance.subscribe(onFooEvent, FOO_EVENT);
  subjectInstance.publish(FOO_EVENT);
  
  // Publish is async, so wrap in setTimeout to call on next JS event loop. Welcome to callback hell ;)
  setTimeout(() => {
    assert.equal(callCount, 1, 'Should call subscriber once to confirm working');

    subjectInstance.unsubscribe(onFooEvent, FOO_EVENT);
    subjectInstance.publish(FOO_EVENT);

    setTimeout(() => {
      assert.equal(callCount, 1, 'Should not have called subscriber callback again since unsubscribed');
      assert.end();
    }, 0);
  }, 0);

  function onFooEvent() {
    callCount++;
  }
});

function setup(decorator, subject) {
  return {
    subjectInstance: new (decorator(subject))()
  }
}