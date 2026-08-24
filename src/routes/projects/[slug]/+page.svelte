<script lang="ts">
	import { Seo, ProjectContent } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo title={data.meta.title} description={data.meta.description} type="article" />

<ProjectContent component={data.component} meta={data.meta} />
