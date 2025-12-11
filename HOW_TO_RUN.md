# How to Run the Website Locally

## Quick Start - EASIEST METHOD ⚡

**Just double-click the `start-website.bat` file!**

That's it! The website will start automatically and you can visit http://localhost:3000

---

## Alternative Method - Manual Start

**Use Command Prompt (cmd), NOT PowerShell!**

PowerShell has script execution restrictions that can block npm. Here's how to run it manually:

## Running It Yourself

### Prerequisites
- Node.js (version 20 or higher)
- npm (comes with Node.js)

### Steps to Run

1. **Open Command Prompt (cmd)**
   - Press `Windows Key + R`
   - Type `cmd` and press Enter
   - **DO NOT use PowerShell** (it has script restrictions)

2. **Navigate to the project folder**
   ```bash
   cd "C:\Users\aqramos\Kiro website new"
   ```

3. **Install dependencies** (only needed first time or after pulling updates)
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   You should see output like:
   ```
   ▲ Next.js 14.2.0
   - Local:        http://localhost:3000
   ✓ Ready in 2.5s
   ```

5. **Open your browser** and visit:
   ```
   http://localhost:3000
   ```

### Available Pages

Once the server is running, you can visit:

- **Homepage**: http://localhost:3000
- **Services**: http://localhost:3000/services
- **Industries**: http://localhost:3000/industries
- **Contact**: http://localhost:3000/contact (NEW!)

### Stopping the Server

To stop the development server:
- Press `Ctrl + C` in the terminal where it's running
- Type `Y` when asked to terminate

### Other Useful Commands

```bash
# Run tests
npm test

# Build for production
npm run build

# Start production server (after building)
npm start

# Check for code issues
npm run lint

# Format code
npm run format
```

## Troubleshooting

### Port Already in Use
If you see an error that port 3000 is already in use:
- Stop any other Next.js servers running
- Or use a different port: `npm run dev -- -p 3001`

### PowerShell Script Execution Error
If you get a script execution policy error in PowerShell:
- Use Command Prompt instead, or
- Run: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

### Module Not Found Errors
If you see module errors:
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## What's New - Contact Page

The contact page includes:
- ✅ Contact form with validation
- ✅ Real-time error messages
- ✅ Success/error feedback
- ✅ Office locations display
- ✅ Responsive design
- ✅ Accessibility features

Try submitting the form with:
- Valid data to see success message
- Invalid email to see validation
- Empty fields to see required field errors

## Development Tips

- The server auto-reloads when you save files
- Check the terminal for any errors
- Use browser DevTools (F12) to inspect elements
- The site is fully responsive - try resizing your browser!
