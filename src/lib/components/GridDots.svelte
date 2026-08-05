<script lang="ts">
    import {onMount} from 'svelte';

    // ===== КОНФИГУРАЦИЯ =====
    const config = {
        // Параметры магнита (притяжение к курсору)
        magnetStrength: 0.16, // сила притяжения (0–1)
        maxRadius: 150, // максимальное смещение точки от исходной позиции (px)
        dotSpacing: 30, // расстояние между точками сетки
        damping: 0.1, // скорость интерполяции (0–1), меньше = плавнее

        // Цвета и градиент
        baseColor: { r: 100, g: 100, b: 100, a: 0.3 }, // цвет точек в покое
        hoverColor: { r: 16, g: 185, b: 129, a: 0.8 }, // цвет точек возле курсора
        gradientRadius: 150, // радиус градиента от курсора

        // Параметры волны при клике
        waveRadius: 1600, // максимальный радиус распространения волны (px)
        waveStrength: 80.0, // сила отталкивания (чем больше, тем сильнее разлетаются точки)
        waveDuration: 0.7, // длительность волны (секунд)
        waveColor: { r: 255, g: 0, b: 0, a: 1 }, // цвет волны (красный)
    };
    // ==========================

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    type Dot = {
        x0: number;
        y0: number;
        dx: number;
        dy: number;
    };
    let dots: Dot[] = [];

    type Wave = {
        cx: number;
        cy: number;
        radius: number;
        maxRadius: number;
        strength: number;
        progress: number; // 0..1
        color: typeof config.waveColor;
    };
    let waves: Wave[] = [];

    let mouseX = $state(0);
    let mouseY = $state(0);
    let isMouseOver = $state(false);

    let width = 0;
    let height = 0;
    let initialized = $state(false);

    let lastTimestamp = 0;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        canvas.width = width;
        canvas.height = height;

        const spacing = config.dotSpacing;
        const cols = Math.ceil(width / spacing) + 2;
        const rows = Math.ceil(height / spacing) + 2;

        const newDots: Dot[] = [];
        const offsetX = (width % spacing) / 2 - spacing / 2;
        const offsetY = (height % spacing) / 2 - spacing / 2;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                newDots.push({
                    x0: c * spacing + offsetX,
                    y0: r * spacing + offsetY,
                    dx: 0,
                    dy: 0,
                });
            }
        }
        dots = newDots;
        initialized = true;
    }

    function handleMouseMove(e: MouseEvent) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseOver = true;
    }

    function handleMouseLeave() {
        isMouseOver = false;
    }

    function handleClick(e: MouseEvent) {
        const { waveRadius, waveStrength, waveColor } = config;
        waves.push({
            cx: e.clientX,
            cy: e.clientY,
            radius: 0,
            maxRadius: waveRadius,
            strength: waveStrength,
            progress: 0,
            color: waveColor,
        });
    }

    let animationId: number;

    function lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    function lerpColor(
        c1: typeof config.baseColor,
        c2: typeof config.waveColor,
        t: number,
    ) {
        return {
            r: lerp(c1.r, c2.r, t),
            g: lerp(c1.g, c2.g, t),
            b: lerp(c1.b, c2.b, t),
            a: lerp(c1.a, c2.a, t),
        };
    }

    function animate(timestamp: number) {
        if (!ctx || !initialized) return;

        const delta = lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 0.016;
        lastTimestamp = timestamp;

        const { magnetStrength, maxRadius, damping, baseColor, hoverColor, gradientRadius } = config;

        // Обновление волн
        for (let i = waves.length - 1; i >= 0; i--) {
            const wave = waves[i];
            wave.progress += delta / config.waveDuration;
            wave.radius = wave.maxRadius * wave.progress;
            if (wave.progress >= 1) {
                waves.splice(i, 1);
            }
        }

        // Обновление позиций точек (магнит + волны)
        for (const dot of dots) {
            let targetDx = 0;
            let targetDy = 0;

            // Магнит
            if (isMouseOver) {
                const dx = mouseX - dot.x0;
                const dy = mouseY - dot.y0;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 0.1) {
                    const normDx = dx / distance;
                    const normDy = dy / distance;
                    const strength = magnetStrength * Math.min(1, distance / 200);
                    let desiredDx = normDx * strength * maxRadius;
                    let desiredDy = normDy * strength * maxRadius;

                    const desiredDist = Math.sqrt(desiredDx * desiredDx + desiredDy * desiredDy);
                    if (desiredDist > maxRadius) {
                        desiredDx = (desiredDx / desiredDist) * maxRadius;
                        desiredDy = (desiredDy / desiredDist) * maxRadius;
                    }
                    targetDx = desiredDx;
                    targetDy = desiredDy;
                }
            }

            // Волны (отталкивание)
            for (const wave of waves) {
                const dx = dot.x0 - wave.cx;
                const dy = dot.y0 - wave.cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < wave.radius && dist > 0.1) {
                    const normDx = dx / dist;
                    const normDy = dy / dist;
                    const strengthFactor = 1 - dist / wave.radius;
                    const timeFactor = 1 - wave.progress;
                    const force = wave.strength * strengthFactor * timeFactor;
                    targetDx += normDx * force;
                    targetDy += normDy * force;
                }
            }

            dot.dx += (targetDx - dot.dx) * damping;
            dot.dy += (targetDy - dot.dy) * damping;
        }

        // Отрисовка
        ctx.clearRect(0, 0, width, height);

        for (const dot of dots) {
            const x = dot.x0 + dot.dx;
            const y = dot.y0 + dot.dy;

            let color = baseColor;

            // Градиент от мыши
            if (isMouseOver) {
                const dx = mouseX - x;
                const dy = mouseY - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < gradientRadius) {
                    const t = 1 - dist / gradientRadius;
                    color = lerpColor(baseColor, hoverColor, t);
                }
            }

            // Влияние волн (поверх всего)
            let waveMix = 0;
            for (const wave of waves) {
                const dx = x - wave.cx;
                const dy = y - wave.cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < wave.radius) {
                    const t = 1 - dist / wave.radius;
                    const timeFactor = 1 - wave.progress;
                    const mix = t * timeFactor;
                    if (mix > waveMix) waveMix = mix;
                }
            }
            if (waveMix > 0) {
                const waveColor = config.waveColor;
                color = lerpColor(color, waveColor, waveMix);
            }

            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }

        animationId = requestAnimationFrame(animate);
    }

    onMount(() => {
        ctx = canvas.getContext('2d')!;
        resize();

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('click', handleClick);

        animate(0);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationId);
        };
    });
</script>

<svelte:window on:resize={resize} />

<canvas
        bind:this={canvas}
        class="app-grid-canvas"
        style="position: fixed; left: 0; top: 0; width: 100%; height: 100dvh; z-index: -1; pointer-events: none;"
></canvas>

<style></style>