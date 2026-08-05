<script lang="ts">
	import './layout.css';
	import {Navbar, Footer, GridDots} from '$lib';

	let { children } = $props();
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- статичный JSON-LD, без пользовательского ввода -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Stanislav Smirnov',
		jobTitle: 'Full-stack разработчик',
		description:
				'Разработка сайтов, интернет-магазинов, CRM и Telegram-ботов для бизнеса и частных специалистов.',
		sameAs: ['https://github.com/surofu', 'https://t.me/smstanislav', 'https://linkedin.com/in/surofu']
	})}<` + `/script>`}
</svelte:head>

<div class="app-wrapper">
	<div class="app-container px-4 py-6 sm:p-8">
		<Navbar />
		<main class="py-16 h-full">
			{@render children()}
		</main>
		<GridDots />
	</div>
	<Footer />
</div>