# Sample Data - Hero Section (Single Type)

This is a **Single Type** content type, meaning there's only ONE hero section for the entire website.

## How to Add to Strapi

1. Go to http://localhost:1337/admin
2. Click "Content Manager" → "Hero Section" (in the Single Types section)
3. Fill in the fields below
4. Click "Save"

---

## Hero Section Data

**headline:**
```
Transforming Businesses Through Innovative ICT Solutions
```

**subtext:**
```
Partner with the ICT arm of PJ Lhuillier Group for comprehensive technology solutions that drive growth, efficiency, and digital transformation across your enterprise.
```

**ctaText:**
```
Get Started
```

**ctaLink:**
```
#contact
```

**backgroundImage:**
(Leave empty to use gradient background, or upload a hero image)

**stats:** (JSON format)
```json
[
  {
    "value": "15+",
    "label": "Years Experience"
  },
  {
    "value": "500+",
    "label": "Projects Delivered"
  },
  {
    "value": "98%",
    "label": "Client Satisfaction"
  },
  {
    "value": "24/7",
    "label": "Support Available"
  }
]
```

---

## Alternative Hero Content Examples

### Option 2: Focus on Innovation
**headline:**
```
Leading the Digital Transformation Journey
```

**subtext:**
```
Empowering Filipino businesses with world-class ICT solutions, backed by the trusted PJ Lhuillier Group legacy and cutting-edge technology expertise.
```

### Option 3: Focus on Partnership
**headline:**
```
Your Strategic Technology Partner for Success
```

**subtext:**
```
From enterprise architecture to cloud solutions, we deliver comprehensive ICT services that transform challenges into opportunities for growth.
```

---

## Notes

- The hero section is a **Single Type**, so you only need to configure it once
- The `ctaLink` can be:
  - An anchor link (e.g., `#contact`, `#services`)
  - A page URL (e.g., `/contact`, `/services`)
- Stats are displayed at the bottom of the hero section
- If no background image is provided, a premium gradient will be used
- The badge text "ICT Solutions & Strategic Innovation" is hardcoded in the component

---

**Created:** December 18, 2024
