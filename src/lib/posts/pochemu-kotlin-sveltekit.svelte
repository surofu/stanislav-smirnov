<script module>
	export const metadata = {
		title: 'Почему для монолита мы выбрали Kotlin/Spring Boot + SvelteKit',
		description:
			'Разбираем архитектурные решения для небольшого продакшн-проекта на скромном VPS: аутентификация через BFF, Spring Data JDBC вместо JPA и гибридный рендеринг в SvelteKit.',
		date: '2026-08-23',
		published: false
	};
</script>

<script>
	import { CodeBlock, PostTable, PostImage, PostList } from '$lib';
</script>

<p>
	Когда проект — это монолит на VPS с 1–2 ГБ оперативной памяти, а не распределённая система на
	десяток сервисов, выбор стека определяется не модой, а прагматикой. Ниже — разбор связки,
	которая у нас прижилась: <code>Kotlin</code> + <code>Spring Boot</code> на бэкенде и
	<code>SvelteKit</code> на фронтенде.
</p>

<h2>Почему не JPA, а Spring Data JDBC</h2>

<p>
	Главная причина — предсказуемость. JPA с его отложенной загрузкой и кэшем первого уровня удобна,
	пока проект маленький, и превращается в источник трудноуловимых багов и лишнего потребления
	памяти, когда агрегаты растут. Spring Data JDBC заставляет явно думать о границах агрегата и не
	тянет в память лишнего.
</p>

<PostList
	items={[
		'Явные границы агрегата — нет соблазна лениво подгрузить пол-базы одним обращением',
		'Меньше "магии" — SQL-запросы предсказуемы и легко профилируются',
		'Ниже накладные расходы на heap — нет кэша первого уровня и прокси-объектов Hibernate',
		'Проще тестировать — Testcontainers с реальным Postgres, без сюрпризов маппинга'
	]}
/>

<PostImage
	src="https://picsum.photos/seed/aggregate-boundary/1200/630"
	alt="Схема границ агрегата в Spring Data JDBC"
	caption="Order как корень агрегата, OrderItem — часть, без отдельного репозитория"
/>

<h2>Аутентификация: BFF, а не JWT в localStorage</h2>

<p>
	SvelteKit выступает Backend-For-Frontend: браузер получает только HTTP-only сессионную куку,
	а JWT никогда не попадает в клиентский JS. Сам Spring Boot — чистый Resource Server, он ничего
	не знает про куки и валидирует токен по публичному ключу.
</p>

<PostTable
	headers={['Слой', 'Что хранит', 'Время жизни']}
	rows={[
		['Браузер', 'HTTP-only Secure SameSite=Strict кука', 'сессия'],
		['SvelteKit (BFF)', 'JWT access token в серверной сессии', '~15 минут'],
		['Spring Boot', 'ничего — только публичный ключ для проверки подписи', '—'],
		['БД / Redis', 'refresh token с возможностью отзыва', 'дни/недели']
	]}
/>

<p>Проверка подписи на бэкенде настраивается через <code>oauth2ResourceServer</code>:</p>

<CodeBlock
	code={`@Bean
fun jwtDecoder(): JwtDecoder {
    val publicKey = loadRsaPublicKey("keystore.p12")
    return NimbusJwtDecoder.withPublicKey(publicKey).build()
}`}
	language="kotlin"
	filename="SecurityConfig.kt"
/>

<p>А в <code>hooks.server.js</code> SvelteKit достаёт JWT из своей сессии и пробрасывает его дальше:</p>

<CodeBlock
	code={`export async function handle({ event, resolve }) {
	const token = event.locals.session?.accessToken;

	event.locals.fetchApi = (path, init = {}) =>
		fetch(\`\${API_URL}\${path}\`, {
			...init,
			headers: { ...init.headers, Authorization: \`Bearer \${token}\` }
		});

	return resolve(event);
}`}
	language="javascript"
	filename="hooks.server.js"
/>

<h2>Гибридный рендеринг вместо одного режима на всё приложение</h2>

<p>
	Не каждая страница должна рендериться одинаково. Лендинг можно захватить SSG на этапе сборки,
	публичный каталог — SSR, редко меняющуюся статистику — отдать через ISR с SWR-кэшем на Nginx,
	а закрытую админку — сделать чистым SPA, чтобы не тратить ресурсы сервера на приватный контент.
</p>

<PostTable
	headers={['Тип страницы', 'Стратегия', 'Почему']}
	rows={[
		['Лендинг', 'SSG / prerender', 'контент не меняется между деплоями'],
		['Каталог, блог', 'SSR', 'нужен свежий контент в исходном HTML для SEO'],
		['Дашборд с редкими обновлениями', 'ISR (SWR через Nginx)', 'отдаём кэш, обновляем фоном'],
		['Админ-панель', 'SPA (ssr = false)', 'контент приватный, SEO не нужен']
	]}
/>

<PostImage
	src="https://picsum.photos/seed/rendering-strategies/1200/630"
	alt="Схема гибридного рендеринга в SvelteKit"
	caption="Разные страницы одного приложения — разные стратегии рендеринга"
/>

<h2>Итог</h2>

<p>
	Ни одно из этих решений не тянет проект к оверинжинирингу: Spring Data JDBC проще JPA, BFF-схема
	не добавляет инфраструктуры сверх SvelteKit-сервера, а гибридный рендеринг — это конфигурация,
	а не новый слой абстракции. Для монолита на скромном VPS это баланс между поддерживаемостью и
	простотой, а не следование трендам.
</p>
