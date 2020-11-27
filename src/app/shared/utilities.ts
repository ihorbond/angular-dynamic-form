import { camelCase } from 'lodash'

function normalizeData<T>(obj: any): T {
  return Object.keys(obj).reduce((acc, key) => {
    const val = obj[key];
    const camelCaseKey = camelCase(key)

    if (Array.isArray(val)) {
      acc[camelCaseKey] = val.map(normalizeData);
    }
    else if (val !== null && typeof val === 'object') {
      acc[camelCaseKey] = normalizeData(val);
    }
    else {
      acc[camelCaseKey] = val;
    }

    return acc;
  }, {} as T)
}

export {
  normalizeData
}
