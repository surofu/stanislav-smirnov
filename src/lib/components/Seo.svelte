<script lang="ts">
	import { page } from '$app/state';
	import {CONTACTS} from "$lib/types";

	interface Props {
		title: string;
		description: string;
		image?: string;
		type?: 'website' | 'article';
	}

	let { title, description, image = '/images/avatar.avif', type = 'website' }: Props = $props();

	const siteName = 'Stanislav Smirnov';
	const SITE_URL = `https://${CONTACTS.site}`;

	let fullTitle = $derived(title.includes(siteName) ? title : `${title} — ${siteName}`);
	let canonical = $derived(new URL(page.url.pathname, SITE_URL).toString());
	let absoluteImage = $derived(new URL(image, SITE_URL).toString());
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={absoluteImage} />
	<meta property="og:locale" content="ru_RU" />
	<meta property="og:site_name" content={siteName} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={absoluteImage} />
</svelte:head>
