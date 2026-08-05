<script lang="ts">
	let isDark = $state(false);

	// $effect выполняется только в браузере — на сервере состояние не читаем,
	// синхронный флеш темы уже сделан инлайн-скриптом в app.html.
	$effect(() => {
		isDark = document.documentElement.classList.contains('dark');
	});

	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
		try {
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
		} catch {
			/* localStorage недоступен (приватный режим и т.п.) — просто не сохраняем выбор */
		}
	}
</script>

<button
	type="button"
	onclick={toggleTheme}
	aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
	aria-pressed={isDark}
	class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-primary transition-colors hover:border-accent dark:border-slate-700"
>
	{#if isDark}
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-4 w-4"
		>
			<circle cx="12" cy="12" r="4" />
			<path
				d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
			/>
		</svg>
	{:else}
		<svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
		</svg>
	{/if}
</button>
