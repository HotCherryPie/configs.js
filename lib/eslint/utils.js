/* eslint-disable unicorn/no-array-reduce */

export const isObject = (it) => typeof it === 'object' && it !== null;

export function renamePluginScope(rules, from, to) {
  return Object.entries(rules).reduce((previous, [k, v]) => {
    const name = k.replace(from, to);
    previous[name] = v;
    return previous;
  }, {});
}

export const mergeObjects = (...objects) =>
  objects.reduce((result, current) => {
    for (const key of Object.keys(current)) {
      result[key] =
        isObject(result[key]) && isObject(current[key]) ?
          mergeObjects(result[key], current[key])
        : current[key];
    }

    return result;
  }, {});

export function mergeObjectsOrReduce(objectA, objectBOrReducer) {
  return typeof objectBOrReducer === 'function' ?
      objectBOrReducer(objectA)
    : mergeObjects(objectA, objectBOrReducer);
}
