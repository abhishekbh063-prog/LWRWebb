// Google Apps Script for Labor Tracking System
// Deploy this as a Web App to get a URL for your application

// Configuration - Update these with your sheet names
const SHEET_NAMES = {
  RECORDS: 'Labor Records',
  WORK_TYPES: 'Work Types',
  TRANSLATIONS: 'Translations'
};

// Main function to handle all requests
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    let result;
    switch(action) {
      case 'syncRecords':
        result = syncRecords(data.records);
        break;
      case 'syncWorkTypes':
        result = syncWorkTypes(data.taskDetails, data.categoryTranslations, data.taskTranslations);
        break;
      case 'loadRecords':
        result = loadRecords();
        break;
      case 'loadWorkTypes':
        result = loadWorkTypes();
        break;
      case 'checkConnection':
        result = { success: true, message: 'Connection successful' };
        break;
      default:
        result = { success: false, error: 'Unknown action: ' + action };
    }
    
    // Return with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString(),
        stack: error.stack
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'Labor Tracking System API is running',
      timestamp: new Date().toISOString(),
      message: 'Use POST requests to interact with the API'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Sync records to sheet
function syncRecords(records) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAMES.RECORDS);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAMES.RECORDS);
    }
    
    // Clear existing data
    sheet.clear();
    
    // Add headers
    const headers = [
      'ID', 'Date', 'Laborer Name', 'Task Category', 'Task Detail',
      'Unit Type', 'Quantity', 'Rate', 'Total Earned', 'Amount Paid',
      'Balance Change', 'Remarks'
    ];
    sheet.appendRow(headers);
    
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#2c5530');
    headerRange.setFontColor('#ffffff');
    
    // Add records
    if (records && records.length > 0) {
      records.forEach(record => {
        // Format date consistently as DD/MM/YYYY for Google Sheets
        let dateValue = record.date;
        if (typeof dateValue === 'string' && dateValue) {
          // Parse YYYY-MM-DD format and convert to DD/MM/YYYY
          const parts = dateValue.split('-');
          if (parts.length === 3) {
            dateValue = `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
          }
        }
        
        sheet.appendRow([
          record.id || '',
          dateValue || '',
          record.laborerName || '',
          record.taskCategory || '',
          record.taskDetail || '',
          record.unitType || '',
          record.quantity || 0,
          record.rate || 0,
          record.totalEarned || 0,
          record.amountPaid || 0,
          record.balanceChange || 0,
          record.remarks || ''
        ]);
      });
      
      // Format the Date column as plain text to prevent auto-formatting
      const dateColumnRange = sheet.getRange(2, 2, records.length, 1); // Column B (Date)
      dateColumnRange.setNumberFormat('@'); // @ means plain text format
    }
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
    
    return { 
      success: true, 
      message: `Synced ${records ? records.length : 0} records`,
      count: records ? records.length : 0
    };
    
  } catch (error) {
    Logger.log('Error in syncRecords: ' + error.toString());
    return { 
      success: false, 
      error: error.toString() 
    };
  }
}

// Sync work types to sheet
function syncWorkTypes(taskDetails, categoryTranslations, taskTranslations) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAMES.WORK_TYPES);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAMES.WORK_TYPES);
    }
    
    // Clear existing data
    sheet.clear();
    
    // Add headers
    const headers = [
      'Category', 'Task', 'Category_EN', 'Category_KN', 'Task_EN', 'Task_KN'
    ];
    sheet.appendRow(headers);
    
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#2c5530');
    headerRange.setFontColor('#ffffff');
    
    // Add work types
    let count = 0;
    if (taskDetails) {
      for (const category in taskDetails) {
        const tasks = taskDetails[category];
        if (tasks && Array.isArray(tasks)) {
          tasks.forEach(task => {
            const catTrans = categoryTranslations[category] || {};
            const taskTrans = taskTranslations[task] || {};
            
            sheet.appendRow([
              category || '',
              task || '',
              catTrans.en || category || '',
              catTrans.kn || category || '',
              taskTrans.en || task || '',
              taskTrans.kn || task || ''
            ]);
            count++;
          });
        }
      }
    }
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
    
    return { 
      success: true, 
      message: `Synced ${count} work types`,
      count: count
    };
    
  } catch (error) {
    Logger.log('Error in syncWorkTypes: ' + error.toString());
    return { 
      success: false, 
      error: error.toString() 
    };
  }
}

// Load records from sheet
function loadRecords() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAMES.RECORDS);
    
    if (!sheet) {
      return { 
        success: true, 
        records: [],
        message: 'No records sheet found'
      };
    }
    
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return { 
        success: true, 
        records: [],
        message: 'No records found'
      };
    }
    
    // Skip header row
    const records = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row[0]) continue; // Skip empty rows
      
      // Format date properly - convert from DD/MM/YYYY to YYYY-MM-DD
      let dateValue = row[1];
      if (dateValue instanceof Date) {
        // If it's a Date object, format it
        const year = dateValue.getFullYear();
        const month = String(dateValue.getMonth() + 1).padStart(2, '0');
        const day = String(dateValue.getDate()).padStart(2, '0');
        dateValue = `${year}-${month}-${day}`;
      } else if (typeof dateValue === 'string' && dateValue) {
        // If it's a string in DD/MM/YYYY format, convert to YYYY-MM-DD
        const parts = dateValue.split('/');
        if (parts.length === 3) {
          const [day, month, year] = parts;
          dateValue = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } else {
          // Try to parse as date
          try {
            const d = new Date(dateValue);
            if (!isNaN(d.getTime())) {
              const year = d.getFullYear();
              const month = String(d.getMonth() + 1).padStart(2, '0');
              const day = String(d.getDate()).padStart(2, '0');
              dateValue = `${year}-${month}-${day}`;
            }
          } catch (e) {
            // Keep original value if parsing fails
          }
        }
      }
      
      records.push({
        id: row[0],
        date: dateValue,
        laborerName: row[2] || '',
        taskCategory: row[3] || '',
        taskDetail: row[4] || '',
        unitType: row[5] || '',
        quantity: parseFloat(row[6]) || 0,
        rate: parseFloat(row[7]) || 0,
        totalEarned: parseFloat(row[8]) || 0,
        amountPaid: parseFloat(row[9]) || 0,
        balanceChange: parseFloat(row[10]) || 0,
        remarks: row[11] || ''
      });
    }
    
    return { 
      success: true, 
      records: records,
      count: records.length
    };
    
  } catch (error) {
    Logger.log('Error in loadRecords: ' + error.toString());
    return { 
      success: false, 
      error: error.toString() 
    };
  }
}

// Load work types from sheet
function loadWorkTypes() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAMES.WORK_TYPES);
    
    if (!sheet) {
      return { 
        success: true, 
        taskDetails: {},
        categoryTranslations: {},
        taskTranslations: {},
        message: 'No work types sheet found'
      };
    }
    
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return { 
        success: true, 
        taskDetails: {},
        categoryTranslations: {},
        taskTranslations: {},
        message: 'No work types found'
      };
    }
    
    const taskDetails = {};
    const categoryTranslations = {};
    const taskTranslations = {};
    
    // Skip header row
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row[0]) continue; // Skip empty rows
      
      const category = row[0] || '';
      const task = row[1] || '';
      const catEn = row[2] || category;
      const catKn = row[3] || category;
      const taskEn = row[4] || task;
      const taskKn = row[5] || task;
      
      // Add to taskDetails
      if (!taskDetails[category]) {
        taskDetails[category] = [];
      }
      if (!taskDetails[category].includes(task)) {
        taskDetails[category].push(task);
      }
      
      // Add translations
      categoryTranslations[category] = {
        en: catEn,
        kn: catKn
      };
      
      taskTranslations[task] = {
        en: taskEn,
        kn: taskKn
      };
    }
    
    return { 
      success: true, 
      taskDetails: taskDetails,
      categoryTranslations: categoryTranslations,
      taskTranslations: taskTranslations
    };
    
  } catch (error) {
    Logger.log('Error in loadWorkTypes: ' + error.toString());
    return { 
      success: false, 
      error: error.toString() 
    };
  }
}
