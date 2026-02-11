// Google Apps Script Sync Service
class GoogleSheetsSync {
    constructor(config) {
        this.config = config;
        this.webAppUrl = config.webAppUrl;
    }

    // Check if Google Sheets is configured
    isConfigured() {
        return this.config.webAppUrl !== 'YOUR_WEB_APP_URL_HERE' &&
               this.config.webAppUrl.length > 0 &&
               this.config.webAppUrl.includes('script.google.com');
    }

    // Make a request to the Apps Script Web App
    async makeRequest(action, data = {}, retries = 3) {
        if (!this.isConfigured()) {
            throw new Error('Google Sheets is not configured. Please update google-sheets-config.js');
        }

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const payload = {
                    action: action,
                    ...data
                };

                console.log(`Making request to Apps Script (attempt ${attempt}/${retries}):`, action);

                const response = await fetch(this.webAppUrl, {
                    method: 'POST',
                    redirect: 'follow',
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    },
                    body: JSON.stringify(payload)
                });

                console.log('Response status:', response.status);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Response error:', errorText);
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }

                const text = await response.text();
                console.log('Response text:', text);
                
                const result = JSON.parse(text);
                
                if (!result.success && result.error) {
                    throw new Error(result.error);
                }

                console.log('Request successful:', result);
                return result;
                
            } catch (error) {
                console.error(`Error making request to Apps Script (attempt ${attempt}/${retries}):`, error);
                
                if (attempt === retries) {
                    throw error;
                }
                
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
    }

    // Sync records to Google Sheets
    async syncRecords(records) {
        if (!this.isConfigured()) {
            throw new Error('Google Sheets is not configured');
        }

        console.log(`Syncing ${records.length} records to Google Sheets...`);
        return await this.makeRequest('syncRecords', { records });
    }

    // Sync work types to Google Sheets
    async syncWorkTypes(taskDetails, categoryTranslations, taskTranslations) {
        if (!this.isConfigured()) {
            throw new Error('Google Sheets is not configured');
        }

        console.log('Syncing work types to Google Sheets...');
        return await this.makeRequest('syncWorkTypes', {
            taskDetails,
            categoryTranslations,
            taskTranslations
        });
    }

    // Load records from Google Sheets
    async loadRecords() {
        if (!this.isConfigured()) {
            throw new Error('Google Sheets is not configured');
        }

        console.log('Loading records from Google Sheets...');
        const result = await this.makeRequest('loadRecords');
        console.log(`Loaded ${result.records ? result.records.length : 0} records`);
        return result.records || [];
    }

    // Load work types from Google Sheets
    async loadWorkTypes() {
        if (!this.isConfigured()) {
            throw new Error('Google Sheets is not configured');
        }

        console.log('Loading work types from Google Sheets...');
        const result = await this.makeRequest('loadWorkTypes');
        
        if (result.taskDetails) {
            console.log('Work types loaded successfully');
            return {
                taskDetails: result.taskDetails,
                categoryTranslations: result.categoryTranslations,
                taskTranslations: result.taskTranslations
            };
        }
        
        return null;
    }

    // Check connection
    async checkConnection() {
        try {
            console.log('Checking Google Sheets connection...');
            const result = await this.makeRequest('checkConnection');
            console.log('Connection check result:', result);
            return result.success === true;
        } catch (error) {
            console.error('Google Sheets connection error:', error);
            return false;
        }
    }
}

// Initialize Google Sheets sync (will be used by the main app)
let googleSheetsSync = null;
if (typeof GOOGLE_SHEETS_CONFIG !== 'undefined') {
    googleSheetsSync = new GoogleSheetsSync(GOOGLE_SHEETS_CONFIG);
    console.log('Google Sheets Sync initialized with URL:', GOOGLE_SHEETS_CONFIG.webAppUrl);
}
