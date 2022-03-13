import clsx from "clsx";

const Avatar = ({ avatarURL, altText, size = 32, ...props }) => {
  const borderWidth = size > 12 ? 2 : 2;
  return (
    <img
      {...props}
      src={avatarURL}
      alt={altText}
      className={clsx(
        `w-${size} h-${size} rounded-full mr-2 bg-indigo-400 border-${borderWidth} border-amber-500`,
        props.className
      )}
    />
  );
};
export default Avatar;
