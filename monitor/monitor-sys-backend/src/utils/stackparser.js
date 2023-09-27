const ErrorStackParser = require('error-stack-parser');
const path = require('path');
const fs = require('fs');
const { SourceMapConsumer } = require('source-map');

const consumers = {};
const sourceMapDir =
  'C:/Users/a/Desktop/monitor-demo/monitor-sys-backend/sourcemap/';

/**
 * 错误堆栈反序列化
 * @param {*} stack 堆栈
 * @param {*} message 消息
 */
const parseStackTrack = (stack, message) => {
  const error = new Error(message);
  error.stack = stack;
  const stackFrame = ErrorStackParser.parse(error);
  return stackFrame;
};

/**
 * 将错误栈中代码位置转换为源码位置
 * @param {*} stackFrame
 */
const getOriginalErrorStack = async stackFrame => {
  const origin = [];
  for (const v of stackFrame) {
    origin.push(await getOriginPosition(v));
  }

  Object.keys(consumers).forEach(key => {
    console.log('key', key);
    consumers[key].destroy();
  });

  return origin;
};

const getOriginPosition = async stackFrame => {
  const { columnNumber, lineNumber } = stackFrame;
  let { fileName } = stackFrame;
  fileName = path.basename(fileName);
  console.log('filebasename', fileName);

  let consumer = consumers[fileName];

  if (!consumer) {
    const sourceMapPath = sourceMapDir + fileName + '.map';
    if (!fs.existsSync(sourceMapPath)) {
      return stackFrame;
    }
    const content = fs.readFileSync(sourceMapPath, 'utf-8');
    consumer = await new SourceMapConsumer(content, null);
    consumers[fileName] = consumer;
  }

  const parseData = consumer.originalPositionFor({
    line: lineNumber,
    column: columnNumber,
  });
  return parseData;
};

module.exports = {
  parseStackTrack,
  getOriginalErrorStack,
  getOriginPosition,
};
