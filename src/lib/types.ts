import type { Component } from "svelte";
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
