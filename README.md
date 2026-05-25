# JudoBoucherville-FrontEnd

## Deployment to GitHub Pages

This project is deployed to GitHub Pages using the `gh-pages` branch.

### Setup

1. Install the gh-pages package:
```bash
npm install --save-dev angular-cli-ghpages
```

2. Build the project for production:
```bash
ng build --configuration production --base-href=/
```

3. Deploy to GitHub Pages:
```bash
npx angular-cli-ghpages --dir=dist/judo-boucherville/browser
```

### Custom Domain

The site is configured to use the custom domain `new.judoboucherville.com` via the CNAME file.

### Repository
- **GitHub Repository**: https://github.com/SyNocti/JudoBoucherville-FrontEnd/
- **Live Site**: https://new.judoboucherville.com