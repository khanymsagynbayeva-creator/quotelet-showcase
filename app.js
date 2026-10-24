(function () {
  "use strict";

  const config = window.QUOTELET_CONFIG || {};

  // A seller-controlled public link, never an executable URL or credentialed URL.
  // This validates the address format; it cannot verify the checkout or its owner.
  function publicHttpsUrl(value) {
    if (typeof value !== "string" || value.length > 2048) return null;
    const candidate = value.trim();
    if (!/^https:\/\//i.test(candidate) || /[\s\u0000-\u001f\u007f\\]/u.test(candidate)) return null;

    try {
      const url = new URL(candidate);
      const host = url.hostname.toLowerCase();
      if (url.protocol !== "https:" || url.username || url.password || !host) return null;
      if (!host.includes(".") || host.endsWith(".")) return null;
      if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(host) || host.includes(":")) return null;
      if (/(?:^|\.)(?:localhost|local|invalid|test|example)$/.test(host)) return null;
      if (/(?:^|\.)example\.(?:com|net|org)$/.test(host)) return null;
      if (/(?:^|[.-])(?:your[-_]?real[-_]?checkout[-_]?url|your[-_]?checkout[-_]?url|placeholder)(?:[.-]|$)/.test(host)) return null;
      return url.href;
    } catch (_) {
      return null;
    }
  }

  const checkoutUrl = publicHttpsUrl(config.checkoutUrl);
  if (checkoutUrl) {
    document.querySelectorAll("[data-checkout-link]").forEach(function (link) {
      link.href = checkoutUrl;
      link.hidden = false;
    });
    document.querySelectorAll("[data-checkout-disabled]").forEach(function (button) {
      button.hidden = true;
    });
    document.querySelectorAll("[data-checkout-status]").forEach(function (note) {
      note.textContent = "Opens the seller’s checkout in a new tab. Check the price and sale terms there before purchasing.";
    });
  }

  const contactUrl = publicHttpsUrl(config.sellerContactUrl);
  if (contactUrl) {
    const contact = document.querySelector("[data-seller-contact]");
    if (contact) {
      const label = typeof config.sellerContactLabel === "string"
        ? config.sellerContactLabel.trim().slice(0, 60)
        : "";
      contact.textContent = (label || "Contact seller") + " ↗";
      contact.href = contactUrl;
      contact.hidden = false;
    }
  }
}());
