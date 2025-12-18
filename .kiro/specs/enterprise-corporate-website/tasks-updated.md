# Implementation Plan - Strapi CMS + Vercel Deployment

## Current Status: Website UI Complete, Need CMS Integration & Deployment

This plan focuses on connecting your existing Next.js website to Strapi CMS and deploying to Vercel.

---

## Phase 1: Strapi CMS Setup

- [ ] 1. Set up Strapi CMS locally
  - [ ] 1.1 Verify Strapi installation
    - Check that Strapi is installed in `/strapi` directory
    - Run `cd strapi && npm install` to ensure dependencies are installed
    - Start Strapi with `npm run develop`
    - Access admin panel at http://localhost:1337/admin
    - _Requirements: 12.1_

  - [ ] 1.2 Create admin account
    - Create first admin user in Strapi
    - Save credentials securely
    - Verify login works
    - _Requirements: 12.1_

- [x] 2. Create Strapi content types






  - [x] 2.1 Create Project content type

    - Go to Content-Type Builder → Create new collection type → "Project"
    - Add field: title (Text, Short, Required)
    - Add field: description (Text, Long, Required)
    - Add field: category (Text, Short, Required, Default: "Network Infrastructure")
    - Add field: status (Enumeration, Required, Values: Completed, InProgress, Planned)
    - Add field: client (Text, Short)
    - Add field: duration (Text, Short)
    - Add field: team (Text, Short)
    - Add field: challenge (Text, Long)
    - Add field: solution (Text, Long)
    - Add field: outcome (Text, Long)
    - Add field: technologies (JSON)
    - Add field: metrics (JSON)
    - Add field: image (Media, Single image)
    - Click "Save" and wait for Strapi to restart
    - _Requirements: 12.5_

  - [x] 2.2 Create Service content type


    - Go to Content-Type Builder → Create new collection type → "Service"
    - Add field: title (Text, Short, Required)
    - Add field: slug (UID, Attached to: title, Required)
    - Add field: description (Text, Long, Required)
    - Add field: icon (Text, Short) - for emoji or icon code
    - Add field: detailedDescription (Rich Text)
    - Add field: featuredImage (Media, Single image)
    - Add field: features (JSON)
    - Add field: benefits (JSON)
    - Click "Save" and wait for Strapi to restart
    - _Requirements: 12.5_

  - [x] 2.3 Create Industry content type


    - Go to Content-Type Builder → Create new collection type → "Industry"
    - Add field: title (Text, Short, Required)
    - Add field: slug (UID, Attached to: title, Required)
    - Add field: description (Text, Long, Required)
    - Add field: icon (Text, Short)
    - Add field: gradient (Text, Short) - for CSS gradient string
    - Add field: keyPoints (JSON)
    - Add field: stats (JSON)
    - Add field: featuredImage (Media, Single image)
    - Click "Save" and wait for Strapi to restart
    - _Requirements: 12.5_

  - [x] 2.4 Create Article content type


    - Go to Content-Type Builder → Create new collection type → "Article"
    - Add field: title (Text, Short, Required)
    - Add field: slug (UID, Attached to: title, Required)
    - Add field: excerpt (Text, Long, Required)
    - Add field: content (Rich Text, Required)
    - Add field: category (Text, Short)
    - Add field: author (Text, Short)
    - Add field: featuredImage (Media, Single image)
    - Add field: publishedAt (DateTime)
    - Click "Save" and wait for Strapi to restart
    - _Requirements: 12.5_

- [ ] 3. Configure Strapi API permissions
  - [ ] 3.1 Set public permissions
    - Go to Settings → Users & Permissions Plugin → Roles → Public
    - Expand "Project" and check: find, findOne
    - Expand "Service" and check: find, findOne
    - Expand "Industry" and check: find, findOne
    - Expand "Article" and check: find, findOne
    - Click "Save"
    - _Requirements: 12.1, 14.1_

  - [ ] 3.2 Test API endpoints
    - Open browser and test: http://localhost:1337/api/projects
    - Test: http://localhost:1337/api/services
    - Test: http://localhost:1337/api/industries
    - Test: http://localhost:1337/api/articles
    - Should see JSON response (empty array if no content yet)
    - If you see "Forbidden", go back and check permissions
    - _Requirements: 14.1_

- [ ] 4. Add sample content to Strapi
  - [ ] 4.1 Add Projects
    - Go to Content Manager → Project → Create new entry
    - Add 6 sample projects with all fields filled
    - Use JSON format for technologies: ["SD-WAN", "Cisco", "Fortinet"]
    - Use JSON format for metrics: [{"label": "Uptime", "value": "99.9%"}]
    - Upload sample images
    - Click "Save" then "Publish" for each project
    - _Requirements: 12.5_

  - [ ] 4.2 Add Services
    - Go to Content Manager → Service → Create new entry
    - Add 8 services matching current website:
      1. Enterprise Architecture Consultancy (🏛️)
      2. Business Consultancy (💼)
      3. Platform Development Factory (🏭)
      4. Platform Management (Buy & Manage) (🛠️)
      5. Platform Management (AI Build) (🤖)
      6. Managed Cloud & Infrastructure (☁️)
      7. ICT Managed Services (🔧)
      8. Operations & Maintenance (⚙️)
    - Use JSON for features and benefits arrays
    - Click "Save" then "Publish" for each service
    - _Requirements: 12.5_

  - [ ] 4.3 Add Industries
    - Go to Content Manager → Industry → Create new entry
    - Add 4 industries matching current website:
      1. PJ Lhuillier Group (🏢)
      2. Financial Services & FinTech (💳)
      3. Microfinance Operations (🤝)
      4. Enterprise Systems (⚙️)
    - Use JSON for keyPoints and stats
    - Click "Save" then "Publish" for each industry
    - _Requirements: 12.5_

  - [ ] 4.4 Add Articles
    - Go to Content Manager → Article → Create new entry
    - Add 3-5 sample articles for insights section
    - Fill in all fields including rich text content
    - Upload featured images
    - Click "Save" then "Publish" for each article
    - _Requirements: 12.5_

---

## Phase 2: Connect Website to Strapi

- [ ] 5. Update API utility functions
  - [ ] 5.1 Update Projects API functions
    - Open `lib/api.ts`
    - Find `fetchProjects()` function
    - Replace mock data return with actual Strapi API call:
      ```typescript
      const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/projects?populate=*`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      return data.data.map(transformProject); // Transform Strapi format
      ```
    - Add error handling and loading states
    - Test that projects display on homepage
    - _Requirements: 14.1, 14.4_

  - [ ] 5.2 Update Services API functions
    - In `lib/api.ts`, update `fetchServices()` function
    - Replace mock data with Strapi API call to `/api/services?populate=*`
    - Update `fetchServiceBySlug()` to fetch single service
    - Transform Strapi response format to match Service interface
    - Test services page displays correctly
    - _Requirements: 14.1, 14.4_

  - [ ] 5.3 Update Industries API functions
    - In `lib/api.ts`, update `fetchIndustries()` function
    - Replace mock data with Strapi API call to `/api/industries?populate=*`
    - Update `fetchIndustryBySlug()` to fetch single industry
    - Transform Strapi response format to match Industry interface
    - Test industries page displays correctly
    - _Requirements: 14.1, 14.4_

  - [ ] 5.4 Update Articles API functions
    - In `lib/api.ts`, update `fetchLatestArticles()` function
    - Replace mock data with Strapi API call to `/api/articles?populate=*&sort=publishedAt:desc`
    - Add `fetchArticleBySlug()` function for article detail pages
    - Transform Strapi response format to match Article interface
    - Test insights section on homepage displays correctly
    - _Requirements: 14.1, 14.4_

  - [ ] 5.5 Add Strapi response transformation utilities
    - Create helper functions to transform Strapi's nested response format
    - Handle Strapi's `data.attributes` structure
    - Handle media/image URLs from Strapi
    - Handle JSON fields (technologies, metrics, features, etc.)
    - _Requirements: 14.4_

- [ ] 6. Test Strapi integration end-to-end
  - [ ] 6.1 Test with both servers running
    - Terminal 1: `cd strapi && npm run develop` (Strapi on port 1337)
    - Terminal 2: `npm run dev` (Next.js on port 3000)
    - Visit http://localhost:3000
    - Verify homepage displays projects from Strapi
    - Verify services page displays services from Strapi
    - Verify industries page displays industries from Strapi
    - Check browser console for any errors
    - _Requirements: 12.3, 14.1_

  - [ ] 6.2 Test content updates
    - Edit a project in Strapi and click "Save" → "Publish"
    - Refresh website and verify changes appear
    - Add a new service in Strapi
    - Refresh website and verify new service appears
    - Delete test content and verify it disappears from website
    - _Requirements: 12.3_

  - [ ] 6.3 Test error handling
    - Stop Strapi server
    - Refresh website and verify error handling works gracefully
    - Check that loading states display correctly
    - Restart Strapi and verify website recovers
    - _Requirements: 14.4_

---

## Phase 3: Prepare for Production

- [ ] 7. Configure environment variables
  - [ ] 7.1 Update .env.example
    - Open `.env.example` file
    - Add all required environment variables with descriptions:
      ```
      # Strapi CMS URL
      NEXT_PUBLIC_CMS_URL=http://localhost:1337
      
      # Google Maps API Key
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
      
      # App URL
      NEXT_PUBLIC_APP_URL=http://localhost:3000
      ```
    - Document which variables are required for production
    - _Requirements: 15.4_

  - [ ] 7.2 Verify .env.local is in .gitignore
    - Check that `.env.local` is listed in `.gitignore`
    - Ensure sensitive keys are never committed to Git
    - _Requirements: 15.4_

- [ ] 8. Configure Next.js for production
  - [ ] 8.1 Update next.config.js
    - Open `next.config.js`
    - Add image domains for Strapi:
      ```javascript
      images: {
        domains: ['localhost', 'your-strapi-domain.com'],
      }
      ```
    - Configure any necessary redirects or rewrites
    - _Requirements: 15.1_

  - [ ] 8.2 Test production build locally
    - Run `npm run build` to create production build
    - Check for any build errors or warnings
    - Run `npm start` to test production build locally
    - Visit http://localhost:3000 and test all pages
    - Verify API calls work with production build
    - _Requirements: 15.1_

- [ ] 9. Prepare Strapi for production
  - [ ] 9.1 Choose Strapi hosting provider
    - Research options: Strapi Cloud (recommended), Railway, Render, DigitalOcean
    - Sign up for chosen provider
    - Note the production Strapi URL (e.g., https://your-app.strapiapp.com)
    - _Requirements: 12.1, 15.1_

  - [ ] 9.2 Configure Strapi for production
    - Update Strapi CORS settings to allow your Vercel domain
    - Configure production database (PostgreSQL recommended)
    - Set up environment variables in hosting provider
    - Deploy Strapi to production
    - Test Strapi admin panel works in production
    - _Requirements: 12.1_

  - [ ] 9.3 Migrate content to production Strapi
    - Manually recreate content types in production Strapi
    - Or use Strapi's data transfer feature
    - Upload all content and images
    - Verify all content is published
    - Test API endpoints work: https://your-strapi-url.com/api/projects
    - _Requirements: 12.5_

---

## Phase 4: Deploy to Vercel

- [ ] 10. Push code to GitHub
  - [ ] 10.1 Initialize Git repository
    - Run `git init` if not already initialized
    - Verify `.gitignore` includes: node_modules, .env.local, .next, .vercel
    - Run `git add .`
    - Run `git commit -m "Prepare for Vercel deployment"`
    - _Requirements: 15.1_

  - [ ] 10.2 Create GitHub repository
    - Go to github.com and create new repository
    - Name it (e.g., "ncvi-website")
    - Don't initialize with README (you already have code)
    - Copy the repository URL
    - _Requirements: 15.1_

  - [ ] 10.3 Push to GitHub
    - Run `git remote add origin <your-github-repo-url>`
    - Run `git branch -M main`
    - Run `git push -u origin main`
    - Verify code appears on GitHub
    - _Requirements: 15.1_

- [ ] 11. Deploy to Vercel
  - [ ] 11.1 Create Vercel account and import project
    - Go to vercel.com and sign up (use GitHub account)
    - Click "New Project"
    - Import your GitHub repository
    - Vercel will auto-detect Next.js framework
    - _Requirements: 15.1_

  - [ ] 11.2 Configure project settings
    - Framework Preset: Next.js (auto-detected)
    - Root Directory: ./ (leave as default)
    - Build Command: `npm run build` (auto-detected)
    - Output Directory: .next (auto-detected)
    - Install Command: `npm install` (auto-detected)
    - Click "Deploy" (will fail first time - need environment variables)
    - _Requirements: 15.1_

  - [ ] 11.3 Add environment variables in Vercel
    - Go to Project Settings → Environment Variables
    - Add `NEXT_PUBLIC_CMS_URL` = your production Strapi URL
    - Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` = your Google Maps key
    - Add `NEXT_PUBLIC_APP_URL` = your Vercel URL (will get after first deploy)
    - Click "Save"
    - _Requirements: 15.4_

  - [ ] 11.4 Redeploy with environment variables
    - Go to Deployments tab
    - Click "..." on latest deployment → Redeploy
    - Wait for deployment to complete
    - Click "Visit" to see your live website
    - _Requirements: 15.1_

- [ ] 12. Test production deployment
  - [ ] 12.1 Test all pages
    - Visit your Vercel URL (e.g., https://your-project.vercel.app)
    - Test homepage loads and displays projects
    - Test /services page
    - Test /services/[slug] detail pages
    - Test /industries page
    - Test /industries/[slug] detail pages
    - Test /projects page
    - Test /contact page
    - _Requirements: 15.1_

  - [ ] 12.2 Test content from Strapi
    - Verify all content displays correctly from production Strapi
    - Check that images load correctly
    - Verify no console errors (F12 → Console tab)
    - Test on mobile device or responsive mode
    - _Requirements: 12.3, 14.1_

  - [ ] 12.3 Test content updates
    - Edit content in production Strapi
    - Wait a few seconds and refresh Vercel site
    - Verify changes appear (may need to clear cache)
    - _Requirements: 12.3_

- [ ] 13. Configure custom domain (Optional)
  - [ ] 13.1 Add domain in Vercel
    - Go to Project Settings → Domains
    - Click "Add" and enter your custom domain
    - Vercel will provide DNS records to add
    - _Requirements: 15.1_

  - [ ] 13.2 Update DNS records
    - Go to your domain registrar (GoDaddy, Namecheap, etc.)
    - Add the DNS records provided by Vercel
    - Wait for DNS propagation (can take up to 48 hours)
    - _Requirements: 15.1_

  - [ ] 13.3 Update environment variables
    - Update `NEXT_PUBLIC_APP_URL` in Vercel to your custom domain
    - Update Strapi CORS settings to allow custom domain
    - Redeploy Vercel project
    - _Requirements: 15.4_

- [ ] 14. Set up automatic deployments
  - [ ] 14.1 Configure Git integration
    - Verify Vercel auto-deploys on push to main branch (enabled by default)
    - Test by making a small change and pushing to GitHub
    - Verify Vercel automatically builds and deploys
    - _Requirements: 15.1_

  - [ ] 14.2 Configure preview deployments
    - Create a new branch: `git checkout -b test-feature`
    - Make a change and push: `git push origin test-feature`
    - Create pull request on GitHub
    - Verify Vercel creates preview deployment
    - Test preview URL before merging
    - _Requirements: 15.1_

---

## Phase 5: Final Testing & Documentation

- [ ] 15. Comprehensive testing
  - [ ] 15.1 Test all functionality
    - Test all navigation links work
    - Test all forms (contact form, newsletter)
    - Test all interactive elements
    - Test on multiple browsers (Chrome, Firefox, Safari)
    - Test on mobile devices (iOS and Android)
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ] 15.2 Performance testing
    - Run Lighthouse audit in Chrome DevTools
    - Check Performance score (target: 90+)
    - Check Accessibility score (target: 90+)
    - Check Best Practices score (target: 90+)
    - Check SEO score (target: 90+)
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [ ] 15.3 SEO verification
    - Verify all pages have proper meta titles
    - Verify all pages have meta descriptions
    - Verify Open Graph tags are present
    - Test social media sharing (Twitter, Facebook, LinkedIn)
    - _Requirements: 9.1, 9.2, 9.4, 9.5_

- [ ] 16. Create documentation
  - [ ] 16.1 Update README.md
    - Add project overview
    - Document technology stack (Next.js, Strapi, Vercel)
    - Add local development setup instructions
    - Document environment variables
    - Add deployment instructions
    - _Requirements: 15.2_

  - [ ] 16.2 Create CMS user guide
    - Document how to log into Strapi
    - Explain how to add/edit projects
    - Explain how to add/edit services
    - Explain how to add/edit industries
    - Explain how to add/edit articles
    - Document image upload best practices
    - _Requirements: 15.5_

  - [ ] 16.3 Create deployment guide
    - Document Vercel deployment process
    - Document Strapi hosting setup
    - Document environment variable configuration
    - Document custom domain setup
    - Add troubleshooting section
    - _Requirements: 15.2_

---

## Phase 6: Handoff & Training

- [ ] 17. Final handoff
  - [ ] 17.1 Provide access credentials
    - Share Strapi admin credentials
    - Share Vercel account access
    - Share GitHub repository access
    - Share domain registrar access (if applicable)
    - _Requirements: 15.5_

  - [ ] 17.2 Conduct training session
    - Walk through Strapi CMS interface
    - Demonstrate how to add/edit content
    - Show how to upload images
    - Explain publishing workflow
    - Answer questions
    - _Requirements: 15.5_

  - [ ] 17.3 Create support documentation
    - Document common tasks
    - Create troubleshooting guide
    - Provide contact information for support
    - _Requirements: 15.5_

---

## Success Criteria

✅ Strapi CMS is set up with all content types
✅ Website successfully fetches content from Strapi
✅ Content changes in Strapi reflect on website
✅ Website is deployed to Vercel
✅ Custom domain is configured (if applicable)
✅ Automatic deployments work from GitHub
✅ All pages load correctly in production
✅ Performance scores are acceptable
✅ Documentation is complete
✅ Client can manage content independently

---

## Notes

- **Current Status**: Website UI is complete, using mock data
- **Next Step**: Start with Phase 1 - Strapi CMS Setup
- **Estimated Time**: 2-3 days for full implementation
- **Priority**: Focus on core content types (Projects, Services, Industries) first
- **Optional**: Articles/Insights and Careers pages can be added later

