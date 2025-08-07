import {createFilter} from 'rollup-pluginutils';
import type {Plugin} from 'vite';

export default function fis3replace(
  options: {
    include?: any;
    exclude?: any;
    sourcemap?: boolean;
    sourceMap?: boolean;
  } = {}
): Plugin {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'fis3',
    enforce: 'pre',
    apply: 'serve',

    transform(code: string, id: string) {
      if (!filter(id)) return null;

      let hasReplacements = false;

      code = code.replace(/__uri\(\s*(['"])(.*?)\1\s*\)/g, (_, quote, target) => {
        hasReplacements = true;
        return `new URL(${quote}${target}${quote}, import.meta.url).href`;
      });

      code = code.replace(/__inline\(\s*(['"])(.*?)\1\s*\)/g, (_, quote, target) => {
        hasReplacements = true;
        const varname = target
          .replace(/[^a-zA-Z0-9]/g, '')
          .replace(/^\d+/, '');
        // Optionally, prepend import manually in the final code
        return `${varname}`;
      });

      if (!hasReplacements) return null;

      const result: any = { code };
      if (options.sourceMap !== false && options.sourcemap !== false)
        result.map = null;

      return result;
    }
  };
}
