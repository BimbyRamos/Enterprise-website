# Sample Data - About Us Section (Single Type)

This is a **Single Type** content type, meaning there's only ONE about us section for the entire website.

## How to Add to Strapi

1. Go to http://localhost:1337/admin
2. Click "Content Manager" → "About Us Section" (in the Single Types section)
3. Fill in the fields below
4. Click "Save"

---

## About Us Section Data

**companyName:**
```
Networld Capital Ventures, Inc.
```

**mainDescription:**
```
is the ICT arm of the PJ Lhuillier Group ('Cebuana Lhuillier') of Companies, offering a wide range of innovative ICT solutions that empower businesses to thrive in the digital age.
```

**secondaryDescription:**
```
With over 15 years of excellence, we combine deep industry expertise with cutting-edge technology to deliver transformative solutions that drive growth, efficiency, and competitive advantage.
```

**stats:** (JSON format)
```json
[
  {
    "value": "15+",
    "label": "Years of Excellence",
    "icon": "📅",
    "color": "#8B1538"
  },
  {
    "value": "500+",
    "label": "Projects Delivered",
    "icon": "🚀",
    "color": "#2563EB"
  },
  {
    "value": "98%",
    "label": "Client Satisfaction",
    "icon": "⭐",
    "color": "#8B1538"
  },
  {
    "value": "24/7",
    "label": "Support Available",
    "icon": "🛡️",
    "color": "#2563EB"
  }
]
```

**values:** (JSON format)
```json
[
  {
    "icon": "🏢",
    "title": "Part of PJ Lhuillier Group",
    "description": "Backed by the trusted Cebuana Lhuillier brand with decades of proven excellence in serving Filipino communities",
    "features": ["Established Legacy", "Trusted Brand", "Financial Stability"]
  },
  {
    "icon": "💻",
    "title": "Comprehensive ICT Solutions",
    "description": "End-to-end technology services from infrastructure to cloud, tailored to your unique business needs",
    "features": ["Full-Stack Services", "Custom Solutions", "Scalable Architecture"]
  },
  {
    "icon": "🎯",
    "title": "Innovation Focused",
    "description": "Driving digital transformation and sustainable growth through cutting-edge technology and strategic partnerships",
    "features": ["Latest Technology", "Future-Ready", "Continuous Innovation"]
  }
]
```

**achievements:** (JSON format)
```json
[
  {
    "title": "Industry Leader",
    "description": "Recognized as a top ICT provider in the Philippines"
  },
  {
    "title": "Certified Partners",
    "description": "Official partners with leading technology vendors"
  },
  {
    "title": "Award Winning",
    "description": "Multiple industry awards for excellence and innovation"
  }
]
```

---

## Field Descriptions

### companyName
The official company name displayed prominently in the about section.

### mainDescription
The primary description that appears right after the company name. Should explain what the company is and its relationship to parent company.

### secondaryDescription
Additional context about the company's experience, expertise, and value proposition.

### stats
Array of statistics displayed as cards:
- `value`: The statistic number (e.g., "15+", "500+")
- `label`: Description of the stat
- `icon`: Emoji icon to display
- `color`: Hex color code for the stat

### values
Array of core value cards:
- `icon`: Emoji icon
- `title`: Value title
- `description`: Detailed description
- `features`: Array of feature tags to display

### achievements
Array of achievement badges:
- `title`: Achievement title
- `description`: Brief description

---

## Notes

- The about us section is a **Single Type**, so you only need to configure it once
- All JSON fields should be valid JSON format
- Icons use emoji characters for simplicity
- Colors should be hex codes (e.g., "#8B1538")
- The section header "WHO WE ARE" and "About Us" are hardcoded in the component
- Features in values are displayed as small tags below the description

---

**Created:** December 18, 2024
