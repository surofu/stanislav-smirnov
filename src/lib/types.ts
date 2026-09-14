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

export const PROJECT_CATEGORIES = {
  landing: 'Лендинги и сайты-визитки',
	shop: 'Интернет-магазины',
	crm: 'CRM и админ-панели',
} as const;

export type ProjectCategory = keyof typeof PROJECT_CATEGORIES;

export interface ProjectModule {
	default: Component;
	metadata: ProjectMeta;
}

export interface ProjectMeta {
	title: string;
	description: string;
	date: string;
	published: boolean;
	category: ProjectCategory;
	link?: string;
	stack?: string[];
}
