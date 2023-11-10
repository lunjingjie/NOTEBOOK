import path from 'path';
import { common, iifePackage } from '../../rollup.base.config.js';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import rimraf from 'rimraf';
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corePath = path.join(__dirname, '../core');
rimraf(path.join(corePath, 'esm'), () => undefined);

const utilsPath = path.join(__dirname, '../utils');
rimraf(path.join(utilsPath, 'esm'), () => undefined);

const typePath = path.join(__dirname, '../types');
rimraf(path.join(typePath, 'esm'), () => undefined);

iifePackage.plugins = [
  ...common.plugins,
  alias({
    entries: [
      {
        find: '@monitor-sdk/core',
        replacement: path.join(corePath, 'src')
      },
      {
        find: '@monitor-sdk/utils',
        replacement: path.join(utilsPath, 'src')
      },
      {
        find: '@monitor-sdk/types',
        replacement: path.join(typePath, 'src')
      }
    ],
    customResolver: nodeResolve({ extensions: ['.tsx', '.ts'] })
  })
];

const footer = `if (window.__HEIMDALLR_OPTIONS__ && HEIMDALLR_BROWSER) {HEIMDALLR_BROWSER(window.__HEIMDALLR_OPTIONS__);}\n${iifePackage.output.footer}`;

export default [
  {
    ...iifePackage,
    output: {
      ...iifePackage.output,
      sourcemap: true,
      footer
    }
  }
];
