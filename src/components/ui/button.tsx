"use client";

export default function Button({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const className =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98]";

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return <button className={className}>{children}</button>;
}
