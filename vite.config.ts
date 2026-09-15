import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				passes: 2
			},
			mangle: { toplevel: true }
		},
		cssMinify: 'lightningcss',
		sourcemap: false,
		assetsInlineLimit: 2048
	},
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false,
				strict: true
			}),
			extensions: ['.svelte'],
			prerender: {
				handleUnseenRoutes: 'ignore'
			}
		})
	]
});
