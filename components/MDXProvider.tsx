import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

function Anchor({
  href = "#",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function MdxImage({ alt = "", ...props }: ImageProps) {
  return (
    <Image
      alt={alt}
      width={1200}
      height={630}
      sizes="(max-width: 768px) 100vw, 768px"
      className="rounded-lg border"
      {...props}
    />
  );
}

export const mdxComponents = {
  a: Anchor,
  img: MdxImage as unknown as React.ComponentType<
    ComponentPropsWithoutRef<"img">
  >,
};
