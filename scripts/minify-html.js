import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { minify } from 'html-minifier-terser';

const DIR = 'build';

async function walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const p = join(dir, entry.name);
		if (entry.isDirectory()) await walk(p);
		else if (entry.name.endsWith('.html')) {
			const html = await readFile(p, 'utf-8');
			const min = await minify(html, {
				collapseWhitespace: true,
				removeComments: true,
				minifyCSS: true,
				minifyJS: true,
				removeAttributeQuotes: true
			});
			await writeFile(p, min);
		}
	}
}

walk(DIR);
