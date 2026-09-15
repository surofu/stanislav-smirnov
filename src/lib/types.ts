import type { Component } from 'svelte';
import type { RouteId } from '$app/types';

export type StaticRouteId = Exclude<RouteId, `${string}[${string}`>;

export interface PostModule {
	default: Component;
	metadata: PostMeta;
}

export interface PostMeta {
	title: string;
	description: string;
	date: string;
	published: boolean;
}

export const CONTACTS = {
	site: 'stanislav-smirnov.tech',
	email: 'stanislavsmwork@gmail.com',
	telegram: 'smstanislav',
	instagram: 'stanislavsmtech',
	linkedin: 'surofu',
	github: 'surofu'
} as const;

export const PROJECT_CATEGORIES = {
	crm: 'CRM-системы',
	shop: 'Интернет-магазины',
	landing: 'Лендинги и сайты-визитки',
} as const;

export type ProjectCategory = keyof typeof PROJECT_CATEGORIES;

export interface ProjectModule {
	default: Component;
	metadata: ProjectMeta;
}

export interface ProjectMeta {
	title: string;
	description: string;
	image: string | null;
	date: string;
	published: boolean;
	category: ProjectCategory;
	link?: string;
	stack?: string[];
}
