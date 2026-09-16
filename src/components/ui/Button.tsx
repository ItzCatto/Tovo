import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  dataFocused?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', dataFocused, className, children, ...props },
  ref,
) {
  const base =
    'tv-focus focusable inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap'
  const sizes = size === 'lg' ? 'px-7 py-3.5 text-[1.05rem]' : 'px-5 py-2.5 text-[0.95rem]'
  const variants = {
    primary: 'bg-tovo-amber text-black',
    secondary: 'bg-tovo-elevated text-tovo-text border border-white/10',
    ghost: 'bg-white/5 text-tovo-text',
  }[variant]

  return (
    <button
      ref={ref}
      data-focused={dataFocused}
      className={`${base} ${sizes} ${variants} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  )
})
