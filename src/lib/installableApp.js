import { useEffect } from "react";

// Makes a client portal page installable as a phone app ("Add to Home Screen").
// The tags are added only while the portal page is open, so each client portal can
// carry its own app name and icon. No service worker is registered, so nothing from
// the portal (forms, client data) is cached on the phone.
export function useInstallableApp({ manifest, appleIcon, title, themeColor = "#ffffff" }) {
  useEffect(() => {
    const added = [];
    const add = (tag, attrs) => {
      const el = document.createElement(tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      el.setAttribute("data-installable-app", "");
      document.head.appendChild(el);
      added.push(el);
    };

    add("link", { rel: "manifest", href: manifest });
    add("link", { rel: "apple-touch-icon", href: appleIcon });
    add("meta", { name: "theme-color", content: themeColor });
    add("meta", { name: "mobile-web-app-capable", content: "yes" });
    add("meta", { name: "apple-mobile-web-app-capable", content: "yes" });
    add("meta", { name: "apple-mobile-web-app-status-bar-style", content: "default" });
    add("meta", { name: "apple-mobile-web-app-title", content: title });

    return () => added.forEach((el) => el.remove());
  }, [manifest, appleIcon, title, themeColor]);
}
