<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	type RoutePath = Parameters<typeof resolve>[0];

	interface NavItem {
		label: string;
		href: RoutePath;
	}

	const homeItem: NavItem = { label: 'Главная', href: '/' };

	const navItems: NavItem[] = [
		{ label: 'Блог', href: '/blog' },
		{ label: 'Проекты', href: '/projects' },
		{ label: 'Контакты', href: '/contacts' }
	];

	const allItems = [homeItem, ...navItems];

	let linkEls: Record<string, HTMLAnchorElement> = {};
	let indicatorLeft = $state(0);
	let indicatorWidth = $state(0);
	let ready = $state(false);
	let mobileOpen = $state(false);

	let pathname = $derived(page.url.pathname);

	function updateIndicator() {
		const active = allItems.find((item) => resolve(item.href) === pathname) ?? homeItem;
		const el = linkEls[active.href];
		if (!el) return;

		indicatorLeft = el.offsetLeft;
		indicatorWidth = el.offsetWidth;
		ready = true;
	}

	$effect(() => {
		updateIndicator();
	});

	afterNavigate(() => {
		updateIndicator();
		mobileOpen = false;
	});
</script>

<svelte:window onresize={updateIndicator} />

<div class="relative flex items-center justify-between gap-4">
	<!-- Десктоп-навигация -->
	<nav class="relative hidden flex-1 items-center gap-4 sm:flex">
		<span
			class="absolute -bottom-px h-0.5 bg-accent transition-all duration-300 ease-out"
			class:opacity-0={!ready}
			style="left: {indicatorLeft}px; width: {indicatorWidth}px;"
		></span>

		<a href={resolve(homeItem.href)} bind:this={linkEls[homeItem.href]} class="text-nowrap">
			{homeItem.label}
		</a>

		<span class="w-full"></span>

		{#each navItems as item (item.href)}
			<a href={resolve(item.href)} bind:this={linkEls[item.href]} class="text-nowrap">
				{item.label}
			</a>
		{/each}
	</nav>

	<!-- Заголовок на мобильных (десктоп-нав скрыта) -->
	<a href={resolve(homeItem.href)} class="text-nowrap sm:hidden">
		{homeItem.label}
	</a>

	<div class="flex items-center gap-2">
		<ThemeToggle />

		<button
			type="button"
			class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-primary sm:hidden dark:border-slate-700"
			aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
			aria-expanded={mobileOpen}
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				class="h-4 w-4"
			>
				{#if mobileOpen}
					<path d="M6 6l12 12M18 6L6 18" />
				{:else}
					<path d="M4 7h16M4 12h16M4 17h16" />
				{/if}
			</svg>
		</button>
	</div>
</div>

{#if mobileOpen}
	<nav
		class="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:hidden dark:border-slate-700"
	>
		{#each allItems as item (item.href)}
			<a
				href={resolve(item.href)}
				class="text-secondary transition-colors hover:text-accent"
				class:text-accent={resolve(item.href) === pathname}
			>
				{item.label}
			</a>
		{/each}
	</nav>
{/if}
