import { SvgIcon, SvgIconProps } from "@mui/material";

const ProfileIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="white" />
      <path
        d="M20 20C22.7614 20 25 17.7614 25 15C25 12.2386 22.7614 10 20 10C17.2386 10 15 12.2386 15 15C15 17.7614 17.2386 20 20 20Z"
        fill="#181818"
      />
      <path
        d="M20.0002 22.5C14.9902 22.5 10.9102 25.86 10.9102 30C10.9102 30.28 11.1302 30.5 11.4102 30.5H28.5902C28.8702 30.5 29.0902 30.28 29.0902 30C29.0902 25.86 25.0102 22.5 20.0002 22.5Z"
        fill="#181818"
      />
    </svg>
  </SvgIcon>
);

export default ProfileIcon;
