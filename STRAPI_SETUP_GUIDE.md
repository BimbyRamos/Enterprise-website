# Strapi CMS Setup & Access Guide

## 📋 Current Status

✅ **Strapi is configured** in your project!
- Docker configuration: `docker-compose.yml`
- Dockerfile: `Dockerfile.strapi`
- Folder: `strapi/` (currently empty - needs initialization)

❌ **Strapi is NOT initialized yet** - The strapi folder only has a `.gitkeep` file

---

## 🚀 Quick Setup (Choose One Method)

### Method 1: Initialize Strapi Locally (Recommended) ⭐

This will create a new Strapi project in the `strapi/` folder.

#### Step 1: Initialize Strapi
```bash
# Navigate to your project root
cd your-project-folder

# Create Strapi project
npx create-strapi-app@latest strapi --quickstart --no-run

# This will:
# - Create Strapi files in the strapi/ folder
# - Install dependencies
# - Set up the database structure
```

#### Step 2: Configure Database Connection
```bash
# Edit strapi/.env file
cd strapi
```

Create/edit `strapi/.env`:
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=enterprise_website
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_SSL=false
```

#### Step 3: Start Services
```bash
# Go back to project root
cd ..

# Start PostgreSQL database
docker-compose up postgres -d

# Start Strapi (from strapi folder)
cd strapi
npm run develop

# OR use Docker for everything
cd ..
docker-compose up strapi
```

#### Step 4: Access Strapi Admin
1. Open browser: `http://localhost:1337/admin`
2. Create your first admin account
3. Start managing content!

---

### Method 2: Use Docker Compose (Full Stack)

#### Step 1: Generate Secrets
First, you need to generate secure secrets for Strapi:

```bash
# Generate random secrets (run these commands)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
# Copy output for JWT_SECRET

node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
# Copy output for ADMIN_JWT_SECRET

node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
# Copy output for API_TOKEN_SALT

node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
# Copy output for APP_KEYS
```

#### Step 2: Update .env.local
Add these to your `.env.local`:
```env
# Strapi Secrets
JWT_SECRET=your_generated_secret_here
ADMIN_JWT_SECRET=your_generated_admin_secret_here
API_TOKEN_SALT=your_generated_salt_here
APP_KEYS=your_generated_app_keys_here

# Database
DATABASE_NAME=enterprise_website
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/enterprise_website

# CMS
CMS_API_TOKEN=your_cms_api_token_here
```

#### Step 3: Initialize Strapi First
```bash
# You still need to initialize Strapi first
npx create-strapi-app@latest strapi --quickstart --no-run
```

#### Step 4: Start All Services
```bash
# Start everything with Docker
docker-compose up

# Or start in background
docker-compose up -d

# Check logs
docker-compose logs -f strapi
```

#### Step 5: Access Services
- **Strapi Admin**: http://localhost:1337/admin
- **Strapi API**: http://localhost:1337/api
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000

---

## 🎯 Recommended Approach (Easiest)

### Quick Start - Local Development

```bash
# 1. Initialize Strapi
npx create-strapi-app@latest strapi --quickstart

# This will:
# - Create strapi folder with all files
# - Install dependencies
# - Start Strapi automatically
# - Open browser to http://localhost:1337/admin

# 2. Create your admin account in the browser

# 3. Start building content types!
```

That's it! Strapi will run on `http://localhost:1337`

---

## 📝 After Setup - Create Content Types

Once Strapi is running, you'll want to create these content types:

### 1. Services
```
Fields:
- title (Text)
- slug (UID)
- description (Rich Text)
- icon (Text)
- features (JSON)
- benefits (JSON)
- image (Media)
```

### 2. Projects
```
Fields:
- title (Text)
- slug (UID)
- description (Rich Text)
- client (Text)
- industry (Relation to Industries)
- technologies (JSON)
- images (Media - Multiple)
- featured (Boolean)
```

### 3. Industries
```
Fields:
- name (Text)
- slug (UID)
- description (Rich Text)
- icon (Text)
- services (Relation to Services)
- image (Media)
```

### 4. Blog Posts
```
Fields:
- title (Text)
- slug (UID)
- content (Rich Text)
- excerpt (Text)
- author (Text)
- publishedAt (Date)
- featured_image (Media)
- category (Enumeration)
```

### 5. Team Members
```
Fields:
- name (Text)
- position (Text)
- bio (Rich Text)
- photo (Media)
- linkedin (Text)
- email (Email)
```

---

## 🔧 Troubleshooting

### Issue: "Cannot find module 'strapi'"
**Solution**: Strapi folder is empty. Run initialization:
```bash
npx create-strapi-app@latest strapi --quickstart
```

### Issue: "Database connection failed"
**Solution**: Make sure PostgreSQL is running:
```bash
docker-compose up postgres -d
```

### Issue: "Port 1337 already in use"
**Solution**: Stop other Strapi instances:
```bash
# Find process
lsof -i :1337

# Kill process (replace PID)
kill -9 PID

# Or change port in strapi/.env
PORT=1338
```

### Issue: "Admin panel not loading"
**Solution**: 
1. Clear browser cache
2. Try incognito mode
3. Check Strapi logs:
```bash
cd strapi
npm run develop
```

---

## 📱 Accessing Strapi

### Local Development:
- **Admin Panel**: http://localhost:1337/admin
- **API Docs**: http://localhost:1337/documentation
- **API Endpoint**: http://localhost:1337/api

### After Deployment:
- **Admin Panel**: https://your-domain.com:1337/admin
- **API**: https://your-domain.com:1337/api

---

## 🔐 Security Best Practices

### 1. Change Default Credentials
Never use default passwords in production!

### 2. Generate Strong Secrets
Use the crypto commands provided above

### 3. Enable HTTPS
Always use HTTPS in production

### 4. Set Up CORS
Configure allowed origins in `strapi/config/middlewares.js`

### 5. API Tokens
Create API tokens for frontend access instead of using admin credentials

---

## 📚 Next Steps

1. ✅ Initialize Strapi (choose method above)
2. ✅ Create admin account
3. ✅ Create content types (Services, Projects, etc.)
4. ✅ Add sample content
5. ✅ Configure API permissions
6. ✅ Connect frontend to Strapi API
7. ✅ Deploy to production

---

## 🎓 Learning Resources

- **Strapi Docs**: https://docs.strapi.io
- **Quick Start**: https://docs.strapi.io/dev-docs/quick-start
- **Content Types**: https://docs.strapi.io/user-docs/content-types-builder
- **API Reference**: https://docs.strapi.io/dev-docs/api/rest

---

## 💡 Pro Tips

1. **Use SQLite for quick testing**: Strapi can use SQLite initially, then migrate to PostgreSQL
2. **Enable auto-reload**: Strapi watches for changes in development
3. **Use plugins**: Strapi has many useful plugins (SEO, sitemap, etc.)
4. **API tokens**: Create read-only tokens for frontend
5. **Backup regularly**: Export your content types and data

---

## 🚀 Quick Command Reference

```bash
# Initialize Strapi
npx create-strapi-app@latest strapi --quickstart

# Start Strapi (development)
cd strapi
npm run develop

# Start Strapi (production)
npm run start

# Build Strapi
npm run build

# Start with Docker
docker-compose up strapi

# View logs
docker-compose logs -f strapi

# Stop services
docker-compose down

# Reset database
docker-compose down -v
docker-compose up postgres -d
```

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Strapi folder has files (not just .gitkeep)
- [ ] Can access http://localhost:1337/admin
- [ ] Created admin account
- [ ] Database connection working
- [ ] Can create content types
- [ ] API endpoints responding
- [ ] Frontend can fetch data

---

## 🆘 Need Help?

If you encounter issues:
1. Check Strapi logs: `docker-compose logs strapi`
2. Verify database is running: `docker-compose ps`
3. Check environment variables in `.env.local`
4. Try reinitializing: Delete `strapi/` folder and start over
5. Ask for help with specific error messages

---

**Ready to start?** Run this command:
```bash
npx create-strapi-app@latest strapi --quickstart
```

This will set up everything and open the admin panel automatically! 🎉
