import { getAllPosts } from '$lib/blog';

export const prerender = true;

export function load() {
	return { posts: getAllPosts() };
}
