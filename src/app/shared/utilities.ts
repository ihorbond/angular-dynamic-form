import { camelCase, flatten } from 'lodash'
import Page from './models/page';
import Question from './models/question';

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

function extractQuestions(pages: Page[]): Question[] {
  return pages.reduce((acc, val) => {
    const sections = val.sections;
    const questions = flatten(sections.map(x => x.questions))
    return [...acc, ...questions];
  }, [])
}

export {
  normalizeData,
  extractQuestions
}
