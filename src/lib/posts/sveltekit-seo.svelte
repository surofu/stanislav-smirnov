<script module>
	export const metadata = {
		title: 'Пример поста',
		description: 'Демонстрация PostTable, PostImage и PostList',
		date: '2026-08-23',
		published: true
	};
</script>

<script>
	import { CodeBlock, PostTable, PostImage, PostList } from '$lib';
</script>

<p>Обычный markdown-подобный текст рендерится через <code>prose</code> из PostContent.</p>

<PostList
	items={['Первый пункт', 'Второй пункт', 'Третий пункт']}
/>

<PostTable
	headers={['Параметр', 'Значение']}
	rows={[
		['RAM', '1–2 ГБ'],
		['БД', 'PostgreSQL 18.4']
	]}
/>

<PostImage src="/images/example.jpg" alt="Пример" caption="Подпись к фото" />

<CodeBlock code={`fun main() {}`} language="kotlin" filename="Main.kt" />
