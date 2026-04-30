"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, type ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

export function TransitionLink({ href, onClick, children, ...props }: Props) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const target = typeof href === "string" ? href : (href.pathname ?? "/");
    if (target.startsWith("http") || target.startsWith("#")) return;

    e.preventDefault();

    if (!("startViewTransition" in document)) {
      router.push(target);
      return;
    }

    (document as Document & { startViewTransition: (cb: () => void) => void })
      .startViewTransition(() => {
        startTransition(() => router.push(target));
      });
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
