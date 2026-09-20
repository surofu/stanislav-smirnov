<script lang="ts">
	import { fade } from 'svelte/transition';

	let {
		src,
		alt,
		caption,
		aspectRatio = 'auto'
	}: { src: string; alt: string; caption?: string; aspectRatio?: string } = $props();

	let zoomed = $state(false);

	// ratio as width/height number; null = no cap (natural size)
	let ratio = $derived.by(() => {
		if (aspectRatio === 'auto') return null;
		const [w, h] = aspectRatio.split('/').map(Number);
		return w / h;
	});

	function toggleZoom() {
		zoomed = !zoomed;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') zoomed = false;
	}

	$effect(() => {
		document.body.style.overflow = zoomed ? 'hidden' : '';
	});
</script>

<svelte:window onkeydown={onKeydown} />

<figure class="not-prose my-8">
	<div
			style="container-type: inline-size;"
			class="relative w-full overflow-hidden rounded-lg border border-slate-200 shadow-lg dark:border-slate-700"
	>
		<img
				{src}
				alt=""
				aria-hidden="true"
				loading="lazy"
				width="1200"
				height="500"
				class="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover blur-2xl select-none"
		/>
		<button
				type="button"
				onclick={toggleZoom}
				class="relative z-10 block w-full cursor-zoom-in"
				aria-label="Открыть изображение на весь экран"
		>
			<img
					{src}
					{alt}
					loading="lazy"
					width="1200"
					height="600"
					style={ratio ? `max-height: calc(100cqw / ${ratio});` : ''}
					class="h-auto w-full object-cover"
			/>
		</button>
	</div>
	{#if caption}
		<figcaption class="mt-3 text-center text-sm text-secondary">{caption}</figcaption>
	{/if}
</figure>

{#if zoomed}
	<div
			transition:fade={{ duration: 150 }}
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
	>
		<button
				type="button"
				onclick={toggleZoom}
				class="absolute inset-0 h-full w-full cursor-zoom-out"
				aria-label="Закрыть изображение"
		></button>
		<img
				{src}
				{alt}
				width="1920"
				height="960"
				class="pointer-events-none relative z-10 max-h-full max-w-full object-contain"
		/>
	</div>
{/if}