import { SvgIcon, SvgIconProps } from "@mui/material";

const ArrowRightIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="34"
        height="16"
        viewBox="0 0 34 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.5 8H1.5M32.5 8L21.65 1M32.5 8L21.65 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default ArrowRightIcon;
