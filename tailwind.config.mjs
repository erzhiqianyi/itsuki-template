/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // 你也可以在这里直接硬编码 Catppuccin 颜色
                // 或者通过 CSS 变量引用
                accent: 'var(--accent)',
                bg: 'var(--bg)',
                card: 'var(--card)',
                text: 'var(--text)',
                subtext: 'var(--subtext)',
            },
        },
    },
    plugins: [],
}