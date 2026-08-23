<!-- eslint-disable svelte/no-inner-declarations, svelte/valid-compile -->
<script lang="ts">
	import { Seo } from '$lib';

	interface ContactLink {
		label: string;
		value: string;
		href: string;
		icon: string;
	}

	const contacts: ContactLink[] = [
		{
			label: 'Email',
			value: 'stanislavsmwork@gmail.com',
			href: 'mailto:stanislavsmwork@gmail.com',
			icon: '/icon/gmail.svg'
		},
		{
			label: 'Telegram',
			value: '@smstanislav',
			href: 'https://t.me/smstanislav',
			icon: '/icon/telegram.svg'
		},
		{
			label: 'LinkedIn',
			value: 'in/surofu',
			href: 'https://linkedin.com/in/surofu',
			icon: '/icon/linkedin.svg'
		},
		{
			label: 'GitHub',
			value: 'surofu',
			href: 'https://github.com/surofu',
			icon: '/icon/github.svg'
		}
	];
</script>

<Seo
	title="Контакты"
	description="Свяжитесь со Stanislav Smirnov по email, Telegram, LinkedIn или GitHub, чтобы обсудить разработку сайта, CRM или Telegram-бота."
/>

<section class="flex h-full w-full items-center justify-center">
	<div class="w-full max-w-md">
		<h1 class="mb-4 text-2xl font-bold tracking-tight text-primary sm:text-3xl">Контакты</h1>
		<ul class="flex flex-col gap-1">
			{#each contacts as contact (contact.label)}
				<li>
					<a
						href={contact.href}
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-4 rounded-md px-2 py-3 transition-colors hover:bg-accent/10"
					>
						<span
							class="h-5 w-5 shrink-0 bg-secondary-light transition-colors group-hover:bg-accent"
							style="
								mask-image: url('{contact.icon}');
								mask-size: contain;
								mask-repeat: no-repeat;
								mask-position: center;
								-webkit-mask-image: url('{contact.icon}');
								-webkit-mask-size: contain;
								-webkit-mask-repeat: no-repeat;
								-webkit-mask-position: center;
							"
						></span>
						<span class="flex flex-col leading-tight">
							<span class="text-sm text-secondary">{contact.label}</span>
							<span class="text-primary group-hover:text-accent">
								{contact.value}
							</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
