"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { getUtmParams } from "@/lib/utm";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
  location: string;
  target?: string;
  rel?: string;
};

export function TrackLink({ href, className, children, location, target, rel }: Props) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() => posthog.capture("purchase_button_clicked", { location, ...getUtmParams() })}
    >
      {children}
    </Link>
  );
}
