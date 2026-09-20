export const prerender = true;

import { CONTACTS } from '$lib/types';
import { getAllPosts } from '$lib/blog';
import { getAllProjects } from '$lib/projects';
import type { RequestHandler } from '@sveltejs/kit';

const baseUrl = `https://${CONTACTS.site}`;

export const GET: RequestHandler = async () => {
	const projectLines = getAllProjects()
		.map((p) => `- [${p.title}](${baseUrl}/projects/${p.slug}): ${p.description}`)
		.join('\n');

	const postLines = getAllPosts()
		.map((p) => `- [${p.title}](${baseUrl}/blog/${p.slug}): ${p.description}`)
		.join('\n');

	const body = `# ${CONTACTS.site}

> Разработка интернет-магазинов и CRM-систем для малого и среднего бизнеса. Без посредников — от заявки до запуска.

## О разработчике

5 лет разработки и автоматизации: онлайн-оплата, учёт заказов, каталог товаров, CRM для клиентов, отчёты и аналитика.

## Contacts

- Email: ${CONTACTS.email}
- Telegram: [@${CONTACTS.telegram}](https://t.me/${CONTACTS.telegram})
- Instagram: [@${CONTACTS.instagram}](https://www.instagram.com/${CONTACTS.instagram})
- LinkedIn: [in/${CONTACTS.linkedin}](https://linkedin.com/in/${CONTACTS.linkedin})
- GitHub: [${CONTACTS.github}](https://github.com/${CONTACTS.github})

## Projects

${projectLines}

## Blog

${postLines}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
