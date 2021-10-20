/*
  example:

  const Logger = require('etagLogger');
  const log = Logger('snmp');
  log(string, string, ['device$123']) //  формирует лог с тэгами tagLogger & device$123

  соответстенно этот лог включится при переменных окружения * или tagLogger или device$123
  DEBUG=s,d,f
*/

const processLogString = process.env.DEBUG;
const disabledLog = !processLogString || !processLogString.length;
const processLogTags = processLogString && processLogString.split(',').filter(el => el[0] !== '!'); // skip all starts from '!'

function Logger(tag) {
  return function (...params) {
    if (disabledLog) return;
    const lastItem = Array.isArray(params[params.length - 1]) && params[params.length - 1];
    const logItems = lastItem ? params.slice(0, -1) : params;
    const tags = [tag, ...(lastItem || [])];
    if (processLogTags.some(el => tags.includes(el))){
      const now = (new Date()).toLocaleString();
      const showItems = logItems
        .map(el => typeof el === 'function' ? el() : el)
        .map(el => typeof el === 'object' ? JSON.stringify(el) : el)
        .join(' ');
      console.log(`${now} [${tags.join(',')}] ${showItems}`);
    }
  }
}

// function parseTest(params) {
//   const items = [];
//   params
//     .split(';')
//     .filter(el => el[0] !== '!')
//     .map(filterRec => {
//       const andItems = filterRec.split('&');
//       andItems.forEach(andItem => {
//         if (andItem is array)
//       });
//     });
// }

if (require.main === module) {
  process.env.DEBUG = '!test,testlog,!a,!b';
  const test = Logger('test');
  test('test log string', ['testlog']);
}

// parseTest();

module.exports = Logger;
