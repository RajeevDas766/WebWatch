import React from "react";
import { footerStyles } from "../assets/dummyStyles";
import { Clock, Facebook, Instagram, Twitter,Icon, ChevronRight, Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.topBorder}></div>
      {/* Pattern overlay */}
      <div className={footerStyles.patternOverlay}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="watchPattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="20"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="10"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#watchPattern)"
          />
        </svg>
      </div>

      <div className={footerStyles.mainContainer}>
        <div className={footerStyles.newsletterSection}>
          <div className={footerStyles.newsletterContent}>
            <h3 className={footerStyles.newsletterTitle}>
              Timeless Elegance, Delivered
            </h3>
            <p className={footerStyles.newsletterText}>
              Subscribe to our newsletter for exclusive offers, new Collection
              announcements, and styling tips.
            </p>

            <div className={footerStyles.formContainer}>
              <input type="email"
              placeholder="Enter your email"
              className={footerStyles.emailInput} />
              <button className={footerStyles.subscribeButton}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className={footerStyles.mainGrid}>
          <div className={footerStyles.brandSection}>
            <div className={footerStyles.brandContainer}>
              <div className={footerStyles.brandIconContainer}>
                <div className={footerStyles.brandIconPing}></div>
                <Clock className={footerStyles.brandIcon} />
              </div>
              <span className={footerStyles.brandName}>WebWatch</span>
            </div>
            <p className={footerStyles.brandDescription}>
              Crafting timeless pieces for the discerning individual. Where
              precision meets elegance in every detail.
            </p>
            <div  className={footerStyles.socialIconsContainer}>
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                  <a href="#" key={index} className={footerStyles.socialIcon}>
                    <Icon  className={footerStyles.socialIconInner} />
                  </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={footerStyles.sectionHeading}>
              <ChevronRight className={footerStyles.sectionIcon} />
                Explore
            </h3>

            <ul className={footerStyles.linksList}>
              {[
                { label: "Collections", href: "/watches" },
                { label: "New Arrivals", href: "/watches" },
                { label: "Best Sellers", href: "/watches" },
                { label: "Limited Editions", href: "/watches" },
                { label: "Our Story", href: "/watches" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={footerStyles.linkItem}>
                    <ChevronRight className={footerStyles.linkIcon} />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
          <h3 className={footerStyles.sectionHeading}>
            <ChevronRight className={footerStyles.sectionIcon} />
             Support
          </h3>
          <ul className={footerStyles.linksList}>
               {[
                "Contact Us",
                "Shipping & Returns",
                "Product Care",
                "Warranty",
                "FAQ",
              ].map((item) => (
              <li key={item}>
                <a href="#" className={footerStyles.supportLink}>
                  <ChevronRight className={footerStyles.linkIcon} />
                  {item}
                </a>
                </li>
              ))}
          </ul>
          </div>

           {/* Contact Info */}
          <div>
            <h3 className={footerStyles.sectionHeading}>
              <ChevronRight className={footerStyles.sectionIcon} />
              Connect
            </h3>
            <ul className={footerStyles.contactList}>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <MapPin className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  302 Royal Palace, Vijay Nagar, Indore
                </span>
              </li>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Phone className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  834-996-6394
                </span>
              </li>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Mail className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  rajeevdas766@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom lines */}
        <div className={footerStyles.bottomSection}>
          <p className={footerStyles.copyright}>
            &copy; {new Date().getFullYear()} ChronoElite. Crafted with {""}
              <Heart className={footerStyles.heartIcon} />
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <p className={footerStyles.designerLink}>
              Designed by{" "}
              <a
               href="https://www.linkedin.com/in/rajeev-das-b97702292/"
               target="_blank"
                rel="noopener noreferrer"
                className={footerStyles.linkHover}
              >
                Rajeev Das
              </a>
            </p>
          </div>
        </div>
      </div>
      <style>{footerStyles.mediaQueries}</style>
    </footer>
  );
};

export default Footer;
