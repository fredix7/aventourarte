# Aventourarte

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### GitHub Pages

Use the project scripts so every published guide can also be opened or refreshed through its direct URL:

```bash
npm run build:pages
npm run deploy:pages
```

`build:pages` compiles with the `/aventourarte/` base path, creates an entry document for every route in `GUIDE_REGISTRY`, and adds the GitHub Pages SPA fallback. `deploy:pages` performs that build and publishes the generated browser directory.

### Editorial audit

Append `?editorial=1` to a guide URL to show its audit panel without changing the public view. For example:

```text
/guia/europa/espana/andalucia/cadiz/rota?editorial=1
```

The panel derives content, practical-data, link, allergen, and image-coverage checks from the same guide object rendered by the page. It separates automatic findings from checks that still require a person, such as factual freshness, image rights, and external-site availability. The query parameter is a review aid, not an authentication mechanism.

### Google Fonts and TLS certificates

Production builds keep Angular's font inlining disabled. This avoids a build-time HTTPS request to Google Fonts while preserving the existing runtime stylesheet links in the generated page.

If font inlining is enabled again behind a company proxy or antivirus that inspects TLS, export its real root or intermediate certificate as PEM and configure Node with `NODE_EXTRA_CA_CERTS`; also configure `HTTPS_PROXY` when the network requires it. Install the same trusted certificate in the operating system or browser if runtime requests are intercepted. Never bypass the error with `NODE_TLS_REJECT_UNAUTHORIZED=0`. Self-hosting Roboto and Material Icons is the fully offline alternative.

## Cloudinary

The frontend only needs the public `cloudName` value from `src/environments/environment.ts` to build delivery URLs. Upload presets, API keys, API secrets, and upload-folder configuration must not be added to the client bundle. If browser uploads are added in the future, their permissions and upload preset must be reviewed and configured explicitly before exposing any new public value.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
