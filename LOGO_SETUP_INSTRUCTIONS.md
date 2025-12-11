# Logo Setup Instructions

## Current Status
The website is configured to use the logo, but the file needs to be copied to the correct location.

## Steps to Fix the Logo

### 1. Locate Your Logo File
- **Location**: `C:\Users\aqramos\OneDrive - pjlhuillier.com\Desktop`
- **Filename**: "NCVI logo Dec 10"
- **File Type**: Check if it's `.png`, `.jpg`, or `.svg`

### 2. Copy the Logo to Your Project

#### Option A: Using File Explorer
1. Open File Explorer
2. Navigate to: `C:\Users\aqramos\OneDrive - pjlhuillier.com\Desktop`
3. Find "NCVI logo Dec 10"
4. Copy the file (Ctrl+C)
5. Navigate to your project folder's `public` directory
6. Paste the file (Ctrl+V)
7. Rename it to: `ncvi-logo.png` (or `ncvi-logo.svg` if it's an SVG)

#### Option B: Using Command Line
Open Command Prompt in your project directory and run:

```cmd
copy "C:\Users\aqramos\OneDrive - pjlhuillier.com\Desktop\NCVI logo Dec 10.png" public\ncvi-logo.png
```

(Adjust the extension if it's `.svg` or `.jpg`)

### 3. Update the Code (if needed)

The code is currently set to use `/NCVI_Logo.svg`. After you copy your file, I can update the code to match your filename.

**Current code uses**: `/NCVI_Logo.svg`
**Your file will be**: `/ncvi-logo.png` (or whatever extension you have)

### 4. Verify the Logo Appears

After copying the file:
1. Refresh your browser (Ctrl+F5 for hard refresh)
2. The logo should now appear in:
   - Navigation header (top left)
   - Mobile menu
   - Footer

## Troubleshooting

### Logo Still Not Showing?

**Check 1: File Location**
- Ensure the file is in the `public` folder (not in a subfolder)
- Path should be: `your-project/public/ncvi-logo.png`

**Check 2: File Name**
- Make sure there are no spaces in the filename
- Use lowercase and hyphens: `ncvi-logo.png`
- Check the file extension matches

**Check 3: File Format**
- Supported formats: PNG, JPG, SVG
- PNG or SVG recommended for best quality
- SVG is best for scalability

**Check 4: Browser Cache**
- Clear browser cache
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### Need to Update the Code?

If your logo filename is different, let me know and I'll update:
- `components/Navigation.tsx`
- `components/Footer.tsx`

To use your specific filename.

## Quick Command to Copy

Replace `[extension]` with your actual file extension (png, svg, or jpg):

```cmd
copy "C:\Users\aqramos\OneDrive - pjlhuillier.com\Desktop\NCVI logo Dec 10.[extension]" public\ncvi-logo.[extension]
```

## After Copying

Once you've copied the file, let me know:
1. The exact filename you used
2. The file extension (png, svg, or jpg)

I'll then update the code to match your filename exactly!
