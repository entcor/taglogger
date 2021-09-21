# (E)tag logger

Simple logger for console output

## install

```javascript
    npm i etaglogger
```

## usage

```javascript
    // in first file:
    
    const TagLogger = require('etaglogger');
    const logd = TagLogger('file1');
    logd('test string', { data: 'test data' }, ['tag1']) // log message tagged by two tags: tag1, file1
    logd('test2 string', { data: 'test data' }, ['tag1', 'tag2']) // log message tagged by tags: tag1, tag2, file1

    // in second file
    const TagLogger = require('etaglogger');
    const logd = TagLogger('file2');
    ...
    logd('test3 string'); // tag: file2

```

Last variable of logd function can be array of tags.

After run you can enable logs by set DEBUG environment variable

```javascript
    DEBUG=!tag1,tag2,!file1,test // show logs only with tags test and ltag2
```

Exclamation mark use for disable tags withour remove it.

If all tags are disabled or DEBUG variable is not set - taglogger will be disabled.

## license

[MIT](./license.md)
