<script lang="ts">
	import { resolve } from '$app/paths';
	import { Seo } from '$lib';
	import GridDots from '$lib/components/GridDots.svelte';
</script>

<Seo
	title="Онлайн-магазины и CRM для бизнеса от 300 BYN"
	description="Разработка интернет-магазинов и CRM-систем для малого и среднего бизнеса от 300 BYN. Без посредников — от заявки до запуска."
/>

<section class="relative grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
	<div class="order-2 max-w-xl md:order-1">
		<h1 class="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
			Разработка сайта для вашего бизнеса <span class="text-accent">от&nbsp;300&nbsp;BYN</span>
		</h1>
		<h2 class="mt-4 text-base text-secondary md:text-lg">
			<span class="text-accent">5 лет</span> разрабатываю и автоматизирую
		</h2>
		<div class="mt-6 flex flex-wrap gap-2 text-sm">
			<span class="tag">приём онлайн-оплаты</span>
			<span class="tag">учёт заказов</span>
			<span class="tag">каталог товаров</span>
			<span class="tag">CRM для клиентов</span>
			<span class="tag">отчёты и аналитика</span>
		</div>
		<div class="mt-8 flex flex-wrap gap-4">
			<a href={resolve('/contacts')} class="app-button-primary">Связаться</a>
			<a href={resolve('/projects')} class="app-button">Примеры работ</a>
		</div>
	</div>
	<div class="order-1 flex justify-center md:order-2 md:justify-end">
		<img
			class="h-52 w-52 rounded-full border border-slate-200 object-cover shadow-md md:h-64 md:w-64 dark:border-slate-700"
			src="/images/avatar.jpg"
			alt="Аватар Stanislav Smirnov"
		/>
	</div>
</section>

<section class="mt-24 md:mt-32">
	<h2 class="text-2xl font-semibold tracking-tight text-primary">Для кого</h2>
	<p class="mt-2 max-w-lg text-secondary">
		Работаю с владельцами малого и среднего бизнеса, которым нужен свой магазин или порядок в
		клиентах и заказах.
	</p>

	<div class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="rounded-lg border border-slate-200 bg-primary-bg p-6 dark:border-slate-700">
			<h3 class="font-semibold text-primary">Нужен интернет-магазин</h3>
			<p class="mt-2 text-sm text-secondary">
				Каталог товаров, корзина, оплата и интеграция с учётными системами — под ваш ассортимент и
				процессы.
			</p>
		</div>
		<div class="rounded-lg border border-slate-200 bg-primary-bg p-6 dark:border-slate-700">
			<h3 class="font-semibold text-primary">Тонет в заявках и таблицах</h3>
			<p class="mt-2 text-sm text-secondary">
				CRM и админ-панель для учёта клиентов, заказов и статусов — без Excel и потерянных
				сообщений.
			</p>
		</div>
	</div>
</section>

<section class="mt-24 md:mt-32">
	<h2 class="text-2xl font-semibold tracking-tight text-primary">Как проходит работа</h2>
	<p class="mt-2 max-w-lg text-secondary">
		Без менеджеров и переписки в десяти чатах — от заявки до запуска работаем напрямую.
	</p>

	<div class="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
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
			<p class="mt-1 text-sm text-secondary">
				Промежуточные демонстрации — вы всегда в курсе прогресса.
			</p>
		</div>
		<div>
			<span class="text-sm font-medium text-accent">04</span>
			<h3 class="mt-2 font-semibold text-primary">Запуск</h3>
			<p class="mt-1 text-sm text-secondary">
				Публикация на ваш домен и сопровождение после старта.
			</p>
		</div>
	</div>
</section>

<section class="mt-24 pt-20 text-center md:mt-32">
	<h2 class="text-2xl font-bold tracking-tight text-primary md:text-3xl">Есть задача — обсудим</h2>
	<div class="mt-8">
		<a href={resolve('/contacts')} class="app-button-primary">Связаться</a>
	</div>
</section>

<GridDots />
