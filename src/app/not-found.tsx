import Image from "next/image";
import Link from "next/link";

import { nav } from "@/lib/school";

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
      <div className="max-w-md">
        <Image src="/crest.png" alt="" width={72} height={72} className="mx-auto size-16 object-contain" />
        <p className="mt-6 font-serif text-6xl font-extrabold text-navy-900">404</p>
        <h1 className="mt-2 font-serif text-2xl font-bold text-navy-900">Page not found</h1>
        <p className="mt-2 text-ink/70">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {nav.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full bg-navy-50 px-4 py-2 text-sm font-medium text-navy-800 hover:bg-navy-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link href="/" className="btn btn-navy mt-6">Back to Home</Link>
      </div>
    </section>
  );
}
