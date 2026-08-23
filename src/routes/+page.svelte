<script lang="ts">
	import { resolve } from '$app/paths';
	import { Seo } from '$lib';
	import GridDots from '$lib/components/GridDots.svelte';
</script>

<Seo
	title="Сайты и сервисы от 100 BYN"
	description="Разработка сайтов, интернет-магазинов, CRM и Telegram-ботов для бизнеса и частных специалистов от 100 BYN. Без посредников — от заявки до запуска."
/>

<section class="relative grid grid-cols-1 items-center gap-10 sm:grid-cols-[1fr_auto] sm:gap-16">
	<div class="order-2 max-w-xl sm:order-1">
		<h1 class="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
			Ваш бизнес в интернете <span class="text-accent">от 100 BYN</span>
		</h1>
		<p class="mt-4 text-base text-secondary sm:text-lg">
			Разработка сайтов и сервисов, которые приносят клиентов.
		</p>
		<div class="mt-6 flex flex-wrap gap-2 text-sm">
			<span class="tag">лендинг</span>
			<span class="tag">персональный сайт</span>
			<span class="tag">онлайн магазин</span>
			<span class="tag">CRM</span>
			<span class="tag">админ панель</span>
			<span class="tag">Telegram-бот</span>
		</div>
		<div class="mt-8 flex flex-wrap gap-4">
			<a href={resolve('/contacts')} class="app-button-primary">Связаться</a>
			<a href={resolve('/projects')} class="app-button">Примеры работ</a>
		</div>
	</div>
	<div class="order-1 flex justify-center sm:order-2 sm:justify-end">
		<img
			class="h-36 w-36 rounded-full border border-slate-200 object-cover shadow-md sm:h-56 sm:w-56 dark:border-slate-700"
			src="/images/avatar.jpg"
			alt="Аватар Stanislav Smirnov"
		/>
	</div>
</section>

<section class="mt-24 sm:mt-32">
	<h2 class="text-2xl font-semibold tracking-tight text-primary">Для кого</h2>
	<p class="mt-2 max-w-lg text-secondary">
		Подбираю решение под вашу нишу — от небольшого сайта-визитки до сложной CRM-системы.
	</p>

	<div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
		<div class="rounded-lg border border-slate-200 bg-primary-bg p-6 dark:border-slate-700">
			<h3 class="font-semibold text-primary">Интернет-магазины и маркетплейсы</h3>
			<p class="mt-2 text-sm text-secondary">
				Каталог товаров, корзина, интеграция с платежами и учётными системами.
			</p>
		</div>
		<div class="rounded-lg border border-slate-200 bg-primary-bg p-6 dark:border-slate-700">
			<h3 class="font-semibold text-primary">Эксперты и частные специалисты</h3>
			<p class="mt-2 text-sm text-secondary">
				Персональные сайты для адвокатов, репетиторов, коучей, врачей с онлайн-записью.
			</p>
		</div>
		<div class="rounded-lg border border-slate-200 bg-primary-bg p-6 dark:border-slate-700">
			<h3 class="font-semibold text-primary">Игровые платформы и стартапы</h3>
			<p class="mt-2 text-sm text-secondary">
				Высоконагруженные сервисы, лендинги, системы рейтингов и турниров.
			</p>
		</div>
		<div class="rounded-lg border border-slate-200 bg-primary-bg p-6 dark:border-slate-700">
			<h3 class="font-semibold text-primary">Бизнес, которому нужна автоматизация</h3>
			<p class="mt-2 text-sm text-secondary">
				CRM, админ-панели и Telegram-боты для управления заказами и клиентами.
			</p>
		</div>
	</div>
</section>

<section class="mt-24 sm:mt-32">
	<h2 class="text-2xl font-semibold tracking-tight text-primary">Как проходит работа</h2>
	<p class="mt-2 max-w-lg text-secondary">
		Без менеджеров и переписки в десяти чатах — от заявки до запуска работаем напрямую.
	</p>

	<div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
		<div>
			<span class="text-sm font-medium text-accent">01</span>
			<h3 class="mt-2 font-semibold text-primary">Заявка</h3>
			<p class="mt-1 text-sm text-secondary">Обсуждаем задачу, фиксируем бюджет и сроки.</p>
		</div>
		<div>
			<span class="text-sm font-medium text-accent">02</span>
			<h3 class="mt-2 font-semibold text-primary">Прототип</h3>
			<p class="mt-1 text-sm text-secondary">Вы видите будущий сайт до начала разработки.</p>
		</div>
		<div>
			<span class="text-sm font-medium text-accent">03</span>
			<h3 class="mt-2 font-semibold text-primary">Разработка</h3>
			<p class="mt-1 text-sm text-secondary">Промежуточные демонстрации — вы всегда в курсе прогресса.</p>
		</div>
		<div>
			<span class="text-sm font-medium text-accent">04</span>
			<h3 class="mt-2 font-semibold text-primary">Запуск</h3>
			<p class="mt-1 text-sm text-secondary">Публикация на ваш домен и сопровождение после старта.</p>
		</div>
	</div>
</section>

<section class="mt-24 pt-20 text-center sm:mt-32">
	<h2 class="text-2xl font-bold tracking-tight text-primary sm:text-3xl">Есть задача — обсудим</h2>
	<div class="mt-8">
		<a href={resolve('/contacts')} class="app-button-primary">Связаться</a>
	</div>
</section>

<GridDots />
