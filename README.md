# Quotelet public showcase

Static English landing page for **Quotelet 0.1.0**, with the existing limited Russian/English demo at `demo/index.html`.

This folder is the public-upload package. It contains no full paid application or Node backend. The landing page uses local HTML, CSS and JavaScript, system fonts, and inline decorative SVG. There are no external assets, analytics scripts, tracking pixels or network calls from the landing-page code. Following an external checkout or contact link takes the visitor to that configured service.

## Files to publish

```text
public-showcase/
  index.html
  styles.css
  config.js
  app.js
  README.md
  demo/
    index.html
```

Publish the **contents of this folder only** to a dedicated public repository or static host. Do not upload the parent `quotelet-product` directory: it also contains the full application and seller materials.

The primary demo links point to `./demo/`. All stylesheet and script links are relative, so the showcase works under a project subpath as well as a site root.

## Preview locally

Run a static file server from this directory. For example, if Python is installed:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080/`. On Windows, `py -m http.server 8080 --bind 127.0.0.1` may be the available command. Stop the server with `Ctrl+C`.

The showcase has no build step or package dependencies. The complete paid application is separate and requires Node.js 24.

## Configure a real checkout

The checkout is disabled by default. Both purchase buttons display **Release preview**, accompanied by **Checkout not configured**. The demo remains available. The page does not collect payment or show an invented price.

Edit `config.js` when the real seller checkout is ready:

```javascript
window.QUOTELET_CONFIG = Object.freeze({
  checkoutUrl: "", // Paste the HTTPS URL copied from your real seller checkout.
  sellerContactUrl: "", // Optional: your real HTTPS support or contact page.
  sellerContactLabel: "Contact seller"
});
```

Keep a value blank until you have its real destination. A syntactically valid public HTTPS checkout URL activates the two purchase links. They open in a new tab with `noopener noreferrer`. An invalid or blank value keeps the preview state. A blank or invalid contact URL keeps the optional seller contact link hidden.

The validator rejects non-HTTPS links, URL usernames/passwords, whitespace and control characters, backslashes, IP-address hosts, local hosts and common placeholder domains. It accepts a public domain with an HTTPS URL; it does **not** make a request to verify that the address exists, belongs to you, offers this product, or has a working checkout. Verify those points yourself before publishing. Review the actual checkout price, description, sale terms and download contents there.

All configuration is publicly readable. Never add API keys, passwords, private access links, customer information or other secrets to any showcase file. An optional seller contact should point to a public HTTPS contact page; `mailto:` links are not accepted by this configuration.

If JavaScript is disabled or configuration fails to load, checkout stays disabled. The page content, section navigation, FAQ and demo link still work.

## Publish on GitHub Pages

1. Create a dedicated repository for the public showcase.
2. Copy only this folder’s contents into the repository root. `index.html` must be at that root, alongside the other landing-page files and the `demo` directory.
3. Commit the files to the branch you intend to publish, such as `main`.
4. In the repository’s GitHub Pages settings, choose deployment from a branch, select that branch and the root folder, then save.
5. Open the Pages URL provided by GitHub. Check the homepage, the `./demo/` route and the purchase state. A project URL such as a repository subpath is supported by the relative links.

Follow GitHub’s [publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for current interface details and account requirements.

GitHub Pages serves this static showcase. It cannot run the full Node backend or keep an OpenAI API key secret. Keep the full application repository private when your intended distribution is a paid source-code download.

## Before making the page public

- Keep only the public showcase files in the public repository. Do not include `.env` files, keys, the full application, private release archives or customer exports.
- Try the demo from the exact published URL, including on a narrow mobile viewport.
- If a checkout is configured, open it and confirm the correct product, current price, sale terms and downloadable package. URL format validation is not transaction verification.
- Add a real seller contact page if you want to display one. No seller identity or contact information is invented here.
- Keep the feature comparison aligned with the actual release. This page describes a single-operator product with six fixed service types, browser-local saved quote snapshots (maximum 100), JSON backups, optional server-side OpenAI extraction and manual sending.

## Scope and known limits

The existing `demo/index.html` is the earlier limited standalone demo. It uses illustrative business details and rates and has no live AI connection or saved-quote archive. Its own internal copy and controls may differ from the full application. The only change made to that file for this showcase is correcting its download link to its existing `index.html` file; the downloaded filename remains `Quotelet_Demo.html`.

The landing page does not claim that a marketplace listing is approved, that checkout is active by default, that legal sale terms are final, or that the product produces guaranteed business results. It presents the available feature scope and sends visitors to the configured seller checkout only when you supply a valid URL. No deployment is performed by these files.
