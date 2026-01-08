import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				border: 'hsl(var(--border))',
				ring: 'hsl(var(--ring))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				theme: {
					primary: 'hsl(var(--theme-primary))',
					'primary-dark': 'hsl(var(--theme-primary-dark))',
					secondary: 'hsl(var(--theme-secondary))',
					accent: 'hsl(var(--theme-accent))'
				},
				glass: {
					bg: 'hsl(var(--glass-bg))',
					border: 'hsl(var(--glass-border))',
					shadow: 'hsl(var(--glass-shadow))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-bg': 'var(--gradient-bg)'
			},
			boxShadow: {
				'glass': 'var(--shadow-glass)',
				'card': 'var(--shadow-card)',
				'elevated': 'var(--shadow-elevated)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
					'33%': { transform: 'translateY(-15px) translateX(10px)' },
					'66%': { transform: 'translateY(10px) translateX(-8px)' }
				},
				'float-medium': {
					'0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
					'50%': { transform: 'translateY(-20px) translateX(15px)' }
				},
				'float-fast': {
					'0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
					'25%': { transform: 'translateY(-10px) translateX(-12px)' },
					'75%': { transform: 'translateY(8px) translateX(10px)' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(45deg)' },
					'100%': { transform: 'rotate(405deg)' }
				},
				'fade-pulse': {
					'0%, 100%': { opacity: '0.1' },
					'50%': { opacity: '0.3' }
				},
				'twinkle': {
					'0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
					'50%': { opacity: '0.8', transform: 'scale(1.2)' }
				},
				'twinkle-delayed': {
					'0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
					'50%': { opacity: '0.6', transform: 'scale(1.1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float-slow': 'float-slow 8s ease-in-out infinite',
				'float-medium': 'float-medium 6s ease-in-out infinite',
				'float-fast': 'float-fast 4s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 20s linear infinite',
				'fade-pulse': 'fade-pulse 3s ease-in-out infinite',
				'twinkle': 'twinkle 2s ease-in-out infinite',
				'twinkle-delayed': 'twinkle-delayed 2s ease-in-out infinite 1s'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
