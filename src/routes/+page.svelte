<script lang="ts">
	import { resolve } from '$app/paths';
	import { Seo } from '$lib';
</script>

<Seo
	title="Сайты и сервисы от 100 BYN"
	description="Разработка сайтов, интернет-магазинов, CRM и Telegram-ботов для бизнеса и частных специалистов от 100 BYN. Без посредников — от заявки до запуска."
/>

<!--Hero-->
<section class="relative grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto] sm:gap-4">
	<div class="order-2 max-w-2xl sm:order-1">
		<h1 class="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
			Ваш бизнес в интернете<br />
			<span class="text-accent">от 100 BYN</span>
		</h1>
		<h2 class="mt-3 text-lg text-secondary sm:text-xl">Разработка сайтов и сервисов, которые приносят клиентов</h2>
		<div class="my-6 h-px w-30 bg-gray-300"></div>
		<div class="flex flex-wrap gap-2 text-sm">
			<span class="tag">лендинг</span>
			<span class="tag">персональный сайт</span>
			<span class="tag">онлайн магазин</span>
			<span class="tag">CRM</span>
			<span class="tag">админ панель</span>
			<span class="tag">Telegram-бот</span>
			<span class="tag">мобильное приложение</span>
		</div>

		<!-- Кнопка CTA -->
		<div class="mt-8 flex flex-wrap gap-4">
			<a href={resolve('/contacts')} class="app-button-primary">Связаться</a>
			<a href={resolve('/projects')} class="app-button">Примеры работ</a>
		</div>
	</div>
	<div class="order-1 flex justify-center sm:order-2 sm:justify-end">
		<img
			class="aspect-square h-40 w-auto rounded-full shadow-xl sm:h-85"
			src="/images/avatar.jpg"
			alt="Аватар Stanislav Smirnov"
		/>
	</div>
</section>

<!--Для кого-->
<section class="pt-20 sm:pt-32">
	<h2 class="text-2xl font-bold tracking-tight text-primary sm:text-3xl">Для кого</h2>
	<p class="mt-2 max-w-xl text-secondary">
		Подбираю решение под вашу нишу — от небольшого сайта-визитки до сложной CRM-системы.
	</p>

	<div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
		<div class="flex gap-4">
			<div class="mt-2 h-3 w-3 shrink-0 rounded-full bg-accent"></div>
			<div>
				<h3 class="font-semibold text-primary">Для интернет-магазинов и маркетплейсов</h3>
				<p class="mt-1 text-sm text-secondary">
					Каталог товаров, корзина, интеграция с платежами и учётными системами.
					Сайт, который продаёт, а не просто показывает.
				</p>
			</div>
		</div>
		<div class="flex gap-4">
			<div class="mt-2 h-3 w-3 shrink-0 rounded-full bg-accent"></div>
			<div>
				<h3 class="font-semibold text-primary">Для экспертов и частных специалистов</h3>
				<p class="mt-1 text-sm text-secondary">
					Персональные сайты для адвокатов, репетиторов, коучей, врачей.
					Всё, чтобы клиенты находили вас и записывались онлайн.
				</p>
			</div>
		</div>
		<div class="flex gap-4">
			<div class="mt-2 h-3 w-3 shrink-0 rounded-full bg-accent"></div>
			<div>
				<h3 class="font-semibold text-primary">Для игровых платформ и стартапов</h3>
				<p class="mt-1 text-sm text-secondary">
					Высоконагруженные сервисы, лендинги для игр, системы рейтингов и турниров.
					Масштабируемся вместе с вами.
				</p>
			</div>
		</div>
		<div class="flex gap-4">
			<div class="mt-2 h-3 w-3 shrink-0 rounded-full bg-accent"></div>
			<div>
				<h3 class="font-semibold text-primary">Для бизнеса, которому нужна автоматизация</h3>
				<p class="mt-1 text-sm text-secondary">
					CRM, админ-панели, Telegram-боты для управления заказами и клиентами.
					Освободите время для развития, а не для рутины.
				</p>
			</div>
		</div>
	</div>
</section>

<!--Как проходит работа-->
<section class="pt-20 sm:pt-32">
	<h2 class="text-2xl font-bold tracking-tight text-primary sm:text-3xl">Как проходит работа</h2>
	<p class="mt-2 max-w-xl text-secondary">
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

<!--&lt;!&ndash;Преимущества&ndash;&gt;-->
<!--<section class="pt-20 sm:pt-32">-->
<!--	<h2 class="text-2xl font-bold tracking-tight text-primary sm:text-3xl">Преимущества</h2>-->

<!--	<div class="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">-->
<!--		<div class="flex gap-4">-->
<!--			<div class="mt-2 h-3 w-3 shrink-0 rounded-full bg-accent"></div>-->
<!--			<div>-->
<!--				<h3 class="font-semibold text-primary">Прямая связь без посредников</h3>-->
<!--				<p class="mt-1 text-sm text-secondary">-->
<!--					Все решения принимаются сразу, правки вносятся мгновенно.-->
<!--				</p>-->
<!--			</div>-->
<!--		</div>-->
<!--		<div class="flex gap-4">-->
<!--			<div class="mt-2 h-3 w-3 shrink-0 rounded-full bg-accent"></div>-->
<!--			<div>-->
<!--				<h3 class="font-semibold text-primary">Бизнесу и частным специалистам</h3>-->
<!--				<p class="mt-1 text-sm text-secondary">-->
<!--					Индивидуальные решения для онлайн магазинов, торговых площадок, игровых платформ.-->
<!--					<br>-->
<!--					Персональные сайты для адвокатов, репетиторов, образовательных специалистов.-->
<!--				</p>-->
<!--			</div>-->
<!--		</div>-->
<!--		<div class="flex gap-4">-->
<!--			<div class="mt-2 h-3 w-3 shrink-0 rounded-full bg-accent"></div>-->
<!--			<div>-->
<!--				<h3 class="font-semibold text-primary">Цена и сроки — до старта</h3>-->
<!--				<p class="mt-1 text-sm text-secondary">-->
<!--					Фиксируем условия сразу, никаких сюрпризов в процессе разработки.-->
<!--				</p>-->
<!--			</div>-->
<!--		</div>-->
<!--		<div class="flex gap-4">-->
<!--			<div class="mt-2 h-3 w-3 shrink-0 rounded-full bg-accent"></div>-->
<!--			<div>-->
<!--				<h3 class="font-semibold text-primary">Поддержка после запуска</h3>-->
<!--				<p class="mt-1 text-sm text-secondary">Доработки, вопросы решаются и после запуска.</p>-->
<!--			</div>-->
<!--		</div>-->
<!--	</div>-->
<!--</section>-->

<!--CTA-->
<section class="pt-20 text-center sm:pt-32">
	<h2 class="text-2xl font-bold tracking-tight text-primary sm:text-3xl">Есть задача — обсудим</h2>
	<div class="mt-8">
		<a href={resolve('/contacts')} class="app-button-primary">Связаться</a>
	</div>
</section>
