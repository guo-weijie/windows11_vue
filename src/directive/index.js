import { drag } from './drag.js'

const directiveObj = {
  drag
}

export function myDirective(app) {
  for (let key in directiveObj) {
    app.directive(key, directiveObj[key])
  }
}