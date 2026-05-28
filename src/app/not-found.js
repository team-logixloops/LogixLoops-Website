import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-site py-stack-2xl text-center flex flex-col items-center justify-center min-h-[60vh]">
      <span className="font-display text-[120px] md:text-[180px] leading-none text-gradient-primary font-bold mb-4">
        404
      </span>
      <h1 className="font-display text-headline-lg text-on-surface mb-4">
        Page Not Found
      </h1>
      <p className="font-body text-body-lg text-on-surface-variant max-w-md mx-auto mb-10">
        The architecture you're looking for doesn't exist in this namespace.
        Let's navigate you back to familiar territory.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Button href="/" size="lg">
          Return Home
        </Button>
        <Button href="/contact" variant="ghost" size="lg">
          Contact Us
        </Button>
      </div>
    </section>
  );
}
