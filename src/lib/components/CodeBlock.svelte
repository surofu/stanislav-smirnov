<script lang="ts">
	let { code, language = 'text', filename = '' }: {
		code: string;
		language?: string;
		filename?: string;
	} = $props();
</script>

<div class="code-block my-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-[--color-code-bg] transition-colors">
	{#if filename}
		<div class="flex items-center gap-2 border-b border-slate-200 px-4 py-2 text-sm font-medium text-secondary dark:border-slate-700">
			<svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
			</svg>
			<span>{filename}</span>
			<span class="ml-auto text-xs text-secondary-light">{language}</span>
		</div>
	{/if}
	<pre class="overflow-x-auto p-4 text-sm"><code class="language-{language}">{code}</code></pre>
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
</style>
