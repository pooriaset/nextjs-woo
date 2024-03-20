import Skeleton from "@mui/material/Skeleton";
import NextImage, { ImageProps } from "next/image";
import { FC, useState } from "react";

const Image: FC<ImageProps> = ({ width, height, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  const handleOnLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      {!loaded && (
        <Skeleton variant="rectangular" width={width} height={height} />
      )}
      <NextImage
        width={width}
        height={height}
        {...props}
        onLoad={handleOnLoad}
        style={{
          ...props.style,
          visibility: loaded ? "visible" : "hidden",
          height: loaded ? height : 0,
          maxWidth: "100%",
        }}
      />
    </>
  );
};

export default Image;
