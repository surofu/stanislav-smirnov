<script lang="ts">
	import { fade } from 'svelte/transition';

	let { src, alt, caption }: { src: string; alt: string; caption?: string } = $props();

	let zoomed = $state(false);

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
			class="relative h-72 w-full overflow-hidden rounded-lg border border-slate-200 shadow-lg sm:h-96 lg:h-[28rem] dark:border-slate-700"
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
				class="absolute inset-0 h-full w-full cursor-zoom-in"
				aria-label="Открыть изображение на весь экран"
		>
			<img {src} {alt} loading="lazy" width="1200" height="600" class="relative z-10 h-full w-full object-contain" />
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