<!-- eslint-disable svelte/no-inner-declarations, svelte/valid-compile -->
<script lang="ts">
    import type {ResolvedPathname} from '$app/types';
    import {Seo} from '$lib';
    import GridDots from '$lib/components/GridDots.svelte';
    import {CONTACTS} from '$lib/types';

    interface ContactLink {
        label: string;
        value: string;
        href: string;
        icon: string;
    }

    const contacts: ContactLink[] = [
        {
            label: 'Email',
            value: CONTACTS.email,
            href: `mailto:${CONTACTS.email}`,
            icon: '/icon/gmail.svg'
        },
        {
            label: 'Telegram',
            value: `@${CONTACTS.telegram}`,
            href: `https://t.me/${CONTACTS.telegram}`,
            icon: '/icon/telegram.svg'
        },
        {
            label: 'Instagram',
            value: `@${CONTACTS.instagram}`,
            href: `https://www.instagram.com/${CONTACTS.instagram}`,
            icon: '/icon/instagram.svg'
        },
        {
            label: 'LinkedIn',
            value: `in/${CONTACTS.linkedin}`,
            href: `https://linkedin.com/in/${CONTACTS.linkedin}`,
            icon: '/icon/linkedin.svg'
        },
        {
            label: 'GitHub',
            value: CONTACTS.github,
            href: `https://github.com/${CONTACTS.github}`,
            icon: '/icon/github.svg'
        }
    ];
</script>

<Seo
        title="Контакты"
        description="Свяжитесь со Stanislav Smirnov по email, Telegram, Instagram, LinkedIn или GitHub, чтобы обсудить разработку онлайн-магазина или CRM-системы для бизнеса."
/>

<section class="flex h-full w-full items-center justify-center">
    <div class="w-full max-w-md">
        <h1 class="mb-4 text-2xl font-bold tracking-tight text-primary sm:text-3xl">Контакты</h1>
        <ul class="flex flex-col gap-1">
            {#each contacts as contact (contact.label)}
                <li>
                    <a
                            href={contact.href as ResolvedPathname}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="group flex items-center gap-4 rounded-md px-4 py-3 transition-colors hover:bg-accent/10"
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

<GridDots/>
