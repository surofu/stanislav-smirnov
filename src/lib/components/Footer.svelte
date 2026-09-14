<script lang="ts">
	import { resolve } from '$app/paths';
	import logo from '$lib/assets/favicon.svg';
	import type { RouteId, ResolvedPathname } from '$app/types';
	import { CONTACTS } from '$lib/contacts';

	type StaticRouteId = Exclude<RouteId, `${string}[${string}`>;

	interface NavItem {
		label: string;
		href: StaticRouteId;
	}

	interface SocialLink {
		label: string;
		icon: string;
		href: string;
	}

	const navItems: NavItem[] = [
		{ label: 'Главная', href: '/' },
		{ label: 'Блог', href: '/blog' },
		{ label: 'Проекты', href: '/projects' },
		{ label: 'Контакты', href: '/contacts' }
	];

	const socialLinks: SocialLink[] = [
		{ label: 'Email', icon: '/icon/gmail.svg', href: `mailto:${CONTACTS.email}` },
		{ label: 'Telegram', icon: '/icon/telegram.svg', href: `https://t.me/${CONTACTS.telegram}` },
		{
			label: 'Instagram',
			icon: '/icon/instagram.svg',
			href: `https://www.instagram.com/${CONTACTS.instagram}`
		},
		{ label: 'LinkedIn', icon: '/icon/linkedin.svg', href: `https://linkedin.com/in/${CONTACTS.linkedin}` },
		{ label: 'GitHub', icon: '/icon/github.svg', href: `https://github.com/${CONTACTS.github}` }
	];

	const year = new Date().getFullYear();
</script>

<footer class="w-full border-t border-slate-200 bg-primary-bg dark:border-slate-700">
	<div
		class="app-container flex flex-col gap-8 px-4 py-10 sm:flex-row sm:justify-between sm:gap-10 sm:px-8 sm:py-12"
	>
		<div class="max-w-sm">
			<a href={resolve('/')} class="flex items-center gap-2">
				<img src={logo} alt="Stanislav Smirnov" class="h-7 w-7" />
				<span class="font-medium text-primary">Stanislav Smirnov</span>
			</a>
			<p class="mt-3 text-sm text-secondary">
				Разработка онлайн-магазинов и CRM-систем для малого и среднего бизнеса — от заявки до
				запуска без посредников.
			</p>
		</div>
		<nav class="flex flex-col gap-2 text-sm">
			<span class="font-medium text-primary">Навигация</span>
			{#each navItems as item (item.href)}
				<a href={resolve(item.href)} class="text-secondary transition-colors hover:text-accent">
					{item.label}
				</a>
			{/each}
		</nav>
		<div class="flex flex-col gap-3">
			<span class="text-sm font-medium text-primary">Связаться</span>
			<div class="flex flex-wrap gap-3">
				{#each socialLinks as social (social.label)}
				    <a
						href={social.href as ResolvedPathname}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={social.label}
						class="group flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-primary-bg transition-transform hover:-translate-y-0.5 dark:border-slate-700"
					>
						<span
							class="h-4 w-4 shrink-0 bg-secondary-light transition-colors group-hover:bg-accent"
							style="
								mask-image: url('{social.icon}');
								mask-size: contain;
								mask-repeat: no-repeat;
								mask-position: center;
								-webkit-mask-image: url('{social.icon}');
								-webkit-mask-size: contain;
								-webkit-mask-repeat: no-repeat;
								-webkit-mask-position: center;
							"
						></span>
					</a>
				{/each}
			</div>
		</div>
	</div>
	<div>
		<div
			class="app-container flex flex-col gap-2 px-4 pb-10 text-xs text-secondary sm:flex-row sm:justify-between sm:px-8"
		>
			<span>© {year} Stanislav Smirnov. Все права защищены.</span>
		</div>
	</div>
</footer>
