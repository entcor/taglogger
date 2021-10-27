/*
  example:

  const Logger = require('etagLogger');
  const log = Logger('snmp');
  log(string, string, ['device$123']) //  формирует лог с тэгами tagLogger & device$123

  соответстенно этот лог включится при переменных окружения * или tagLogger или device$123
  DEBUG=s,d,f
*/


const processLogTags = prepareChecker(process.env.DEBUG); // skip all starts from '!'
const disabledLog = !processLogTags || !processLogTags.length;

function Logger(tag) {
  return function (...params) {
    if (disabledLog) return;
    const lastItem = Array.isArray(params[params.length - 1]) && params[params.length - 1];
    const logItems = lastItem ? params.slice(0, -1) : params;
    const tags = [tag, ...(lastItem || [])];
    if (checkTags(tags)) {
      const now = (new Date()).toLocaleString();
      const showItems = logItems
        .map(el => typeof el === 'function' ? el() : el)
        .map(el => typeof el === 'object' ? JSON.stringify(el) : el)
        .join(' ');
      console.log(`${now} [${tags.join(',')}] ${showItems}`);
    }
  }
}

function checkTags(tags) {
  return processLogTags.some(tagItem => { // tagItem = array of "and" tags
    return tagItem.every(el => tags.includes(el));
  })
}

function prepareChecker(debugString) {
  if (!debugString || !debugString.length) return;

  const items = debugString.split(';').filter(el => el[0] !== '!');
  return items.map(el => {
    const subItems = el.split(',').filter(sitem => !!sitem);
    return subItems;
  });
}

// if (require.main === module) {
//   console.log('run test');
//   process.env.DEBUG = '!test;testlog,test;!b;hahaha';
//   const test = Logger('test');
//   test('test log string', ['testlog']);
// }

module.exports = Logger;
