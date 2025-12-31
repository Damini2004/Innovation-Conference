
import Link from "next/link";
import { Logo } from "@/components/icons";
import Image from "next/image";

const supportLinks = [
    { href: "#", label: "Support" },
    { href: "#", label: "Docs" },
    { href: "/contact-us", label: "Contact Us" },
]

const learnMoreLinks = [
    { href: "#", label: "How it Works" },
    { href: "/about", label: "Blog" },
    { href: "/login", label: "Log In" },
    { href: "/submit-journal", label: "Sign Up" },
]

const quickLinks = [
    { href: "#", label: "Schedule" },
    { href: "/conference/scientific-gallery", label: "Gallery" },
    { href: "#", label: "Team" },
    { href: "/about", label: "Blog" },
    { href: "#", label: "Pricing" },
]


const Footer = () => {
    return (
        <footer className="section bg-gray-800 text-gray-400">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">
                            <Image src="/footer-logo.png" alt="Innovation Conferences" width={150} height={40} data-ai-hint="logo white" />
                        </h3>
                        <p className="text-sm">
                            If you think you have the passion,
                            attitude and capability to join us
                            the next big software company
                            s so that we can get the convers.
                        </p>
                    </div>

                    {/* Column 2: Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
                        <ul className="space-y-2 text-sm">
                            {supportLinks.map(link => (
                                <li key={link.label}><Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Learn More */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Learn More</h3>
                        <ul className="space-y-2 text-sm">
                            {learnMoreLinks.map(link => (
                                <li key={link.label}><Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Quick Link */}
                     <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Quick Link</h3>
                        <ul className="space-y-2 text-sm">
                            {quickLinks.map(link => (
                                <li key={link.label}><Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
