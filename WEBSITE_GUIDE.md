# Website Navigation Guide

## 🏠 Homepage (http://localhost:3000)

The homepage features:
- **Hero Section**: Eye-catching banner with call-to-action
- **Featured Services**: Grid of 3 main services
- **Case Studies**: Success stories from clients
- **Latest Insights**: Recent articles and news

## 🛠️ Services Page (http://localhost:3000/services)

Browse all available services:
- Cloud Solutions
- Digital Transformation
- Cybersecurity

Click any service to see detailed information including:
- Full description
- Features and benefits
- Related case studies
- Call-to-action to contact

## 🏭 Industries Page (http://localhost:3000/industries)

Explore industries we serve:
- Healthcare
- Financial Services
- Manufacturing
- Retail & E-commerce
- Education
- Energy & Utilities

Each industry page shows:
- Case examples with outcomes
- Statistics and metrics
- Client testimonials
- Related services
- Related articles

## 📧 Contact Page (http://localhost:3000/contact) ✨ NEW!

Get in touch with us:

### Contact Form
- **Name** (required)
- **Email** (required, validated)
- **Phone** (optional)
- **Subject** (required)
- **Message** (required, min 10 characters)

**Try it out!**
- Submit with valid data → See success message
- Submit with invalid email → See validation error
- Leave fields empty → See required field errors

### Office Locations
View our global offices:
- **New York Headquarters**
  - Address, phone, email
  - Business hours
  
- **London Office**
  - Full contact details
  
- **Singapore Office**
  - Complete information

## 🎨 Design Features

### Color Scheme
- Primary: Red (#E31837)
- Background: White
- Text: Dark gray for readability

### Responsive Design
The website adapts to:
- 📱 Mobile (< 768px)
- 📱 Tablet (768px - 1023px)
- 💻 Desktop (1024px+)

**Try resizing your browser to see it in action!**

### Accessibility
- Keyboard navigation (try pressing Tab)
- Screen reader support
- High contrast ratios
- Focus indicators on all interactive elements

## 🧪 Testing the Contact Form

### Valid Submission
```
Name: John Doe
Email: john@example.com
Phone: +1 555-123-4567 (optional)
Subject: Inquiry about services
Message: I would like to learn more about your cloud solutions.
```
**Result**: ✅ Success message, form clears

### Invalid Email
```
Name: John Doe
Email: notanemail
Subject: Test
Message: This is a test message
```
**Result**: ❌ "Please enter a valid email address"

### Missing Required Fields
```
Name: (empty)
Email: john@example.com
Subject: Test
Message: Test
```
**Result**: ❌ "Name is required"

### Short Message
```
Name: John Doe
Email: john@example.com
Subject: Test
Message: Hi
```
**Result**: ❌ "Message must be at least 10 characters"

## 🔍 What to Look For

### Navigation
- Click the logo to return home
- Use the navigation menu to explore pages
- Notice active page highlighting

### Hover Effects
- Buttons change color on hover
- Cards lift slightly when you hover over them
- Links change color

### Loading States
- Skeleton loaders while data fetches
- Smooth transitions

### Form Validation
- Real-time error messages
- Field highlighting for errors
- Success/error notifications

## 📱 Mobile Experience

To test mobile view:
1. Press F12 to open DevTools
2. Click the device toggle icon (or press Ctrl+Shift+M)
3. Select a mobile device from the dropdown
4. See the responsive layout in action!

Mobile features:
- Hamburger menu (if implemented)
- Touch-friendly buttons
- Optimized layouts
- Readable text sizes

## 🚀 Performance

The website is optimized for:
- Fast loading times
- Smooth animations
- Efficient data fetching
- Minimal bundle sizes

## 💡 Tips

1. **Keep the terminal open** while browsing - it shows useful info
2. **Check for errors** in the browser console (F12)
3. **Try all the forms** to see validation in action
4. **Resize the window** to see responsive design
5. **Use keyboard navigation** to test accessibility

## 🎯 Next Steps

After exploring the website, you can:
- Customize colors in `tailwind.config.ts`
- Add more content in `lib/api.ts`
- Modify components in the `components/` folder
- Add new pages in the `app/` folder

Enjoy exploring your new website! 🎉
