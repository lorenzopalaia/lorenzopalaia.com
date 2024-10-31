"use client";

import Image, { ImageProps } from "next/image";

import { useEffect, useState } from "react";

import fallbackImage from "@/public/fallback.webp";

interface ImageFallbackProps extends ImageProps {
  fallback?: ImageProps["src"];
}

export const ImageFallback = ({
  fallback = fallbackImage,
  alt,
  src,
  ...props
}: ImageFallbackProps) => {
  const [error, setError] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallback : src}
      {...props}
    />
  );
};
