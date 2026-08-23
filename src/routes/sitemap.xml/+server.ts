export const prerender = true;

import type { RequestHandler } from '@sveltejs/kit';

async function getBlogPosts() {
	const modules = import.meta.glob('/src/routes/blog/**/*.md');
	const posts = await Promise.all(
		Object.keys(modules).map(async (path) => {
			const slug = path.split('/').pop()?.replace(/\.md$/, '');
			return { slug };
		})
	);
	return posts;
}

export const GET: RequestHandler = async ({ url }) => {
	const baseUrl = url.origin;
	const staticPages = ['', '/blog', '/projects', '/contacts'];
	const blogPosts = await getBlogPosts();
	const blogUrls = blogPosts.map((post) => `/blog/${post.slug}`);
	const allPaths = [...staticPages, ...blogUrls];
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
