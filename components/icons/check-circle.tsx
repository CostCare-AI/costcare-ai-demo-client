import { IconProps } from './icon-props'

export function CheckCircle(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="8" stroke="#9C9DB5" strokeWidth="1.5" />
      <path
        d="M9.20001 12.4L10.8 14L14.8 10"
        stroke="#9C9DB5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
} 