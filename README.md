# Vital Records Control - Healthcare Portal

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Helpful Links
* [Next.js Documentation](https://nextjs.org/docs)
* [Next.js Tutorial](https://www.freecodecamp.org/news/the-next-js-handbook/)

---

## Getting Started

Install npm packages:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---
## Organization
* Each hospital/portal exists in its own directory within the `pages` directory.
  * Hospital directory structure:
    * `hospital` (folder)
      * `patient` (folder)
        * `form.js`
        * `index.js`
        * `review.js`
        * `upload.js`
* Data for each hospital lives in `/lib/hospitals.js`. That file includes an overview of the properties for each hospital.
* Hospital logos are stored in `/public/images`
* Hospitals share the Contact, Upload, and Review page layouts (`/components/layouts`), with some options for customization via properties in `/lib/hospitals.js`.
---
## Deploying to Azure
### General Deploy Steps
1. Pull updates from the remote `main` branch into your local repository using `git pull`.
2. Run `npm install` to install/update dependencies.
3. Delete the `.next` folder.
4. Run the appropriate build command (see below).
5. Deploy to the desired environment using the VS Code Azure extension. 

Endpoints are set at build time via an environment variable. Run the corresponding command before deploying to each environment.

To build locally or to deploy to development environment:
```bash
npm run build
```

For deploys to the test/staging environment:
```bash
npm run build:test
```

For deploys to production:
```bash
npm run build:prod
```
### For More Help with Azure Deploy Setup
Read: [Deploying Next.JS App on Azure App Service (Tutorial)](https://parveensingh.com/next-js-deployment-on-azure-app-service/)


---
## Tools/Tech

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [react-hook-forms](https://react-hook-form.com)
- [react-dropzone](https://react-dropzone.js.org)
- [form-data](https://www.npmjs.com/package/form-data) - Remove if we don't use API routes
