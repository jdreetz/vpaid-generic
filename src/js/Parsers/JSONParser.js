import BaseParser from './BaseParser';

export default class JSONParser extends BaseParser {
  static parseAdParameters(parametersString) {
    return JSON.parse(parametersString);
  }
}