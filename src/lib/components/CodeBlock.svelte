<script lang="ts">
	import Prism from 'prismjs';
	import 'prismjs/components/prism-clike';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-kotlin';
	import 'prismjs/components/prism-bash';
	import 'prismjs/components/prism-yaml';
	import 'prismjs/components/prism-sql';
	import 'prismjs/components/prism-docker';
	import 'prismjs/components/prism-nginx';

	let { code, language = 'text', filename = '' }: {
		code: string;
		language?: string;
		filename?: string;
	} = $props();

	const grammar = $derived(Prism.languages[language]);
	const highlighted = $derived(grammar ? Prism.highlight(code, grammar, language) : code);

	let copied = $state(false);
	let copyTimeout: ReturnType<typeof setTimeout>;

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			clearTimeout(copyTimeout);
			copyTimeout = setTimeout(() => (copied = false), 2000);
		} catch {
			// clipboard API недоступен (напр. без HTTPS) — молча игнорируем
		}
	}
</script>

<div class="code-block my-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-[--color-code-bg] transition-colors">
	<div class="flex items-center gap-2 border-b border-slate-200 px-4 py-2 text-sm font-medium text-secondary dark:border-slate-700">
		{#if filename}
			<svg class="size-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
			</svg>
			<span>{filename}</span>
		{/if}
		<span class="text-xs text-secondary-light" class:ml-auto={!filename}>{language}</span>

		<button
			type="button"
			onclick={copyCode}
			class="ml-auto flex items-center gap-1 rounded-md px-2 py-1 text-xs text-secondary transition-colors hover:bg-primary hover:text-primary-inverse"
			class:ml-2={filename}
			aria-label="Скопировать код"
		>
			{#if copied}
				<svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
				</svg>
				Скопировано
			{:else}
				<svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
				</svg>
				Копировать
			{/if}
		</button>
	</div>

	<pre class="overflow-x-auto p-4 text-sm"><code class="language-{language}">{@html highlighted}</code></pre>
</div>

<style>
	.code-block pre {
		margin: 0;
		background: transparent;
		color: var(--color-code-text);
	}

	.code-block code {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 0.875rem;
		line-height: 1.7;
	}

	/* токены Prism — цвета завязаны на существующие переменные проекта */
	.code-block :global(.token.comment),
	.code-block :global(.token.prolog),
	.code-block :global(.token.doctype) {
		color: var(--color-secondary-light);
		font-style: italic;
	}

	.code-block :global(.token.keyword),
	.code-block :global(.token.selector),
	.code-block :global(.token.important) {
		color: var(--color-accent);
		font-weight: 600;
	}

	.code-block :global(.token.string),
	.code-block :global(.token.attr-value) {
		color: var(--color-accent-2);
	}

	.code-block :global(.token.function),
	.code-block :global(.token.class-name) {
		color: oklch(65% 0.19 40);
	}

	.code-block :global(.token.number),
	.code-block :global(.token.boolean),
	.code-block :global(.token.constant) {
		color: oklch(65% 0.17 300);
	}

	.code-block :global(.token.punctuation),
	.code-block :global(.token.operator) {
		color: var(--color-secondary);
	}

	.code-block :global(.token.property),
	.code-block :global(.token.tag),
	.code-block :global(.token.attr-name) {
		color: oklch(65% 0.15 220);
	}
</style>
