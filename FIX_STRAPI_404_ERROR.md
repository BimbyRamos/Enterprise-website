# Fix Strapi 404 Error - Quick Solution

## Problem
Content types exist in Strapi admin, but API endpoints return 404 errors.

## Solution: Restart Strapi

### Step 1: Stop Strapi
In the terminal where Strapi is running, press:
```
Ctrl + C
```

### Step 2: Restart Strapi
```bash
cd "C:\Users\aqramos\Kiro website new\strapi"
npm run develop
```

Wait for:
```
[INFO] ⚡️ Server started on http://localhost:1337
```

### Step 3: Test Again
Run the test script:
```bash
cd "C:\Users\aqramos\Kiro website new"
node test-strapi-api.js
```

You should now see 200 or 403 status codes instead of 404.

---

## If You Still Get 404 Errors After Restart

The routes might not be generated. Check if these files exist:

```
strapi/src/api/project/routes/project.js
strapi/src/api/service/routes/service.js
strapi/src/api/industry/routes/industry.js
strapi/src/api/article/routes/article.js
```

If any are missing, I'll create them for you.

---

## If You Get 403 Forbidden Errors

That's actually GOOD! It means the API is working, you just need to set permissions:

1. Go to: http://localhost:1337/admin
2. Settings → Roles → Public
3. Scroll down and check `find` and `findOne` for each content type
4. Click Save

Then test again - you should get 200 status codes!
