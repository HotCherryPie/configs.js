/* eslint-disable unicorn/no-array-reduce */

import type { UnknownRecord } from 'type-fest';

export const isObject = (it: unknown): it is UnknownRecord =>
  typeof it === 'object' && it !== null && !Array.isArray(it);

/**
 * Checks if value is `null` or `undefined`.
 */
// eslint-disable-next-line unicorn/no-null
export const isNil = (it: unknown) => it == null;

export const isNotEmptyArray = (it: unknown): it is [unknown, ...unknown[]] => {
  if (!Array.isArray(it)) return false;
  return it.length > 0;
};

export function renamePluginScope(
  rules: UnknownRecord,
  from: string,
  to: string,
) {
  return Object.entries(rules).reduce<UnknownRecord>((previous, [k, v]) => {
    const name = k.replace(from, to);
    previous[name] = v;
    return previous;
  }, {});
}

export const mergeObjects = (...objects: UnknownRecord[]) =>
  objects.reduce((result, current) => {
    for (const key of Object.keys(current)) {
      result[key] =
        isObject(result[key]) && isObject(current[key]) ?
          mergeObjects(result[key], current[key])
        : current[key];
    }

    return result;
  }, {});

export function mergeObjectsOrReduce(
  objectA: UnknownRecord,
  objectBOrReducer: UnknownRecord | ((it: UnknownRecord) => UnknownRecord),
) {
  return typeof objectBOrReducer === 'function' ?
      objectBOrReducer(objectA)
    : mergeObjects(objectA, objectBOrReducer);
}
