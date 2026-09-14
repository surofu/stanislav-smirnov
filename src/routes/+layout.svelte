<script lang="ts">
	import './layout.css';
	import {Navbar, Footer} from '$lib';
	import { CONTACTS } from '$lib/contacts';

	let { children } = $props();
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- статичный JSON-LD, без пользовательского ввода -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Stanislav Smirnov',
		jobTitle: 'Разработчик интернет-магазинов и CRM-систем',
		description:
				'Разработка онлайн-магазинов и CRM-систем для малого и среднего бизнеса.',
		sameAs: [`https://www.instagram.com/${CONTACTS.instagram}`, `https://linkedin.com/in/${CONTACTS.linkedin}`, `https://github.com/${CONTACTS.github}`, `https://t.me/${CONTACTS.telegram}`]
	})}<` + `/script>`}
</svelte:head>

<div class="app-wrapper">
	<div class="app-container px-4 py-6 sm:p-8">
		<Navbar />
		<main class="py-16 h-full">
			{@render children()}
		</main>
	</div>
	<Footer />
</div>
