import BaseCreative from '../Creatives/BaseCreative';
import BaseOverlay from '../Overlays/BaseOverlay';
import BaseParser from '../Parsers/BaseParser';

export const ValidateClass = (subject, parent) => {
  return subject.prototype instanceof parent;
};

export const ValidCreative = subject => {
  if(typeof subject === 'undefined') {
    return false;
  }

  if(ValidateClass(subject, BaseCreative)) {
    return true;
  } else {
    throw 'Invalid creative provided. Should inherit from BaseCreative or VideoAd';
  }
}

export const ValidOverlay = subject => {
  if(typeof subject === 'undefined') {
    return false;
  }

  if(ValidateClass(subject, BaseOverlay)) {
    return true;
  } else {
    throw 'Invalid overlay provided. Should inherit from BaseOverlay or SimpleControls';
  }
}

export const ValidParser = subject => {
  if(typeof subject === 'undefined') {
    return false;
  }

  if(ValidateClass(subject, BaseParser)) {
    return true;
  } else {
    throw 'Invalid parser provided. Should inherit from BaseParser or JSONParser';
  }
};