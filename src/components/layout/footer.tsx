

import Link from "next/link";
import { Logo } from "@/components/icons";
import Image from "next/image";

const supportLinks = [
    { href: "/contact-us", label: "Support" },
    { href: "/publications/overview", label: "Docs" },
    { href: "/contact-us", label: "Contact Us" },
]

const learnMoreLinks = [
    { href: "/conference/about-conference", label: "How it Works" },
    { href: "/about", label: "Blog" },
    { href: "/login", label: "Log In" },
    { href: "/submit-journal", label: "Sign Up" },
]

const quickLinks = [
    { href: "/conference/upcoming-conferences", label: "Schedule" },
    { href: "/conference/scientific-gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/about", label: "Blog" },
    { href: "/submit-journal", label: "Submit Paper" },
]


const Footer = () => {
    return (
        <footer className="section bg-gray-800 text-gray-400">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Column 1: Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">
                            <Image src="/InnovationConference.png" alt="Innovation Conference Series" width={150} height={40} data-ai-hint="logo white" />
                        </h3>
                        <p className="text-sm">
                            Empowering Research • Enabling Innovation • Creating Impact
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
             <div className="border-t border-gray-700 py-4">
                <p className="text-center text-xs">
                    © Innovation Conference Series | Researcher Connect Innovation and Impact Pvt. Ltd.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
