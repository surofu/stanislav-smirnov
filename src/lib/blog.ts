import type { Component } from 'svelte';
import type { PostModule, PostMeta } from './types';

const modules = import.meta.glob<PostModule>('/src/lib/blog/*.svelte', { eager: true });

export interface Post extends PostMeta {
	slug: string;
}

export function getAllPosts(): Post[] {
	return Object.entries(modules)
		.map(([path, mod]) => ({
			slug: path.split('/').pop()!.replace('.svelte', ''),
			...mod.metadata
		}))
		.filter((post) => post.published)
		.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostComponent(slug: string): { component: Component; meta: PostMeta } | null {
	const entry = Object.entries(modules).find(([path]) => path.endsWith(`/${slug}.svelte`));

	if (!entry) return null;

	const [, mod] = entry;

	if (mod.metadata.published === false) return null;

	return { component: mod.default, meta: mod.metadata };
}
