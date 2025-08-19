import { IconProps } from "./icon-props"

export function InfoCircle(props: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.99999 18.3332C14.5833 18.3332 18.3333 14.5832 18.3333 9.99984C18.3333 5.4165 14.5833 1.6665 9.99999 1.6665C5.41666 1.6665 1.66666 5.4165 1.66666 9.99984C1.66666 14.5832 5.41666 18.3332 9.99999 18.3332Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 6.6665V10.8332"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99542 13.3335H10.0029"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function InfoCircleFilled(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM7.50806 6.91012C7.55039 6.67687 7.75454 6.49999 8 6.49999C8.24546 6.49999 8.44961 6.67687 8.49194 6.91012L8.5 6.99999V11.5021L8.49194 11.592C8.44961 11.8253 8.24546 12.0021 8 12.0021C7.75454 12.0021 7.55039 11.8253 7.50806 11.592L7.5 11.5021V6.99999L7.50806 6.91012ZM7.25 4.74999C7.25 4.33578 7.58579 3.99999 8 3.99999C8.41421 3.99999 8.75 4.33578 8.75 4.74999C8.75 5.16421 8.41421 5.49999 8 5.49999C7.58579 5.49999 7.25 5.16421 7.25 4.74999Z"
        fill="#D38405"
      />
    </svg>
  )
}
