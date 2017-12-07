import { ValidCreative, ValidOverlay, ValidParser, ValidateClass } from '../src/js/Helpers/Validation';
import BaseCreative from '../src/js/Creatives/BaseCreative';
import BaseOverlay from '../src/js/Overlays/BaseOverlay';
import BaseParser from '../src/js/Parsers/BaseParser';

import test from 'tape';

test('Tests ValidateClass', assert => {
  const A = class {};
  const B = class extends A {};
  const C = class extends B {};
  const D = class {};
  
  assert.equal(ValidateClass(B, A), true, 'Should validate that class B inherits from class A');
  assert.equal(ValidateClass(C, A), true, 'Should validate that class C inherits from class A');
  assert.equal(ValidateClass(D, A), false, 'Should not validate that class D inherits from Class A');

  assert.end();
});

test('Tests ValidCreative', assert => {
  const { A, B, C } = setup(BaseCreative);

  assert.equal(ValidCreative(A), true, 'Should validate that A inherts from BaseCreative class');
  assert.equal(ValidCreative(B), false, 'Should not validate that B inherits from BaseCreative');
  
  try {
    ValidCreative(C);
  } catch(e) {
    assert.equal(e.toString(), 'Invalid creative provided. Should inherit from BaseCreative or VideoAd', 'Should throw error when class does not inherit from BaseCreative');
    assert.end();
  }  
});

test('Tests ValidOverlay', assert => {
  const { A, B, C } = setup(BaseOverlay);

  assert.equal(ValidOverlay(A), true, 'Should validate that A inherits from BaseOverlay');
  assert.equal(ValidOverlay(B), false, 'Should return false if undefined class provided');
  
  try {
    ValidOverlay(C);
  } catch(e) {
    assert.equal(e.toString(), 'Invalid overlay provided. Should inherit from BaseOverlay or SimpleControls', 'Should throw exception if subject class does not inherit from BaseOverlay');
    assert.end();
  }
});

test('Tests ValidParser', assert => {
  const { A, B, C } = setup(BaseParser);

  assert.equal(ValidParser(A), true, 'Should validate that A inherits from BaseParser');
  assert.equal(ValidParser(B), false, 'Should return false if undefined class provided');
  
  try {
    ValidParser(C);
  } catch(e) {
    assert.equal(e.toString(), 'Invalid parser provided. Should inherit from BaseParser or JSONParser', 'Should throw exception if subject class does not inherit from BaseParser');
    assert.end();
  }
});

function setup(BaseClass) {
  return {
    A: class extends BaseClass{},
    B: undefined, 
    C: class {}
  }
} 