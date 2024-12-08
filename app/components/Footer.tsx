import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About M-Changa</h3>
            <p className="text-sm">
              M-Changa is Kenya&apos;s leading online fundraising platform,
              connecting individuals, communities, and organizations to raise
              funds for various causes.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">
              123 Moi Avenue
              <br />
              Nairobi, Kenya
              <br />
              Phone: +254 123 456 789
              <br />
              Email: info@m-changa.com
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/mchanga"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com/mchanga"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://instagram.com/mchanga"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://linkedin.com/company/mchanga"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} M-Changa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
