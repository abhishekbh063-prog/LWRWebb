// Google Apps Script Configuration
// Follow these steps to set up Google Apps Script as your database:
// 
// 1. Create a Google Sheet:
//    - Go to https://sheets.google.com
//    - Create a new spreadsheet
//    - Name it "Labor Tracking Data" (or any name you prefer)
//
// 2. Open Apps Script Editor:
//    - In your Google Sheet, click "Extensions" → "Apps Script"
//    - Delete any existing code
//    - Copy all code from "apps-script-code.gs" file
//    - Paste it into the Apps Script editor
//    - Click "Save" (disk icon)
//
// 3. Deploy as Web App:
//    - Click "Deploy" → "New deployment"
//    - Click gear icon → Select "Web app"
//    - Description: "Labor Tracking API"
//    - Execute as: "Me"
//    - Who has access: "Anyone" (don't worry, data is still private!)
//    - Click "Deploy"
//    - Click "Authorize access"
//    - Choose your Google account
//    - Click "Advanced" → "Go to [Project Name] (unsafe)"
//    - Click "Allow"
//    - Copy the "Web app URL"
//
// 4. Fill in the configuration below:

const GOOGLE_SHEETS_CONFIG = {
    // Your Apps Script Web App URL (paste the URL you copied)
    webAppUrl: 'https://script.google.com/macros/s/AKfycbyJcavfRr7fRNFNaWR_PQpjInQnsqqDPFWb4kdzPdwBQaW9Rg4o3M5UORW73kkHNa6rYg/exec',
    
    // Sheet names (must match the names in apps-script-code.gs)
    sheets: {
        records: 'Labor Records',
        workTypes: 'Work Types',
        translations: 'Translations'
    }
};

// SECURITY NOTE:
// The Web App URL is safe to share - it only allows access through your script.
// Your data remains private in your Google Sheet.
// Only you can edit the sheet directly.

// Example configuration (replace with your actual URL):
// const GOOGLE_SHEETS_CONFIG = {
//     webAppUrl: 'https://script.google.com/macros/s/AKfycbx.../exec',
//     sheets: {
//         records: 'Labor Records',
//         workTypes: 'Work Types',
//         translations: 'Translations'
//     }
// };
