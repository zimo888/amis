import { defineConfig } from '@rsbuild/core';
import * as path from 'path'
import { dirname } from 'node:path';
import { fileURLToPath } from 'url'
import { pluginMdx } from "@rsbuild/plugin-mdx";
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginReact } from '@rsbuild/plugin-react';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default defineConfig({
  source: {
    entry: {
      index: './index.jsx',
    },
    decorators: {
      version: 'legacy',
    }
  },
  resolve: {
    alias: {
      "amis-theme-editor-helper$": path.resolve(__dirname, '../packages/amis-theme-editor-helper/src'),
      "amis-formula$": path.resolve(__dirname, '../packages/amis-formula/src'),
      "amis-core$": path.resolve(__dirname, '../packages/amis-core/src'),
      "amis$": path.resolve(__dirname, '../packages/amis/src'),
      "amis-ui$": path.resolve(__dirname, '../packages/amis-ui/src'),
      "amis-ui/lib": path.resolve(__dirname, '../packages/amis-ui/src'),
    }
  },
  server: {
    port: 8887
  },
  html: {
    template() {
      return path.resolve(__dirname, './index.html')
    },
    inject: 'body',
  },
  plugins: [
    pluginReact(),
    // pluginMdx(),
    pluginNodePolyfill(),
    pluginSvgr({
      svgrOptions: {
        exportType: 'default',
      },
    }),
    pluginSass({
      sassLoaderOptions: {
        sassOptions: {
          quietDeps: true,
          silenceDeprecations: [
            'call-string',
            'elseif',
            'moz-document',
            'relative-canonical',
            'new-global',
            'color-module-compat',
            'slash-div',
            'bogus-combinators',
            'strict-unary',
            'function-units',
            'duplicate-var-flags',
            'null-alpha',
            'abs-percent',
            'fs-importer-cwd',
            'css-function-mixin',
            'mixed-decls',
            'feature-exists',
            'color-4-api',
            'color-functions',
            'legacy-js-api',
            'import',
            'global-builtin'
          ]
        }
      }
    }),
  ],
  tools: {
    rspack: (config, { mergeConfig, appendRules }) => {
      appendRules({
        test: /\.[jt]sx?$/,
        loader: './fis3.rs.js',
      })
      appendRules({
        test: /\.md?$/,
        loader: './markdownPlugin.rs.js',
      })
      return mergeConfig(config, {
        module: {
          parser: {
            javascript: {
              //忽略 import type
              exportsPresence: false
            }
          }
        }
      })
    }
  }
})