
// WIP class interface validator. Thinking about using https://www.npmjs.com/package/contracts-es6, but maybe overkill
// A valid alternative to the base class class is either
// a class that inherits from the base class or
// a class that implements the same methods and has the same properties of the base class

export const ClassValidator = (baseClass) => {
  return alternative => {
    alternative.prototype instanceof baseClass || 
    Object.getOwnPropertyNames(baseClass.prototype).reduce( (valid, propName) => {
      if(!valid) {
        return false;
      } else {
        return propName in alternative.prototype && typeof baseClass.prototype[propName] === typeof alternative.prototype[propName];
      }
    }, true);
  };
}