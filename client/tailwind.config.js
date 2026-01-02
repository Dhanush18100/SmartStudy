/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1A73E8', // Stitch Blue
                secondary: '#F1F3F4',
                accent: '#34A853',
                background: '#F8F9FA',
            },
        },
    },
    plugins: [],
}
