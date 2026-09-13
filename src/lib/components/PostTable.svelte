<script lang="ts">
	let { headers, rows }: { headers: string[]; rows: (string | number)[][] } = $props();
</script>

<div class="not-prose my-8 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
	<table class="w-full border-collapse text-sm">
		<thead>
			<tr class="bg-primary-bg">
				{#each headers as header}
					<th
						class="border-b border-slate-200 px-4 py-3 text-left font-semibold text-primary dark:border-slate-700"
					>
						{header}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row}
				<tr class="border-b border-slate-200 last:border-0 dark:border-slate-700">
					{#each row as cell}
						<td class="px-4 py-3 text-secondary">{cell}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
