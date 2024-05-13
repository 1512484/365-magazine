module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    DEFAULT: '1280px',
                    sm: '1280px',
                    md: '1280px',
                    lg: '1280px',
                    xl: '1280px',
                    '2xl': '1280px',
                }
            },
            screens: {
                md: '920px'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}