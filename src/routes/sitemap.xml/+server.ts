export const prerender = true;

import { CONTACTS } from '$lib/contacts';
import { getAllPosts } from '$lib/posts';
import { getAllProjects } from '$lib/projects';
import type { RequestHandler } from '@sveltejs/kit';

const baseUrl = `https://${CONTACTS.site}`;

export const GET: RequestHandler = async () => {
	const staticPages = ['', '/blog', '/projects', '/contacts'];
	const blogUrls = getAllPosts().map((post) => `/blog/${post.slug}`);
	const projectUrls = getAllProjects().map((project) => `/projects/${project.slug}`);
	const allPaths = [...staticPages, ...blogUrls, ...projectUrls];

	const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
		.map(
			(path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${path === '' ? 1.0 : 0.8}</priority>
    </url>
  `
		)
		.join('')}
</urlset>`;
	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
