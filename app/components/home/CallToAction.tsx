import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Join the M-Changa Community Today!
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Experience the power of community-driven fundraising. Whether
          you&apos;re looking to support a cause or raise funds for your own
          project, M-Changa makes it easy, secure, and rewarding.
        </p>
        <Button
          asChild
          size="lg"
          variant="default"
          className="shadow-white shadow-md"
        >
          <Link href="/explore">Explore Projects</Link>
        </Button>
      </div>
    </section>
  );
}
