module.exports = valueless;
module.exports.readStdin = readStdin;

function valueless(json, options) {
  var data = clone(json);
  options = options || {};
  prefix = options.prefix ? options.prefix + ':' : '';
  iterator(prefix, data, []);
  return data;
}

function iterator(prefix, value, path) {
  if (isArray(value)) {
    for (var i = 0, len = value.length; i < len; i++) {
      visitNode(prefix, value, path, i);
    }
  } else if (isObject(value)) {
    for (var i in value) {
      visitNode(prefix, value, path, i);
    }
  }
}

function visitNode(prefix, value, path, i) {
  if (isValue(value[i])) {
    value[i] = prefix + path.concat(i).join('.');
  } else {
    iterator(prefix, value[i], path.concat(i));
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

function isString(value) {
  return typeof value === 'string';
}

function readStdin(stdin, stdout, options) {
  var json = '';

  stdin.resume();
  stdin.on('data', onData);
  stdin.on('end', onEnd);

  function onData(buffer) {
    json += String(buffer);
  }

  function onEnd() {
    stdout.write(JSON.stringify(valueless(JSON.parse(json), options)));
  }
}
