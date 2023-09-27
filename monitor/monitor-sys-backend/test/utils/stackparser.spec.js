const StackParser = require('../../src/utils/stackparser')
const { resolve } = require('path')

const error = {
    stack: "TypeError: Cannot read properties of undefined (reading 'c')\n" +
    '    at getObject (http://localhost:9999/assets/index.8fadd256.js:144:4052)\n' +
    '    at http://localhost:9999/assets/index.8fadd256.js:144:4054',
    message: "Uncaught TypeError: Cannot read properties of undefined (reading 'c')",
    filename: 'http://localhost:9999/assets/index.8fadd256.js'
}

it('stackparser on-the-fly', async () => {

    const stackParser = new StackParser(__dirname)

    // 断言 
    expect(originStack[0]).toMatchObject(
        {
            source: 'webpack:///src/index.js',
            line: 24,
            column: 4,
            name: 'xxx'
        }
    )
})