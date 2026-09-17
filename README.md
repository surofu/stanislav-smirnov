<p align="center">
  <img src="static/images/blog/hosting-cloudflare-sveltekit/preview.avif" alt="Cloudflare Pages + SvelteKit" width="480" />
</p>

# stanislav-smirnov

Личный сайт-портфолио: блог, кейсы проектов и контакты. Полностью статический
SvelteKit-проект без сервера — деплой на Cloudflare Pages по `git push`.

## Стек

- **SvelteKit** + `@sveltejs/adapter-static` — статическая сборка, без SSR
- **Cloudflare Pages** — хостинг с нативной git-интеграцией (без CI/CD-конфигов)
- **Cloudflare DNS/CDN** — резолвинг и раздача статики
- **pnpm** — пакетный менеджер
- Посты блога — `.svelte`-компоненты, а не Markdown

Подробный разбор связки — в посте блога:
[`src/lib/blog/hosting-cloudflare-sveltekit.svelte`](src/lib/blog/hosting-cloudflare-sveltekit.svelte).

## Структура

```
src/
├── lib/
│   ├── components/    # переиспользуемые компоненты (CodeBlock, PostImage, Navbar, Footer...)
│   ├── posts/         # посты блога как .svelte-компоненты
│   ├── projects/      # кейсы проектов как .svelte-компоненты
│   ├── blog.ts        # реестр постов
│   ├── projects.ts    # реестр проектов
│   └── types.ts
└── routes/
    ├── blog/          # список и страница поста
    ├── projects/      # список и страница проекта
    ├── contacts/
    ├── sitemap.xml/
    └── llms.txt/
```

## Локальный запуск

```bash
pnpm install
pnpm dev
```

## Сборка

Адаптер настроен на статический вывод в папку `build`:

```ts
// vite.config.ts
adapter({
    pages: 'build',
    assets: 'build',
    fallback: undefined,
    precompress: false,
    strict: true
})
```

```bash
pnpm build
```

`strict: true` и `fallback: undefined` намеренно ломают сборку, если в проект попадёт
страница, которую нельзя пререндерить в статику — ошибка на билде лучше, чем сломанный
роут в проде.

## Деплой

Отдельного CI нет. Cloudflare Pages подключён к репозиторию напрямую через дашборд:
команда сборки `vite build`, выходная папка `build`. Каждый пуш в ветку триггерит клон →
сборку → выкладку автоматически.

<p align="center">
  <img src="static/images/blog/hosting-cloudflare-sveltekit/build-log.avif" alt="Build log Cloudflare Pages" width="600" />
</p>

От коммита до прода — около 24 секунд, без единой строчки YAML.

## Производительность

Google PageSpeed Insights (десктоп) — 100/100 по всем категориям:

<p align="center">
  <img src="static/images/blog/hosting-cloudflare-sveltekit/page-speed-insights.avif" alt="PageSpeed Insights 100/100" width="700" />
</p>

| Метрика | Значение |
|---|---|
| Производительность | 100 |
| Специальные возможности | 100 |
| Рекомендации | 100 |
| Поисковая оптимизация | 100 |
| First Contentful Paint | 0,4 сек |
| Largest Contentful Paint | 0,4 сек |
| Total Blocking Time | 0 мс |
| Cumulative Layout Shift | 0 |
| Speed Index | 0,5 сек |

## Стоимость инфраструктуры

Домен + Cloudflare (DNS, CDN, хостинг, автодеплой) — 0 руб/мес сверх регистрации домена.

## Лицензия

[MIT](LICENSE) — используйте, копируйте, форкайте без ограничений.