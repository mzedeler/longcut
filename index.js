'use strict';

function longcut(obj) {
  function result(path) {
    let _arguments = Array.prototype.slice.call(arguments);
    if(obj === undefined || obj === null) {
      return longcut(obj);
    }
    if(path instanceof Function) {
      let result;
      let add;
      if(obj instanceof Array) {
        result = [];
        add = (k, v) => { result.push(v); };
      } else {
        result = {};
        add = (k, v) => { result[k] = v; };
      }
      for(let k in obj) {
        let v = path(obj[k], k, obj);
        if(v) {
          add(k, v);
        }
      }
      return longcut(result);
    } else if(path instanceof RegExp) {
      if(obj instanceof Array) {
        return longcut(obj)((v) => { return path.test(v) ? v : undefined });
      } else if(obj instanceof Object) {
        return longcut(obj)((v, k) => { return path.test(k) ? v : undefined });
      } else if(typeof obj === 'string') {
        return longcut(obj.replace.apply(obj, _arguments));
      } else {
        throw new Error("Unsupported object type for RexExp match: " + typeof obj);
      }
    } else {
      return longcut(obj[path]);
    }
  }
  
  result.val = () => {
    return obj;
  };
  
  return result;
}

module.exports.longcut = longcut;

