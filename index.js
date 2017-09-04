module.exports = valueless;
module.exports.readStdin = readStdin;

function valueless(json, options) {
  options = options || {};
  var data = clone(json);
  var prefix = options.prefix ? options.prefix + ':' : '';
  var excludes = (options.excludes || []).reduce(indexByValue, {});
  iterator(prefix, excludes, data, []);
  return data;
}

function iterator(prefix, excludes, value, path) {
  if (isArray(value)) {
    for (var i = 0, len = value.length; i < len; i++) {
      visitNode(prefix, excludes, value, path, i);
    }
  } else if (isObject(value)) {
    for (var i in value) {
      visitNode(prefix, excludes, value, path, i);
    }
  }
}

function visitNode(prefix, excludes, value, path, i) {
  if (isValue(value[i])) {
    value[i] = i in excludes ? value[i] : prefix + path.concat(i).join('.');
  } else {
    iterator(prefix, excludes, value[i], path.concat(i));
  }
}

function indexByValue(index, value) {
  index[value] = value;
  return index;
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
