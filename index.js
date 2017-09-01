module.exports = valueless;
module.exports.readStdin = readStdin;

function valueless(json) {
  var result = clone(json);
  iterator(result, []);
  return result;
}

function iterator(value, path) {
  if (isArray(value)) {
    for (var i = 0, len = value.length; i < len; i++) {
      if (isValue(value[i])) {
        value[i] = path.concat(i).join('.');
      } else {
        iterator(value[i], path.concat(i));
      }
    }
  } else if (isObject(value)) {
    for (var i in value) {
      if (isValue(value[i])) {
        value[i] = path.concat(i).join('.');
      } else {
        iterator(value[i], path.concat(i));
      }
    }
  }
}

function clone(json) {
  return JSON.parse(JSON.stringify(json));
}

function isValue(value) {
  return !isArray(value) && !isObject(value);
}

function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function readStdin(stdin, stdout) {
  var json = '';
  stdin.resume();
  stdin.on('data', onData);
  stdin.on('end', onEnd);

  function onData(buffer) {
    json += String(buffer);
  }
  function onEnd() {
    stdout.write(JSON.stringify(valueless(JSON.parse(json))));
  }
}
