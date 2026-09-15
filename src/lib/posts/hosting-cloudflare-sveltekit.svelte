<script lang="ts" module>
    import { CodeBlock, PostImage, PostList } from '$lib';
    import type { PostMeta } from '$lib/types';

    export const metadata: PostMeta = {
        title: 'Лучшая связка для статических лендингов?',
        description:
            'Cloudflare Pages + SvelteKit static adapter + git push вместо CI/CD. DNS, CDN и хостинг — 0 рублей в месяц. Разбираю связку на примере своего сайта.',
        image: 'hosting-cloudflare-sveltekit/preview.avif',
        tags: ['Cloudflare', 'SvelteKit'],
        date: '2026-09-15',
        published: true
    };
</script>

<p>
    Мой сайт обновляется через ~24 секунды после <code>git push</code> — без CI, без
    VPS и без ручного деплоя. А вся инфраструктура вокруг — домен, DNS, CDN, хостинг и
    автодеплой — стоит ровно 0 рублей в месяц, если не считать саму регистрацию домена.
    На этой связке работает сайт, который вы сейчас читаете.
</p>

<h2>Статика вместо SSR</h2>

<p>
    Для лендинга и блога-визитки SSR не нужен: контент не персонализируется и не меняется на
    лету, а значит его можно отдавать как готовые HTML-файлы прямо с CDN — без сервера, который
    надо поддерживать. В <code>vite.config.ts</code> это буквально одна строчка конфигурации
    адаптера:
</p>

<CodeBlock filename="vite.config.ts" lang="ts">
    {`import adapter from '@sveltejs/adapter-static';

sveltekit({
	adapter: adapter({
		pages: 'build',
		assets: 'build',
		fallback: undefined,
		precompress: false,
		strict: true
	})
})`}
</CodeBlock>

<p>
    <code>fallback: undefined</code> и <code>strict: true</code> — это защита от самого себя:
    сборка упадёт с ошибкой, если в проекте случайно появится страница, которую нельзя
    пререндерить в статику. Для лендинга это ровно то поведение, которое нужно — лучше увидеть
    ошибку на билде, чем сломанный роут в проде.
</p>

<h2>Автодеплой за 24 секунды</h2>

<p>
    Никакого отдельного CI — Cloudflare Pages подключается к GitHub-репозиторию нативно через
    дашборд: указываешь команду сборки (<code>vite build</code>) и папку с результатом
    (<code>build</code>, как в конфиге адаптера выше), и на каждый пуш в ветку он сам клонирует
    репозиторий, собирает и выкладывает. Вот лог последнего деплоя этого сайта:
</p>

<PostImage
        src="/images/blog/hosting-cloudflare-sveltekit/build-log.avif"
        alt="Лог деплоя в дашборде Cloudflare Pages"
        caption="От коммита до прода — около 24 секунд, без единой строчки YAML"
/>

<p>
    Никакого <code>.github/workflows</code>, секретов в GitHub Actions или отдельного шага
    деплоя — всё это Cloudflare Pages берёт на себя сам.
</p>

<h2>Итого</h2>

<p>
    Для статического лендинга или блога-визитки МСБ вся эта связка обходится в стоимость
    домена — и ни рубля больше. Если у тебя SvelteKit-проект без SSR-специфики: включи
    <code>adapter-static</code>, подключи репозиторий в Cloudflare Pages напрямую из дашборда и
    перенеси NS-записи домена на Cloudflare. Дальше git push — единственная DevOps-операция,
    которая тебе понадобится.
</p>