<script lang="ts">
	import { Seo, PostContent } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo title={data.meta.title} description={data.meta.description} type="article" />

<PostContent component={data.component} meta={data.meta} />
