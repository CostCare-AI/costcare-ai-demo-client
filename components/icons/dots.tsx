import { IconProps } from './icon-props'

export function Dots(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="6.39999" cy="11.9999" r="1.6" stroke="#9C9DB5" strokeWidth="1.5" />
      <circle cx="12" cy="11.9999" r="1.6" stroke="#9C9DB5" strokeWidth="1.5" />
      <circle cx="17.6" cy="11.9999" r="1.6" stroke="#9C9DB5" strokeWidth="1.5" />
    </svg>
  )
} 