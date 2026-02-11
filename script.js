class LaborTrackingSystem {
    constructor() {
        this.records = JSON.parse(localStorage.getItem('laborRecords')) || [];
        this.taskDetails = JSON.parse(localStorage.getItem('taskDetails')) || {
            'Arecanut': ['Tree Cutting', 'Husking', 'Spraying', 'Harvesting'],
            'Rice': ['Planting', 'Weeding', 'Harvesting', 'Threshing'],
            'Ginger': ['Planting', 'Weeding', 'Harvesting', 'Processing'],
            'House Work': ['Cleaning', 'Cooking', 'Maintenance', 'General Work'],
            'Maintenance': ['Grass Picking', 'Tool Repair', 'Fence Repair', 'General Maintenance']
        };
        
        // Translation mappings for categories and tasks
        this.categoryTranslations = JSON.parse(localStorage.getItem('categoryTranslations')) || {
            'Arecanut': { en: 'Arecanut', kn: 'ಅಡಿಕೆ' },
            'Rice': { en: 'Rice', kn: 'ಅಕ್ಕಿ' },
            'Ginger': { en: 'Ginger', kn: 'ಶುಂಠಿ' },
            'House Work': { en: 'House Work', kn: 'ಮನೆ ಕೆಲಸ' },
            'Maintenance': { en: 'Maintenance', kn: 'ನಿರ್ವಹಣೆ' }
        };
        
        this.taskTranslations = JSON.parse(localStorage.getItem('taskTranslations')) || {
            // Arecanut tasks
            'Tree Cutting': { en: 'Tree Cutting', kn: 'ಮರ ಕತ್ತರಿಸುವುದು' },
            'Husking': { en: 'Husking', kn: 'ಸಿಪ್ಪೆ ಸುಲಿಯುವುದು' },
            'Spraying': { en: 'Spraying', kn: 'ಸಿಂಪಣೆ ಮಾಡುವುದು' },
            'Harvesting': { en: 'Harvesting', kn: 'ಕೊಯ್ಲು' },
            
            // Rice tasks
            'Planting': { en: 'Planting', kn: 'ನೆಟ್ಟಿಗೆ' },
            'Weeding': { en: 'Weeding', kn: 'ಕಳೆ ತೆಗೆಯುವುದು' },
            'Threshing': { en: 'Threshing', kn: 'ಬಡಿಯುವುದು' },
            
            // Ginger tasks
            'Processing': { en: 'Processing', kn: 'ಸಂಸ್ಕರಣೆ' },
            
            // House Work tasks
            'Cleaning': { en: 'Cleaning', kn: 'ಸ್ವಚ್ಛಗೊಳಿಸುವುದು' },
            'Cooking': { en: 'Cooking', kn: 'ಅಡುಗೆ' },
            'Maintenance': { en: 'Maintenance', kn: 'ನಿರ್ವಹಣೆ' },
            'General Work': { en: 'General Work', kn: 'ಸಾಮಾನ್ಯ ಕೆಲಸ' },
            
            // Maintenance tasks
            'Grass Picking': { en: 'Grass Picking', kn: 'ಹುಲ್ಲು ಕೀಳುವುದು' },
            'Tool Repair': { en: 'Tool Repair', kn: 'ಉಪಕರಣ ದುರಸ್ತಿ' },
            'Fence Repair': { en: 'Fence Repair', kn: 'ಬೇಲಿ ದುರಸ್ತಿ' },
            'General Maintenance': { en: 'General Maintenance', kn: 'ಸಾಮಾನ್ಯ ನಿರ್ವಹಣೆ' }
        };
        
        this.currentLanguage = localStorage.getItem('currentLanguage') || 'en';
        this.autoSyncEnabled = localStorage.getItem('autoSyncEnabled') === 'true';
        this.translations = {
            en: {
                title: "🌾 Labor Wage Tracking System",
                subtitle: "Agricultural Work Management",
                filterByLaborer: "Filter by Laborer:",
                allLaborers: "All Laborers",
                totalOutstanding: "Total Outstanding",
                totalAdvances: "Total Advances",
                manageWorkTypes: "🔧 Manage Work Types",
                category: "Category:",
                selectCategory: "Select Category",
                arecanut: "Arecanut",
                rice: "Rice",
                ginger: "Ginger",
                houseWork: "House Work",
                maintenance: "Maintenance",
                addNewCategory: "+ Add New Category",
                newCategoryName: "New Category Name:",
                enterNewCategory: "Enter new category",
                workType: "Work Type:",
                workTypePlaceholder: "e.g., Pruning, Fertilizing",
                addWorkType: "➕ Add Work Type",
                addNewEntry: "Add New Entry",
                date: "Date",
                laborerName: "Laborer Name",
                taskCategory: "Task Category",
                taskDetail: "Task Detail",
                selectTask: "Select Task",
                unitType: "Unit Type",
                selectUnit: "Select Unit",
                day: "Day",
                hour: "Hour",
                kg: "Kg",
                quintal: "Quintal",
                tree: "Tree",
                piece: "Piece",
                quantity: "Quantity",
                ratePerUnit: "Rate per Unit (₹)",
                amountPaidToday: "Amount Paid Today (₹)",
                remarks: "Remarks",
                optionalNotes: "Optional notes",
                addEntry: "Add Entry",
                workRecords: "Work Records",
                laborer: "Laborer",
                unit: "Unit",
                qty: "Qty",
                rate: "Rate",
                earned: "Earned",
                paid: "Paid",
                balance: "Balance",
                status: "Status",
                action: "Action",
                laborerSummary: "Laborer Summary",
                outstandingPayments: "💰 Outstanding Payments",
                advancePayments: "🏦 Advance Payments",
                delete: "Delete",
                due: "Due",
                advance: "Advance",
                paidStatus: "Paid",
                totalEarned: "Total Earned",
                totalPaid: "Total Paid",
                outstanding: "Outstanding",
                advanceTaken: "Advance Taken",
                noOutstandingPayments: "No outstanding payments! 🎉\nAll laborers are up to date.",
                noAdvancePayments: "No advance payments! 💰\nNo laborers have taken advances.",
                selectRemarks: "Select Remarks",
                fullPayment: "Full payment",
                partialPayment: "Partial payment",
                toBePaid: "To be paid",
                advanceGiven: "Advance given",
                repayment2Days: "Repayment after 2 days",
                repayment4Days: "Repayment after 4 days",
                repayment1Week: "Repayment after 1 week",
                repayment2Weeks: "Repayment after 2 weeks",
                emergencyPayment: "Emergency payment",
                bonusPayment: "Bonus payment",
                festivalAdvance: "Festival advance",
                medicalAdvance: "Medical advance",
                customRemarks: "Custom remarks...",
                repaymentNextMonth: "Repayment next month",
                workCompleted: "Work completed",
                halfDayWork: "Half day work",
                overtimePayment: "Overtime payment",
                translationTip: "New categories and tasks will use the same name in both languages initially. You can edit translations by clicking on the work tags below.",
                dataManagement: "📊 Data Management",
                exportWorkTypes: "📤 Export Work Types",
                importWorkTypes: "📥 Import Work Types",
                exportAllData: "📋 Export All Records",
                downloadTemplate: "📋 Download Template",
                instructions: "Instructions:",
                instruction1: "📤 Export: Download current work types to Excel file",
                instruction2: "📋 Template: Download sample Excel format",
                instruction3: "📥 Import: Upload Excel file to add new work types",
                instruction4: "📋 Records: Export all work records to Excel",
                instruction5: "🔄 CSV Sync: Import/Export in Labor_Tracking_Template.csv format",
                instruction6: "⚡ Auto-Sync: Automatically export after each entry when enabled",
                syncWithCSV: "🔄 Sync with CSV",
                csvSync: "📁 CSV File Sync",
                importCSVRecords: "📥 Import CSV Records",
                exportCSVFormat: "💾 Export CSV Format",
                enableAutoSync: "⚡ Enable Auto-Sync",
                disableAutoSync: "⚡ Disable Auto-Sync",
                googleSheetsSync: "📊 Google Sheets Sync",
                checkGoogleSheets: "🔍 Check Status",
                configureGoogleSheets: "⚙️ Configure",
                selectRemarks: "Select Remarks",
                fullPayment: "Full payment",
                partialPayment: "Partial payment",
                toBePaid: "To be paid",
                repayment2Days: "Repayment after 2 days",
                repayment4Days: "Repayment after 4 days",
                repayment1Week: "Repayment after 1 week",
                repayment2Weeks: "Repayment after 2 weeks",
                advanceGiven: "Advance given",
                emergencyPayment: "Emergency payment",
                bonusPayment: "Bonus payment",
                festivalAdvance: "Festival advance",
                medicalAdvance: "Medical advance",
                customRemarks: "Custom remarks...",
                generateReceipt: "Generate Receipt",
                fromDate: "From Date",
                toDate: "To Date",
                selectLaborer: "Select Laborer",
                receiptType: "Receipt Type",
                workSummary: "Work Summary",
                paymentReceipt: "Payment Receipt",
                detailedReport: "Detailed Report",
                companyName: "Company/Farm Name",
                companyNamePlaceholder: "Enter your farm/company name",
                ownerName: "Owner Name",
                ownerNamePlaceholder: "Enter owner name",
                previewReceipt: "Preview Receipt",
                downloadPDF: "Download PDF",
                receiptTitle: "Work & Payment Receipt",
                receiptPeriod: "Period",
                laborerDetails: "Laborer Details",
                workDetails: "Work Details",
                paymentDetails: "Payment Details",
                grandTotal: "Grand Total",
                totalWork: "Total Work Done",
                totalEarnedAmount: "Total Earned Amount",
                totalPaidAmount: "Total Paid Amount",
                balanceAmount: "Balance Amount"
            },
            kn: {
                title: "🌾 ಕಾರ್ಮಿಕ ವೇತನ ಟ್ರ್ಯಾಕಿಂಗ್ ಸಿಸ್ಟಮ್",
                subtitle: "ಕೃಷಿ ಕೆಲಸ ನಿರ್ವಹಣೆ",
                filterByLaborer: "ಕಾರ್ಮಿಕರ ಮೂಲಕ ಫಿಲ್ಟರ್ ಮಾಡಿ:",
                allLaborers: "ಎಲ್ಲಾ ಕಾರ್ಮಿಕರು",
                totalOutstanding: "ಒಟ್ಟು ಬಾಕಿ",
                totalAdvances: "ಒಟ್ಟು ಮುಂಗಡ",
                manageWorkTypes: "🔧 ಕೆಲಸದ ಪ್ರಕಾರಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
                category: "ವರ್ಗ:",
                selectCategory: "ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
                arecanut: "ಅಡಿಕೆ",
                rice: "ಅಕ್ಕಿ",
                ginger: "ಶುಂಠಿ",
                houseWork: "ಮನೆ ಕೆಲಸ",
                maintenance: "ನಿರ್ವಹಣೆ",
                addNewCategory: "+ ಹೊಸ ವರ್ಗ ಸೇರಿಸಿ",
                newCategoryName: "ಹೊಸ ವರ್ಗದ ಹೆಸರು:",
                enterNewCategory: "ಹೊಸ ವರ್ಗವನ್ನು ನಮೂದಿಸಿ",
                workType: "ಕೆಲಸದ ಪ್ರಕಾರ:",
                workTypePlaceholder: "ಉದಾ., ಕತ್ತರಿಸುವುದು, ಗೊಬ್ಬರ ಹಾಕುವುದು",
                addWorkType: "➕ ಕೆಲಸದ ಪ್ರಕಾರ ಸೇರಿಸಿ",
                addNewEntry: "ಹೊಸ ನಮೂದು ಸೇರಿಸಿ",
                date: "ದಿನಾಂಕ",
                laborerName: "ಕಾರ್ಮಿಕರ ಹೆಸರು",
                taskCategory: "ಕೆಲಸದ ವರ್ಗ",
                taskDetail: "ಕೆಲಸದ ವಿವರ",
                selectTask: "ಕೆಲಸವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
                unitType: "ಘಟಕದ ಪ್ರಕಾರ",
                selectUnit: "ಘಟಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
                day: "ದಿನ",
                hour: "ಗಂಟೆ",
                kg: "ಕಿಲೋ",
                quintal: "ಕ್ವಿಂಟಲ್",
                tree: "ಮರ",
                piece: "ತುಂಡು",
                quantity: "ಪ್ರಮಾಣ",
                ratePerUnit: "ಪ್ರತಿ ಘಟಕದ ದರ (₹)",
                amountPaidToday: "ಇಂದು ಪಾವತಿಸಿದ ಮೊತ್ತ (₹)",
                remarks: "ಟಿಪ್ಪಣಿಗಳು",
                optionalNotes: "ಐಚ್ಛಿಕ ಟಿಪ್ಪಣಿಗಳು",
                addEntry: "ನಮೂದು ಸೇರಿಸಿ",
                workRecords: "ಕೆಲಸದ ದಾಖಲೆಗಳು",
                laborer: "ಕಾರ್ಮಿಕ",
                unit: "ಘಟಕ",
                qty: "ಪ್ರಮಾಣ",
                rate: "ದರ",
                earned: "ಗಳಿಸಿದ",
                paid: "ಪಾವತಿಸಿದ",
                balance: "ಬ್ಯಾಲೆನ್ಸ್",
                status: "ಸ್ಥಿತಿ",
                action: "ಕ್ರಿಯೆ",
                laborerSummary: "ಕಾರ್ಮಿಕರ ಸಾರಾಂಶ",
                outstandingPayments: "💰 ಬಾಕಿ ಪಾವತಿಗಳು",
                advancePayments: "🏦 ಮುಂಗಡ ಪಾವತಿಗಳು",
                delete: "ಅಳಿಸಿ",
                due: "ಬಾಕಿ",
                advance: "ಮುಂಗಡ",
                paidStatus: "ಪಾವತಿಸಲಾಗಿದೆ",
                totalEarned: "ಒಟ್ಟು ಗಳಿಕೆ",
                totalPaid: "ಒಟ್ಟು ಪಾವತಿ",
                outstanding: "ಬಾಕಿ",
                advanceTaken: "ಮುಂಗಡ ತೆಗೆದುಕೊಂಡಿದೆ",
                noOutstandingPayments: "ಯಾವುದೇ ಬಾಕಿ ಪಾವತಿಗಳಿಲ್ಲ! 🎉\nಎಲ್ಲಾ ಕಾರ್ಮಿಕರು ನವೀಕೃತರಾಗಿದ್ದಾರೆ.",
                noAdvancePayments: "ಯಾವುದೇ ಮುಂಗಡ ಪಾವತಿಗಳಿಲ್ಲ! 💰\nಯಾವುದೇ ಕಾರ್ಮಿಕರು ಮುಂಗಡ ತೆಗೆದುಕೊಂಡಿಲ್ಲ.",
                selectRemarks: "ಟಿಪ್ಪಣಿಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
                fullPayment: "ಪೂರ್ಣ ಪಾವತಿ",
                partialPayment: "ಭಾಗಶಃ ಪಾವತಿ",
                toBePaid: "ಪಾವತಿಸಬೇಕಾಗಿದೆ",
                advanceGiven: "ಮುಂಗಡ ನೀಡಲಾಗಿದೆ",
                repayment2Days: "2 ದಿನಗಳ ನಂತರ ಮರುಪಾವತಿ",
                repayment4Days: "4 ದಿನಗಳ ನಂತರ ಮರುಪಾವತಿ",
                repayment1Week: "1 ವಾರದ ನಂತರ ಮರುಪಾವತಿ",
                repayment2Weeks: "2 ವಾರಗಳ ನಂತರ ಮರುಪಾವತಿ",
                emergencyPayment: "ತುರ್ತು ಪಾವತಿ",
                bonusPayment: "ಬೋನಸ್ ಪಾವತಿ",
                festivalAdvance: "ಹಬ್ಬದ ಮುಂಗಡ",
                medicalAdvance: "ವೈದ್ಯಕೀಯ ಮುಂಗಡ",
                customRemarks: "ಕಸ್ಟಮ್ ಟಿಪ್ಪಣಿಗಳು...",
                repaymentNextMonth: "ಮುಂದಿನ ತಿಂಗಳು ಮರುಪಾವತಿ",
                workCompleted: "ಕೆಲಸ ಪೂರ್ಣಗೊಂಡಿದೆ",
                halfDayWork: "ಅರ್ಧ ದಿನದ ಕೆಲಸ",
                overtimePayment: "ಹೆಚ್ಚುವರಿ ಸಮಯದ ಪಾವತಿ",
                translationTip: "ಹೊಸ ವರ್ಗಗಳು ಮತ್ತು ಕೆಲಸಗಳು ಆರಂಭದಲ್ಲಿ ಎರಡೂ ಭಾಷೆಗಳಲ್ಲಿ ಒಂದೇ ಹೆಸರನ್ನು ಬಳಸುತ್ತವೆ. ಕೆಳಗಿನ ಕೆಲಸದ ಟ್ಯಾಗ್‌ಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ನೀವು ಅನುವಾದಗಳನ್ನು ಸಂಪಾದಿಸಬಹುದು.",
                dataManagement: "📊 ಡೇಟಾ ನಿರ್ವಹಣೆ",
                exportWorkTypes: "📤 ಕೆಲಸದ ಪ್ರಕಾರಗಳನ್ನು ರಫ್ತು ಮಾಡಿ",
                importWorkTypes: "📥 ಕೆಲಸದ ಪ್ರಕಾರಗಳನ್ನು ಆಮದು ಮಾಡಿ",
                exportAllData: "📋 ಎಲ್ಲಾ ದಾಖಲೆಗಳನ್ನು ರಫ್ತು ಮಾಡಿ",
                downloadTemplate: "📋 ಟೆಂಪ್ಲೇಟ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
                instructions: "ಸೂಚನೆಗಳು:",
                instruction1: "📤 ರಫ್ತು: ಪ್ರಸ್ತುತ ಕೆಲಸದ ಪ್ರಕಾರಗಳನ್ನು ಎಕ್ಸೆಲ್ ಫೈಲ್‌ಗೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
                instruction2: "📋 ಟೆಂಪ್ಲೇಟ್: ಮಾದರಿ ಎಕ್ಸೆಲ್ ಫಾರ್ಮ್ಯಾಟ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
                instruction3: "📥 ಆಮದು: ಹೊಸ ಕೆಲಸದ ಪ್ರಕಾರಗಳನ್ನು ಸೇರಿಸಲು ಎಕ್ಸೆಲ್ ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
                instruction4: "📋 ದಾಖಲೆಗಳು: ಎಲ್ಲಾ ಕೆಲಸದ ದಾಖಲೆಗಳನ್ನು ಎಕ್ಸೆಲ್‌ಗೆ ರಫ್ತು ಮಾಡಿ",
                instruction5: "🔄 CSV ಸಿಂಕ್: Labor_Tracking_Template.csv ಫಾರ್ಮ್ಯಾಟ್‌ನಲ್ಲಿ ಆಮದು/ರಫ್ತು",
                instruction6: "⚡ ಆಟೋ-ಸಿಂಕ್: ಸಕ್ರಿಯಗೊಳಿಸಿದಾಗ ಪ್ರತಿ ನಮೂದಿನ ನಂತರ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ರಫ್ತು ಮಾಡಿ",
                syncWithCSV: "🔄 CSV ನೊಂದಿಗೆ ಸಿಂಕ್ ಮಾಡಿ",
                csvSync: "📁 CSV ಫೈಲ್ ಸಿಂಕ್",
                importCSVRecords: "📥 CSV ದಾಖಲೆಗಳನ್ನು ಆಮದು ಮಾಡಿ",
                exportCSVFormat: "💾 CSV ಫಾರ್ಮ್ಯಾಟ್ ರಫ್ತು ಮಾಡಿ",
                enableAutoSync: "⚡ ಆಟೋ-ಸಿಂಕ್ ಸಕ್ರಿಯಗೊಳಿಸಿ",
                disableAutoSync: "⚡ ಆಟೋ-ಸಿಂಕ್ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ",
                googleSheetsSync: "📊 Google Sheets ಸಿಂಕ್",
                checkGoogleSheets: "🔍 ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",
                configureGoogleSheets: "⚙️ ಕಾನ್ಫಿಗರ್ ಮಾಡಿ",
                selectRemarks: "ಟಿಪ್ಪಣಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
                fullPayment: "ಪೂರ್ಣ ಪಾವತಿ",
                partialPayment: "ಭಾಗಶಃ ಪಾವತಿ",
                toBePaid: "ಪಾವತಿಸಬೇಕು",
                repayment2Days: "2 ದಿನಗಳ ನಂತರ ಮರುಪಾವತಿ",
                repayment4Days: "4 ದಿನಗಳ ನಂತರ ಮರುಪಾವತಿ",
                repayment1Week: "1 ವಾರದ ನಂತರ ಮರುಪಾವತಿ",
                repayment2Weeks: "2 ವಾರಗಳ ನಂತರ ಮರುಪಾವತಿ",
                advanceGiven: "ಮುಂಗಡ ನೀಡಲಾಗಿದೆ",
                emergencyPayment: "ತುರ್ತು ಪಾವತಿ",
                bonusPayment: "ಬೋನಸ್ ಪಾವತಿ",
                festivalAdvance: "ಹಬ್ಬದ ಮುಂಗಡ",
                medicalAdvance: "ವೈದ್ಯಕೀಯ ಮುಂಗಡ",
                customRemarks: "ಕಸ್ಟಮ್ ಟಿಪ್ಪಣಿಗಳು..."
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleData();
        this.renderRecords();
        this.updateSummary();
        this.updateLaborerFilter();
        this.updateLaborerSummary();
        this.updateLaborerDatalist();
        this.renderWorkTags();
        this.updateLanguage(); // Initialize language
        
        // Set today's date as default in consistent format
        const dateInput = document.getElementById('date');
        dateInput.value = this.formatDateToISO(new Date());
        
        // Initialize auto-sync button state
        this.updateAutoSyncButton();
        
        // Add entrance animations
        this.addEntranceAnimations();
        
        // Auto-load from Google Sheets on page load/refresh
        this.autoLoadFromGoogleSheets();
        
        // Start auto-refresh every 2 seconds
        this.startAutoRefresh();
    }
    
    // Auto-refresh data every 2 seconds
    startAutoRefresh() {
        // Clear any existing interval
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
        
        // Set up auto-refresh every 1 second - Google Sheets only
        this.refreshInterval = setInterval(() => {
            this.refreshData();
        }, 1000); // 1000ms = 1 second
        
        console.log('Auto-refresh enabled: loading from Google Sheets every 1 second');
    }
    
    // Refresh data from Google Sheets only
    async refreshData() {
        try {
            // Check if Google Sheets is configured
            if (!googleSheetsSync || !googleSheetsSync.isConfigured()) {
                console.log('Google Sheets not configured, skipping refresh');
                return;
            }
            
            // Skip if already refreshing
            if (this.isRefreshing) {
                return;
            }
            this.isRefreshing = true;
            
            // Add visual feedback
            const indicator = document.getElementById('autoRefreshIndicator');
            if (indicator) {
                indicator.style.background = 'rgba(40, 167, 69, 0.3)';
            }
            
            // Load from Google Sheets
            const records = await googleSheetsSync.loadRecords();
            if (records && records.length > 0) {
                // Only update if data has actually changed
                const newDataHash = JSON.stringify(records);
                const currentDataHash = JSON.stringify(this.records);
                
                if (newDataHash !== currentDataHash) {
                    this.records = records;
                    this.saveToStorage();
                    this.renderRecords();
                    this.updateSummary();
                    this.updateLaborerFilter();
                    this.updateLaborerSummary();
                    console.log('✅ Data refreshed from Google Sheets');
                } else {
                    // Data unchanged, no need to re-render
                    console.log('📊 Data unchanged, skipping render');
                }
            }
            
            // Reset visual feedback
            setTimeout(() => {
                if (indicator) {
                    indicator.style.background = 'rgba(255, 255, 255, 0.2)';
                }
            }, 300);
            
            this.isRefreshing = false;
        } catch (error) {
            console.error('❌ Error during auto-refresh:', error);
            this.isRefreshing = false;
        }
    }
    
    // Auto-load data from Google Sheets on page load
    async autoLoadFromGoogleSheets() {
        // Only load if Google Sheets is configured
        if (!googleSheetsSync || !googleSheetsSync.isConfigured()) {
            console.log('Google Sheets not configured, using local data');
            return;
        }

        try {
            console.log('Loading data from Google Sheets...');
            
            // Load records
            const records = await googleSheetsSync.loadRecords();
            if (records && records.length > 0) {
                this.records = records;
                this.saveToStorage();
                console.log(`Loaded ${records.length} records from Google Sheets`);
            }

            // Load work types
            const workTypes = await googleSheetsSync.loadWorkTypes();
            if (workTypes) {
                // Only update if we got actual data (not empty objects)
                if (workTypes.taskDetails && Object.keys(workTypes.taskDetails).length > 0) {
                    this.taskDetails = workTypes.taskDetails;
                    this.saveTaskDetails();
                    console.log('Loaded task details from Google Sheets');
                } else {
                    console.log('No task details in Google Sheets, syncing local data to cloud...');
                    // Sync local default data to Google Sheets
                    await this.autoSyncToGoogleSheets();
                }
                
                if (workTypes.categoryTranslations && Object.keys(workTypes.categoryTranslations).length > 0) {
                    this.categoryTranslations = workTypes.categoryTranslations;
                    this.saveCategoryTranslations();
                    console.log('Loaded category translations from Google Sheets');
                }
                
                if (workTypes.taskTranslations && Object.keys(workTypes.taskTranslations).length > 0) {
                    this.taskTranslations = workTypes.taskTranslations;
                    this.saveTaskTranslations();
                    console.log('Loaded task translations from Google Sheets');
                }
            }

            // Update UI
            this.renderRecords();
            this.updateSummary();
            this.updateLaborerFilter();
            this.updateLaborerSummary();
            this.updateLaborerDatalist();
            this.renderWorkTags();
            this.updateTaskCategoryOptions();
            
            console.log('✅ Data loaded from Google Sheets successfully');
        } catch (error) {
            console.error('Failed to load from Google Sheets:', error);
            console.log('Using local data instead');
        }
    }

    addEntranceAnimations() {
        // Stagger animations for form groups
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            const delayClass = `anim-delay-${Math.min(index + 1, 10)}`;
            group.classList.add(delayClass);
        });

        // Animate summary cards
        const summaryCards = document.querySelectorAll('.summary-card');
        summaryCards.forEach((card, index) => {
            const delayClass = `anim-delay-${Math.min((index + 1) * 2, 10)}`;
            card.classList.add(delayClass);
        });
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('entryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addRecord();
        });

        // Task category change
        document.getElementById('taskCategory').addEventListener('change', (e) => {
            this.updateTaskDetails(e.target.value);
        });

        // Laborer filter
        document.getElementById('laborerFilter').addEventListener('change', (e) => {
            this.filterRecords(e.target.value);
        });

        // New category selection
        document.getElementById('newCategory').addEventListener('change', (e) => {
            const newCategoryInput = document.getElementById('newCategoryName');
            if (e.target.value === 'new') {
                newCategoryInput.classList.remove('hidden');
                newCategoryInput.classList.add('visible');
                newCategoryInput.focus();
                newCategoryInput.classList.add('slideInUp');
            } else {
                newCategoryInput.classList.add('hidden');
                newCategoryInput.classList.remove('visible');
                newCategoryInput.classList.remove('slideInUp');
            }
        });

        // Modal close on outside click
        window.addEventListener('click', (e) => {
            const outstandingModal = document.getElementById('outstandingModal');
            const advancesModal = document.getElementById('advancesModal');
            
            if (e.target === outstandingModal) {
                this.closeModal('outstandingModal');
            }
            if (e.target === advancesModal) {
                this.closeModal('advancesModal');
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    this.closeModal(openModal.id);
                }
            }
        });
    }

    async addCustomWork() {
        const categorySelect = document.getElementById('newCategory');
        const newCategoryInput = document.getElementById('newCategoryName');
        const workTypeInput = document.getElementById('newWorkType');
        
        let category = categorySelect.value;
        const workType = workTypeInput.value.trim();
        
        if (category === 'new') {
            category = newCategoryInput.value.trim();
            if (!category) {
                this.showError('Please enter a category name');
                return;
            }
            
            // Add translation for new category (same name for both languages initially)
            this.addCategoryTranslation(category, category, category);
        }
        
        if (!category || !workType) {
            this.showError('Please select a category and enter a work type');
            return;
        }
        
        // Add to taskDetails
        if (!this.taskDetails[category]) {
            this.taskDetails[category] = [];
        }
        
        if (!this.taskDetails[category].includes(workType)) {
            this.taskDetails[category].push(workType);
            
            // Add translation for new task (same name for both languages initially)
            this.addTaskTranslation(workType, workType, workType);
            
            this.saveTaskDetails();
            this.renderWorkTags();
            this.updateTaskCategoryOptions();
            
            // Success animation
            const button = document.querySelector('.add-work-btn');
            button.classList.add('success-animation');
            setTimeout(() => button.classList.remove('success-animation'), 600);
            
            // Clear inputs
            workTypeInput.value = '';
            newCategoryInput.value = '';
            newCategoryInput.classList.add('hidden');
            newCategoryInput.classList.remove('visible');
            categorySelect.value = '';
            
            this.showSuccess(`Added "${workType}" to ${category} category!`);
            
            // Auto-sync to Google Sheets if configured
            await this.autoSyncToGoogleSheets();
        } else {
            this.showError('This work type already exists in the selected category');
        }
    }

    async removeCustomWork(category, workType) {
        if (confirm(`Remove "${workType}" from ${category}?`)) {
            this.taskDetails[category] = this.taskDetails[category].filter(work => work !== workType);
            
            // Remove category if empty
            if (this.taskDetails[category].length === 0) {
                delete this.taskDetails[category];
            }
            
            this.saveTaskDetails();
            this.renderWorkTags();
            this.updateTaskCategoryOptions();
            this.showSuccess(`Removed "${workType}" from ${category}`);
            
            // Auto-sync to Google Sheets if configured
            await this.autoSyncToGoogleSheets();
        }
    }

    renderWorkTags() {
        const container = document.getElementById('workTags');
        container.innerHTML = '';
        
        Object.entries(this.taskDetails).forEach(([category, works]) => {
            works.forEach((work, index) => {
                const tag = document.createElement('div');
                tag.className = 'work-tag';
                const delayClass = `anim-delay-${Math.min(index + 1, 10)}`;
                tag.classList.add(delayClass);
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-work';
                removeBtn.textContent = '×';
                removeBtn.title = 'Remove';
                removeBtn.onclick = async () => await this.removeCustomWork(category, work);
                
                tag.innerHTML = `
                    <span class="category">${this.getCategoryTranslation(category)}</span>
                    <span>${this.getTaskTranslation(work)}</span>
                `;
                tag.appendChild(removeBtn);
                container.appendChild(tag);
            });
        });
    }

    updateTaskCategoryOptions() {
        const categorySelect = document.getElementById('taskCategory');
        const newCategorySelect = document.getElementById('newCategory');
        const currentValue = categorySelect.value;
        const currentNewValue = newCategorySelect.value;
        
        // Update main task category dropdown
        categorySelect.innerHTML = `<option value="">${this.getTranslation('selectCategory')}</option>`;
        Object.keys(this.taskDetails).forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = this.getCategoryTranslation(category);
            if (category === currentValue) option.selected = true;
            categorySelect.appendChild(option);
        });

        // Update new category dropdown
        newCategorySelect.innerHTML = `<option value="">${this.getTranslation('selectCategory')}</option>`;
        Object.keys(this.taskDetails).forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = this.getCategoryTranslation(category);
            if (category === currentNewValue) option.selected = true;
            newCategorySelect.appendChild(option);
        });
        
        // Add the "new category" option
        const newOption = document.createElement('option');
        newOption.value = 'new';
        newOption.textContent = this.getTranslation('addNewCategory');
        newCategorySelect.appendChild(newOption);
    }

    saveTaskDetails() {
        localStorage.setItem('taskDetails', JSON.stringify(this.taskDetails));
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    showOutstandingDetails() {
        const balances = this.getLaborerBalances();
        const outstandingLaborers = Object.entries(balances).filter(([name, balance]) => balance > 0);
        
        const modal = document.getElementById('outstandingModal');
        const listContainer = document.getElementById('outstandingList');
        
        if (outstandingLaborers.length === 0) {
            listContainer.innerHTML = `<div class="no-data">${this.getTranslation('noOutstandingPayments')}</div>`;
        } else {
            listContainer.innerHTML = outstandingLaborers
                .sort((a, b) => b[1] - a[1]) // Sort by amount descending
                .map(([laborer, balance], index) => {
                    const totalEarned = this.records
                        .filter(record => record.laborerName === laborer)
                        .reduce((sum, record) => sum + record.totalEarned, 0);
                    
                    const totalPaid = this.records
                        .filter(record => record.laborerName === laborer)
                        .reduce((sum, record) => sum + record.amountPaid, 0);
                    
                    return `
                        <div class="detail-item outstanding anim-delay-${Math.min(index + 1, 10)}">
                            <div class="laborer-info">
                                <div class="laborer-name">${laborer}</div>
                                <div class="laborer-details">
                                    ${this.getTranslation('earned')}: ₹${totalEarned} | ${this.getTranslation('paid')}: ₹${totalPaid}
                                </div>
                            </div>
                            <div class="amount-info">
                                <div class="amount outstanding">₹${balance}</div>
                                <div class="amount-label">${this.getTranslation('outstanding')}</div>
                            </div>
                        </div>
                    `;
                }).join('');
        }
        
        modal.classList.add('show');
        document.body.classList.add('body-no-scroll');
    }

    showAdvancesDetails() {
        const balances = this.getLaborerBalances();
        const advanceLaborers = Object.entries(balances).filter(([name, balance]) => balance < 0);
        
        const modal = document.getElementById('advancesModal');
        const listContainer = document.getElementById('advancesList');
        
        if (advanceLaborers.length === 0) {
            listContainer.innerHTML = `<div class="no-data">${this.getTranslation('noAdvancePayments')}</div>`;
        } else {
            listContainer.innerHTML = advanceLaborers
                .sort((a, b) => a[1] - b[1]) // Sort by amount ascending (most negative first)
                .map(([laborer, balance], index) => {
                    const totalEarned = this.records
                        .filter(record => record.laborerName === laborer)
                        .reduce((sum, record) => sum + record.totalEarned, 0);
                    
                    const totalPaid = this.records
                        .filter(record => record.laborerName === laborer)
                        .reduce((sum, record) => sum + record.amountPaid, 0);
                    
                    const advanceAmount = Math.abs(balance);
                    
                    return `
                        <div class="detail-item advance anim-delay-${Math.min(index + 1, 10)}">
                            <div class="laborer-info">
                                <div class="laborer-name">${laborer}</div>
                                <div class="laborer-details">
                                    ${this.getTranslation('earned')}: ₹${totalEarned} | ${this.getTranslation('paid')}: ₹${totalPaid}
                                </div>
                            </div>
                            <div class="amount-info">
                                <div class="amount advance">₹${advanceAmount}</div>
                                <div class="amount-label">${this.getTranslation('advanceTaken')}</div>
                            </div>
                        </div>
                    `;
                }).join('');
        }
        
        modal.classList.add('show');
        document.body.classList.add('body-no-scroll');
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        const modalContent = modal.querySelector('.modal-content');
        
        modal.classList.add('modal-fade-out');
        modalContent.classList.add('modal-content-slide-out');
        
        setTimeout(() => {
            modal.classList.remove('show', 'modal-fade-out');
            modalContent.classList.remove('modal-content-slide-out');
            document.body.classList.remove('body-no-scroll');
            document.body.classList.add('body-scroll');
        }, 400);
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'kn' : 'en';
        localStorage.setItem('currentLanguage', this.currentLanguage);
        this.updateLanguage();
        this.showSuccess(this.currentLanguage === 'en' ? 'Language changed to English' : 'ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ');
    }

    updateLanguage() {
        const elements = document.querySelectorAll('[data-lang-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (this.translations[this.currentLanguage][key]) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = this.translations[this.currentLanguage][key];
                } else {
                    element.textContent = this.translations[this.currentLanguage][key];
                }
            }
        });

        // Update language toggle button
        const langIcon = document.getElementById('langIcon');
        const langText = document.getElementById('langText');
        
        if (this.currentLanguage === 'en') {
            langIcon.textContent = '🇮🇳';
            langText.textContent = 'ಕನ್ನಡ';
        } else {
            langIcon.textContent = '🇬🇧';
            langText.textContent = 'English';
        }

        // Update select options
        this.updateSelectOptions();
        
        // Update category and task dropdowns
        this.updateTaskCategoryOptions();
        
        // Update task details if a category is selected
        const selectedCategory = document.getElementById('taskCategory').value;
        if (selectedCategory) {
            this.updateTaskDetails(selectedCategory);
        }
        
        // Update work tags display
        this.renderWorkTags();
        
        // Update auto-sync button
        this.updateAutoSyncButton();
        
        // Update table headers and content
        this.renderRecords();
        this.updateLaborerSummary();
    }

    updateSelectOptions() {
        // Update category options
        const categorySelects = ['taskCategory', 'newCategory'];
        categorySelects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                const options = select.querySelectorAll('option[data-lang-key]');
                options.forEach(option => {
                    const key = option.getAttribute('data-lang-key');
                    if (this.translations[this.currentLanguage][key]) {
                        option.textContent = this.translations[this.currentLanguage][key];
                    }
                });
            }
        });

        // Update unit type options
        const unitSelect = document.getElementById('unitType');
        if (unitSelect) {
            const options = unitSelect.querySelectorAll('option[data-lang-key]');
            options.forEach(option => {
                const key = option.getAttribute('data-lang-key');
                if (this.translations[this.currentLanguage][key]) {
                    option.textContent = this.translations[this.currentLanguage][key];
                }
            });
        }

        // Update remarks dropdown options
        const remarksSelect = document.getElementById('remarksDropdown');
        if (remarksSelect) {
            const options = remarksSelect.querySelectorAll('option[data-lang-key]');
            options.forEach(option => {
                const key = option.getAttribute('data-lang-key');
                if (this.translations[this.currentLanguage][key]) {
                    option.textContent = this.translations[this.currentLanguage][key];
                }
            });
        }

        // Update laborer filter
        const laborerFilter = document.getElementById('laborerFilter');
        if (laborerFilter) {
            const allLaborersOption = laborerFilter.querySelector('option[value=""]');
            if (allLaborersOption) {
                allLaborersOption.textContent = this.translations[this.currentLanguage]['allLaborers'];
            }
        }
    }

    getTranslation(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    exportWorkTypes() {
        // Create CSV content for work types
        let csvContent = "Category,Task,Category_English,Category_Kannada,Task_English,Task_Kannada\n";
        
        Object.entries(this.taskDetails).forEach(([category, tasks]) => {
            tasks.forEach(task => {
                const categoryEn = this.categoryTranslations[category]?.en || category;
                const categoryKn = this.categoryTranslations[category]?.kn || category;
                const taskEn = this.taskTranslations[task]?.en || task;
                const taskKn = this.taskTranslations[task]?.kn || task;
                
                csvContent += `"${category}","${task}","${categoryEn}","${categoryKn}","${taskEn}","${taskKn}"\n`;
            });
        });
        
        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `work_types_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showSuccess(this.getTranslation('exportWorkTypes') + ' completed successfully!');
    }

    importWorkTypes(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csv = e.target.result;
                const lines = csv.split('\n');
                const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
                
                // Validate headers
                const expectedHeaders = ['Category', 'Task', 'Category_English', 'Category_Kannada', 'Task_English', 'Task_Kannada'];
                const hasValidHeaders = expectedHeaders.every(header => headers.includes(header));
                
                if (!hasValidHeaders) {
                    this.showError('Invalid file format. Please use the exported work types file format.');
                    return;
                }
                
                // Clear existing data
                this.taskDetails = {};
                this.categoryTranslations = {};
                this.taskTranslations = {};
                
                // Parse data
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;
                    
                    const values = this.parseCSVLine(line);
                    if (values.length >= 6) {
                        const [category, task, categoryEn, categoryKn, taskEn, taskKn] = values;
                        
                        // Add to taskDetails
                        if (!this.taskDetails[category]) {
                            this.taskDetails[category] = [];
                        }
                        if (!this.taskDetails[category].includes(task)) {
                            this.taskDetails[category].push(task);
                        }
                        
                        // Add translations
                        this.categoryTranslations[category] = {
                            en: categoryEn || category,
                            kn: categoryKn || category
                        };
                        
                        this.taskTranslations[task] = {
                            en: taskEn || task,
                            kn: taskKn || task
                        };
                    }
                }
                
                // Save and update UI
                this.saveTaskDetails();
                this.saveCategoryTranslations();
                this.saveTaskTranslations();
                this.renderWorkTags();
                this.updateTaskCategoryOptions();
                
                this.showSuccess(`${this.getTranslation('importWorkTypes')} completed successfully!`);
                
            } catch (error) {
                console.error('Import error:', error);
                this.showError('Error importing file. Please check the file format.');
            }
        };
        
        reader.readAsText(file);
        // Reset file input
        event.target.value = '';
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        return result;
    }

    exportAllData() {
        // Create CSV content for all records
        let csvContent = "Date,Laborer_Name,Task_Category,Task_Detail,Unit_Type,Quantity,Rate_per_Unit,Total_Earned,Amount_Paid,Balance_Change,Running_Balance,Payment_Status,Remarks\n";
        
        this.records.forEach((record, index) => {
            const runningBalance = this.calculateRunningBalance(record.laborerName, index);
            const status = this.getPaymentStatus(runningBalance);
            
            csvContent += `"${record.date}","${record.laborerName}","${record.taskCategory}","${record.taskDetail}","${record.unitType}",${record.quantity},${record.rate},${record.totalEarned},${record.amountPaid},${record.balanceChange},${runningBalance},"${status}","${record.remarks || ''}"\n`;
        });
        
        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `labor_records_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showSuccess(this.getTranslation('exportAllData') + ' completed successfully!');
    }

    downloadTemplate() {
        // Create template CSV content
        const templateContent = `Category,Task,Category_English,Category_Kannada,Task_English,Task_Kannada
"Arecanut","Tree Cutting","Arecanut","ಅಡಿಕೆ","Tree Cutting","ಮರ ಕತ್ತರಿಸುವುದು"
"Arecanut","Husking","Arecanut","ಅಡಿಕೆ","Husking","ಸಿಪ್ಪೆ ಸುಲಿಯುವುದು"
"Arecanut","Spraying","Arecanut","ಅಡಿಕೆ","Spraying","ಸಿಂಪಣೆ ಮಾಡುವುದು"
"Rice","Planting","Rice","ಅಕ್ಕಿ","Planting","ನೆಟ್ಟಿಗೆ"
"Rice","Weeding","Rice","ಅಕ್ಕಿ","Weeding","ಕಳೆ ತೆಗೆಯುವುದು"
"Ginger","Planting","Ginger","ಶುಂಠಿ","Planting","ನೆಟ್ಟಿಗೆ"
"House Work","Cleaning","House Work","ಮನೆ ಕೆಲಸ","Cleaning","ಸ್ವಚ್ಛಗೊಳಿಸುವುದು"
"Maintenance","Grass Picking","Maintenance","ನಿರ್ವಹಣೆ","Grass Picking","ಹುಲ್ಲು ಕೀಳುವುದು"`;
        
        // Create and download file
        const blob = new Blob([templateContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'work_types_template.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showSuccess(this.getTranslation('downloadTemplate') + ' completed successfully!');
    }

    syncWithCSV() {
        // This method guides users to sync with local CSV
        const message = this.currentLanguage === 'en' 
            ? 'To sync with your local CSV file:\n1. Click "Import CSV Records" to load existing data\n2. Add new entries in the web app\n3. Click "Export CSV Format" to download updated file\n4. Replace your local CSV file with the downloaded file'
            : 'ನಿಮ್ಮ ಸ್ಥಳೀಯ CSV ಫೈಲ್‌ನೊಂದಿಗೆ ಸಿಂಕ್ ಮಾಡಲು:\n1. ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಡೇಟಾವನ್ನು ಲೋಡ್ ಮಾಡಲು "CSV ದಾಖಲೆಗಳನ್ನು ಆಮದು ಮಾಡಿ" ಕ್ಲಿಕ್ ಮಾಡಿ\n2. ವೆಬ್ ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ ಹೊಸ ನಮೂದುಗಳನ್ನು ಸೇರಿಸಿ\n3. ನವೀಕರಿಸಿದ ಫೈಲ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು "CSV ಫಾರ್ಮ್ಯಾಟ್ ರಫ್ತು ಮಾಡಿ" ಕ್ಲಿಕ್ ಮಾಡಿ\n4. ಡೌನ್‌ಲೋಡ್ ಮಾಡಿದ ಫೈಲ್‌ನೊಂದಿಗೆ ನಿಮ್ಮ ಸ್ಥಳೀಯ CSV ಫೈಲ್ ಅನ್ನು ಬದಲಾಯಿಸಿ';
        
        alert(message);
    }

    importCSVRecords(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csv = e.target.result;
                const lines = csv.split('\n');
                const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
                
                // Map CSV headers to our internal format
                const headerMap = {
                    'Date': 'date',
                    'Laborer Name': 'laborerName',
                    'Task Category': 'taskCategory',
                    'Task Detail': 'taskDetail',
                    'Unit Type': 'unitType',
                    'Quantity': 'quantity',
                    'Rate per Unit': 'rate',
                    'Total Earned': 'totalEarned',
                    'Amount Paid': 'amountPaid',
                    'Balance Change': 'balanceChange',
                    'Payment Status': 'paymentStatus',
                    'Remarks': 'remarks'
                };
                
                // Clear existing records
                this.records = [];
                
                // Parse data
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;
                    
                    const values = this.parseCSVLine(line);
                    if (values.length >= headers.length) {
                        const record = {
                            id: Date.now() + i, // Generate unique ID
                        };
                        
                        headers.forEach((header, index) => {
                            const mappedField = headerMap[header];
                            if (mappedField && values[index]) {
                                let value = values[index].replace(/"/g, '').trim();
                                
                                // Convert numeric fields
                                if (['quantity', 'rate', 'totalEarned', 'amountPaid', 'balanceChange'].includes(mappedField)) {
                                    value = parseFloat(value) || 0;
                                }
                                
                                // Convert date format - handle both DD/MM/YYYY and MM/DD/YYYY
                                if (mappedField === 'date') {
                                    value = this.parseDateFromCSV(value);
                                }
                                
                                record[mappedField] = value;
                            }
                        });
                        
                        // Ensure required fields exist
                        if (record.date && record.laborerName && record.taskCategory) {
                            this.records.push(record);
                        }
                    }
                }
                
                // Save and update UI
                this.saveToStorage();
                this.renderRecords();
                this.updateSummary();
                this.updateLaborerFilter();
                this.updateLaborerSummary();
                this.updateLaborerDatalist();
                
                this.showSuccess(`${this.getTranslation('importCSVRecords')} completed! Imported ${this.records.length} records.`);
                
            } catch (error) {
                console.error('CSV Import error:', error);
                this.showError('Error importing CSV file. Please check the file format.');
            }
        };
        
        reader.readAsText(file);
        // Reset file input
        event.target.value = '';
    }

    exportToCSVFormat() {
        // Create CSV content matching the Labor_Tracking_Template.csv format
        let csvContent = "Date,Laborer Name,Task Category,Task Detail,Unit Type,Quantity,Rate per Unit,Total Earned,Amount Paid,Balance Change,Running Balance,Payment Status,Remarks\n";
        
        this.records.forEach((record, index) => {
            const runningBalance = this.calculateRunningBalance(record.laborerName, index);
            const status = this.getPaymentStatus(runningBalance);
            const formattedDate = this.formatDateForDisplay(record.date);
            
            csvContent += `${formattedDate},"${record.laborerName}","${record.taskCategory}","${record.taskDetail}","${record.unitType}",${record.quantity},${record.rate},${record.totalEarned},${record.amountPaid},${record.balanceChange},${runningBalance},"${status}","${record.remarks || ''}"\n`;
        });
        
        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'Labor_Tracking_Template.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showSuccess(this.getTranslation('exportCSVFormat') + ' completed successfully!');
    }

    toggleAutoSync() {
        this.autoSyncEnabled = !this.autoSyncEnabled;
        localStorage.setItem('autoSyncEnabled', this.autoSyncEnabled.toString());
        
        const button = document.querySelector('.auto-sync-btn');
        const text = document.getElementById('autoSyncText');
        
        if (this.autoSyncEnabled) {
            button.classList.add('enabled');
            text.textContent = this.getTranslation('disableAutoSync');
            this.showSuccess('Auto-sync enabled! Records will be automatically exported after each entry.');
        } else {
            button.classList.remove('enabled');
            text.textContent = this.getTranslation('enableAutoSync');
            this.showSuccess('Auto-sync disabled.');
        }
    }

    autoSyncIfEnabled() {
        if (this.autoSyncEnabled) {
            // Auto-export in CSV format
            setTimeout(() => {
                this.exportToCSVFormat();
            }, 1000); // Small delay to ensure UI updates first
        }
    }

    updateAutoSyncButton() {
        const button = document.querySelector('.auto-sync-btn');
        const text = document.getElementById('autoSyncText');
        
        if (button && text) {
            if (this.autoSyncEnabled) {
                button.classList.add('enabled');
                text.textContent = this.getTranslation('disableAutoSync');
            } else {
                button.classList.remove('enabled');
                text.textContent = this.getTranslation('enableAutoSync');
            }
        }
    }

    toggleDataManagement() {
        const nav = document.getElementById('dataManagementNav');
        const overlay = document.getElementById('navOverlay');
        const toggleButton = document.getElementById('dataManagementToggle');
        
        if (nav.classList.contains('hidden')) {
            // Show the nav and overlay
            nav.classList.remove('hidden');
            nav.classList.add('show');
            overlay.classList.add('show');
            toggleButton.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            // Hide the nav and overlay
            nav.classList.add('hidden');
            nav.classList.remove('show');
            overlay.classList.remove('show');
            toggleButton.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    // Google Sheets Sync Methods
    async checkGoogleSheetsStatus() {
        if (!googleSheetsSync || !googleSheetsSync.isConfigured()) {
            this.showError('Google Sheets is not configured. Click "⚙️ Configure" to set up Google Sheets sync.');
            return;
        }

        try {
            const isConnected = await googleSheetsSync.checkConnection();
            if (isConnected) {
                this.showSuccess('✅ Google Sheets connection successful! Spreadsheet is accessible.');
            } else {
                this.showError('❌ Cannot connect to Google Sheets. Please check your configuration.');
            }
        } catch (error) {
            this.showError(`Google Sheets error: ${error.message}`);
        }
    }

    openGoogleSheetsConfig() {
        const message = this.currentLanguage === 'en' 
            ? `Google Sheets Configuration Guide:

1. Open the file: google-sheets-config.js
2. Follow the instructions in the file to:
   - Create a Google Sheet
   - Set up Google Cloud Project
   - Enable Google Sheets API
   - Create API Key
   - Make spreadsheet public (view only)
   - Fill in your credentials

3. Required information:
   - Google Sheets API Key
   - Spreadsheet ID (from URL)

4. Save the file and refresh this page

For detailed instructions, open google-sheets-config.js in a text editor.`
            : `Google Sheets ಕಾನ್ಫಿಗರೇಶನ್ ಮಾರ್ಗದರ್ಶಿ:

1. ಫೈಲ್ ತೆರೆಯಿರಿ: google-sheets-config.js
2. ಫೈಲ್‌ನಲ್ಲಿರುವ ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸಿ:
   - Google Sheet ರಚಿಸಿ
   - Google Cloud Project ಸೆಟಪ್ ಮಾಡಿ
   - Google Sheets API ಸಕ್ರಿಯಗೊಳಿಸಿ
   - API Key ರಚಿಸಿ
   - Spreadsheet ಅನ್ನು ಸಾರ್ವಜನಿಕಗೊಳಿಸಿ
   - ನಿಮ್ಮ ಪರಿಚಯಪತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ

3. ಅಗತ್ಯವಿರುವ ಮಾಹಿತಿ:
   - Google Sheets API Key
   - Spreadsheet ID (URL ನಿಂದ)

4. ಫೈಲ್ ಉಳಿಸಿ ಮತ್ತು ಈ ಪುಟವನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ

ವಿವರವಾದ ಸೂಚನೆಗಳಿಗಾಗಿ, google-sheets-config.js ಅನ್ನು ಪಠ್ಯ ಸಂಪಾದಕದಲ್ಲಿ ತೆರೆಯಿರಿ.`;

        alert(message);
    }

    // Auto-sync to Google Sheets (silent, in background)
    async autoSyncToGoogleSheets() {
        // Only sync if Google Sheets is configured
        if (!googleSheetsSync || !googleSheetsSync.isConfigured()) {
            return; // Silently skip if not configured
        }

        try {
            // Sync records silently in the background
            await googleSheetsSync.syncRecords(this.records);
            
            // Sync work types
            await googleSheetsSync.syncWorkTypes(
                this.taskDetails,
                this.categoryTranslations,
                this.taskTranslations
            );
            
            console.log('Auto-synced to Google Sheets successfully');
        } catch (error) {
            console.error('Auto-sync to Google Sheets failed:', error);
            // Don't show error to user for auto-sync, just log it
        }
    }

    getCategoryTranslation(category) {
        if (this.categoryTranslations[category]) {
            return this.categoryTranslations[category][this.currentLanguage];
        }
        return category;
    }

    getTaskTranslation(task) {
        if (this.taskTranslations[task]) {
            return this.taskTranslations[task][this.currentLanguage];
        }
        return task;
    }

    addCategoryTranslation(category, englishName, kannadaName) {
        this.categoryTranslations[category] = {
            en: englishName || category,
            kn: kannadaName || category
        };
        this.saveCategoryTranslations();
    }

    addTaskTranslation(task, englishName, kannadaName) {
        this.taskTranslations[task] = {
            en: englishName || task,
            kn: kannadaName || task
        };
        this.saveTaskTranslations();
    }

    saveCategoryTranslations() {
        localStorage.setItem('categoryTranslations', JSON.stringify(this.categoryTranslations));
    }

    saveTaskTranslations() {
        localStorage.setItem('taskTranslations', JSON.stringify(this.taskTranslations));
    }

    handleRemarksChange() {
        const dropdown = document.getElementById('remarksDropdown');
        const textInput = document.getElementById('remarks');
        
        if (dropdown.value === 'custom') {
            textInput.classList.remove('hidden');
            textInput.classList.add('visible');
            textInput.focus();
            textInput.value = '';
            textInput.placeholder = this.getTranslation('optionalNotes');
        } else {
            textInput.classList.add('hidden');
            textInput.classList.remove('visible');
            textInput.value = dropdown.value;
        }
    }

    getRemarksValue() {
        const dropdown = document.getElementById('remarksDropdown');
        const textInput = document.getElementById('remarks');
        
        if (dropdown.value === 'custom') {
            return textInput.value;
        } else if (dropdown.value) {
            return dropdown.value;
        } else {
            return textInput.value;
        }
    }

    getRemarksValue() {
        const dropdown = document.getElementById('remarksDropdown');
        const textInput = document.getElementById('remarks');
        
        if (dropdown.value === 'custom') {
            return textInput.value;
        } else if (dropdown.value === '') {
            return '';
        } else {
            return dropdown.value;
        }
    }

    // Format date to ISO format (YYYY-MM-DD) to ensure consistency across devices
    formatDateToISO(date) {
        if (!date) return '';
        
        // If it's already a string in YYYY-MM-DD format, return it
        if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return date;
        }
        
        // Convert to Date object if needed
        const dateObj = date instanceof Date ? date : new Date(date);
        
        // Check if valid date
        if (isNaN(dateObj.getTime())) {
            return '';
        }
        
        // Format as YYYY-MM-DD
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }

    // Format date for display (DD/MM/YYYY)
    formatDateForDisplay(dateString) {
        if (!dateString) return '';
        
        // Parse YYYY-MM-DD format
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${day}/${month}/${year}`;
        }
        
        // Fallback: try to parse as date
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        
        return dateString;
    }

    // Parse date from CSV (handles DD/MM/YYYY, MM/DD/YYYY, and YYYY-MM-DD formats)
    parseDateFromCSV(dateString) {
        if (!dateString) return '';
        
        dateString = dateString.trim();
        
        // If already in YYYY-MM-DD format, return it
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            return dateString;
        }
        
        // Try to parse DD/MM/YYYY or MM/DD/YYYY format
        const slashParts = dateString.split('/');
        if (slashParts.length === 3) {
            let day, month, year;
            
            // Check if year is first (YYYY/MM/DD)
            if (slashParts[0].length === 4) {
                [year, month, day] = slashParts;
            } 
            // Assume DD/MM/YYYY format (common in most countries)
            else {
                [day, month, year] = slashParts;
            }
            
            // Validate and format
            const dayNum = parseInt(day, 10);
            const monthNum = parseInt(month, 10);
            const yearNum = parseInt(year, 10);
            
            if (dayNum >= 1 && dayNum <= 31 && monthNum >= 1 && monthNum <= 12) {
                const fullYear = yearNum < 100 ? 2000 + yearNum : yearNum;
                return `${fullYear}-${String(monthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            }
        }
        
        // Fallback: try native Date parsing
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            return this.formatDateToISO(date);
        }
        
        return dateString;
    }

    updateTaskDetails(category) {
        const taskDetailSelect = document.getElementById('taskDetail');
        taskDetailSelect.innerHTML = `<option value="">${this.getTranslation('selectTask')}</option>`;
        
        if (category && this.taskDetails[category]) {
            this.taskDetails[category].forEach(task => {
                const option = document.createElement('option');
                option.value = task;
                option.textContent = this.getTaskTranslation(task);
                taskDetailSelect.appendChild(option);
            });
        }
    }

    addRecord() {
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.classList.add('loading');
        
        setTimeout(async () => {
            // Get date input and ensure consistent format (YYYY-MM-DD)
            const dateInput = document.getElementById('date');
            const dateValue = dateInput.value || this.formatDateToISO(new Date());
            
            const formData = {
                id: Date.now(),
                date: dateValue,
                laborerName: document.getElementById('laborerName').value,
                taskCategory: document.getElementById('taskCategory').value,
                taskDetail: document.getElementById('taskDetail').value,
                unitType: document.getElementById('unitType').value,
                quantity: parseFloat(document.getElementById('quantity').value),
                rate: parseFloat(document.getElementById('rate').value),
                amountPaid: parseFloat(document.getElementById('amountPaid').value) || 0,
                remarks: this.getRemarksValue()
            };

            // Calculate derived fields
            formData.totalEarned = formData.quantity * formData.rate;
            formData.balanceChange = formData.totalEarned - formData.amountPaid;

            this.records.push(formData);
            this.saveToStorage();
            this.renderRecords();
            this.updateSummary();
            this.updateLaborerFilter();
            this.updateLaborerSummary();
            this.updateLaborerDatalist();
            
            // Reset form with animation
            document.getElementById('entryForm').reset();
            dateInput.value = this.formatDateToISO(new Date());
            document.getElementById('taskDetail').innerHTML = '<option value="">Select Task</option>';
            
            // Reset remarks dropdown and input
            document.getElementById('remarksDropdown').value = '';
            document.getElementById('remarks').classList.add('hidden');
            document.getElementById('remarks').classList.remove('visible');
            document.getElementById('remarks').value = '';
            
            submitButton.classList.remove('loading');
            submitButton.classList.add('success-animation');
            setTimeout(() => submitButton.classList.remove('success-animation'), 600);
            
            this.showSuccess('Work record added successfully!');
            
            // Auto-sync if enabled (CSV)
            this.autoSyncIfEnabled();
            
            // Auto-sync to Google Sheets if configured
            await this.autoSyncToGoogleSheets();
        }, 500);
    }

    async deleteRecord(id) {
        if (confirm('Are you sure you want to delete this record?')) {
            this.records = this.records.filter(record => record.id !== id);
            this.saveToStorage();
            this.renderRecords();
            this.updateSummary();
            this.updateLaborerFilter();
            this.updateLaborerSummary();
            this.updateLaborerDatalist();
            this.showSuccess('Record deleted successfully!');
            
            // Auto-sync to Google Sheets if configured
            await this.autoSyncToGoogleSheets();
        }
    }

    calculateRunningBalance(laborerName, upToIndex) {
        return this.records
            .slice(0, upToIndex + 1)
            .filter(record => record.laborerName === laborerName)
            .reduce((sum, record) => sum + record.balanceChange, 0);
    }

    getPaymentStatus(balance) {
        if (balance > 0) return 'Due';
        if (balance < 0) return 'Advance';
        return 'Paid';
    }

    renderRecords() {
        const tbody = document.getElementById('recordsBody');
        const tableContainer = document.querySelector('.table-container');
        
        // Save current scroll position
        const scrollTop = tableContainer ? tableContainer.scrollTop : 0;
        const scrollLeft = tableContainer ? tableContainer.scrollLeft : 0;
        
        tbody.innerHTML = '';

        this.records.forEach((record, index) => {
            const runningBalance = this.calculateRunningBalance(record.laborerName, index);
            const status = this.getPaymentStatus(runningBalance);
            
            const row = document.createElement('tr');
            row.className = 'table-row-enter';
            const delayClass = `anim-delay-${Math.min(index + 1, 10)}`;
            row.classList.add(delayClass);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = this.getTranslation('delete');
            deleteBtn.onclick = async () => await this.deleteRecord(record.id);
            
            row.innerHTML = `
                <td>${this.formatDateForDisplay(record.date)}</td>
                <td>${record.laborerName}</td>
                <td>${this.getCategoryTranslation(record.taskCategory)}</td>
                <td>${this.getTaskTranslation(record.taskDetail)}</td>
                <td>${record.unitType}</td>
                <td>${record.quantity}</td>
                <td>₹${record.rate}</td>
                <td>₹${record.totalEarned}</td>
                <td>₹${record.amountPaid}</td>
                <td class="${runningBalance >= 0 ? 'positive' : 'negative'}">₹${Math.abs(runningBalance)}</td>
                <td><span class="status-${status.toLowerCase()}">${this.getTranslation(status.toLowerCase() === 'paid' ? 'paidStatus' : status.toLowerCase())}</span></td>
                <td>${record.remarks}</td>
                <td></td>
            `;
            
            // Add delete button to the last cell
            row.cells[row.cells.length - 1].appendChild(deleteBtn);
            tbody.appendChild(row);
        });
        
        // Restore scroll position after rendering
        if (tableContainer) {
            // Use requestAnimationFrame to ensure DOM is updated
            requestAnimationFrame(() => {
                tableContainer.scrollTop = scrollTop;
                tableContainer.scrollLeft = scrollLeft;
            });
        }
    }

    filterRecords(laborerName) {
        const rows = document.querySelectorAll('#recordsBody tr');
        rows.forEach(row => {
            if (!laborerName || row.cells[1].textContent === laborerName) {
                row.classList.remove('table-row-hidden');
                row.classList.add('table-row-visible');
            } else {
                row.classList.add('table-row-hidden');
                row.classList.remove('table-row-visible');
            }
        });
    }

    updateSummary() {
        const laborerBalances = this.getLaborerBalances();
        
        let totalOutstanding = 0;
        let totalAdvances = 0;
        
        Object.values(laborerBalances).forEach(balance => {
            if (balance > 0) totalOutstanding += balance;
            if (balance < 0) totalAdvances += Math.abs(balance);
        });
        
        document.getElementById('totalOutstanding').textContent = `₹${totalOutstanding}`;
        document.getElementById('totalAdvances').textContent = `₹${totalAdvances}`;
    }

    updateLaborerFilter() {
        const select = document.getElementById('laborerFilter');
        const currentValue = select.value;
        
        // Get unique laborer names
        const laborers = [...new Set(this.records.map(record => record.laborerName))].sort();
        
        select.innerHTML = '<option value="">All Laborers</option>';
        laborers.forEach(laborer => {
            const option = document.createElement('option');
            option.value = laborer;
            option.textContent = laborer;
            if (laborer === currentValue) option.selected = true;
            select.appendChild(option);
        });
    }

    updateLaborerDatalist() {
        const datalist = document.getElementById('laborerList');
        
        // Get unique laborer names from records
        const laborers = [...new Set(this.records.map(record => record.laborerName))].sort();
        
        // Clear existing options
        datalist.innerHTML = '';
        
        // Add all unique laborer names to the datalist
        laborers.forEach(laborer => {
            const option = document.createElement('option');
            option.value = laborer;
            datalist.appendChild(option);
        });
    }

    getLaborerBalances() {
        const balances = {};
        
        this.records.forEach(record => {
            if (!balances[record.laborerName]) {
                balances[record.laborerName] = 0;
            }
            balances[record.laborerName] += record.balanceChange;
        });
        
        return balances;
    }

    updateLaborerSummary() {
        const summaryContainer = document.getElementById('summaryCards');
        const balances = this.getLaborerBalances();
        
        summaryContainer.innerHTML = '';
        
        Object.entries(balances).forEach(([laborer, balance], index) => {
            const totalEarned = this.records
                .filter(record => record.laborerName === laborer)
                .reduce((sum, record) => sum + record.totalEarned, 0);
            
            const totalPaid = this.records
                .filter(record => record.laborerName === laborer)
                .reduce((sum, record) => sum + record.amountPaid, 0);
            
            const card = document.createElement('div');
            card.className = 'laborer-card';
            const delayClass = `anim-delay-${Math.min((index + 1) * 2, 10)}`;
            card.classList.add(delayClass);
            card.innerHTML = `
                <h3>${laborer}</h3>
                <div class="laborer-stats">
                    <div class="stat-item">
                        <div class="label">${this.getTranslation('totalEarned')}</div>
                        <div class="value">₹${totalEarned}</div>
                    </div>
                    <div class="stat-item">
                        <div class="label">${this.getTranslation('totalPaid')}</div>
                        <div class="value">₹${totalPaid}</div>
                    </div>
                    <div class="stat-item">
                        <div class="label">${this.getTranslation('balance')}</div>
                        <div class="value ${balance >= 0 ? 'positive' : 'negative'}">
                            ₹${Math.abs(balance)} ${balance > 0 ? `(${this.getTranslation('due')})` : balance < 0 ? `(${this.getTranslation('advance')})` : ''}
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="label">${this.getTranslation('status')}</div>
                        <div class="value">
                            <span class="status-${this.getPaymentStatus(balance).toLowerCase()}">
                                ${this.getTranslation(this.getPaymentStatus(balance).toLowerCase() === 'paid' ? 'paidStatus' : this.getPaymentStatus(balance).toLowerCase())}
                            </span>
                        </div>
                    </div>
                </div>
            `;
            summaryContainer.appendChild(card);
        });
    }
loadSampleData() {
        if (this.records.length === 0) {
            const sampleData = [
                {
                    id: 1,
                    date: '2024-01-15',
                    laborerName: 'Ravi Kumar',
                    taskCategory: 'Arecanut',
                    taskDetail: 'Tree Cutting',
                    unitType: 'Day',
                    quantity: 1,
                    rate: 500,
                    totalEarned: 500,
                    amountPaid: 300,
                    balanceChange: 200,
                    remarks: 'Partial payment'
                },
                {
                    id: 2,
                    date: '2024-01-16',
                    laborerName: 'Ravi Kumar',
                    taskCategory: 'Arecanut',
                    taskDetail: 'Husking',
                    unitType: 'Kg',
                    quantity: 25,
                    rate: 15,
                    totalEarned: 375,
                    amountPaid: 0,
                    balanceChange: 375,
                    remarks: 'No payment today'
                },
                {
                    id: 3,
                    date: '2024-01-17',
                    laborerName: 'Sita Devi',
                    taskCategory: 'Rice',
                    taskDetail: 'Planting',
                    unitType: 'Day',
                    quantity: 1,
                    rate: 400,
                    totalEarned: 400,
                    amountPaid: 400,
                    balanceChange: 0,
                    remarks: 'Full payment'
                }
            ];
            
            this.records = sampleData;
            this.saveToStorage();
        }
    }

    saveToStorage() {
        localStorage.setItem('laborRecords', JSON.stringify(this.records));
    }

    exportData() {
        const dataStr = JSON.stringify(this.records, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'labor_records.json';
        link.click();
    }

    importData(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    this.records = importedData;
                    this.saveToStorage();
                    this.renderRecords();
                    this.updateSummary();
                    this.updateLaborerFilter();
                    this.updateLaborerSummary();
                    alert('Data imported successfully!');
                } catch (error) {
                    alert('Error importing data. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    }
}

// Initialize the system

const laborSystem = new LaborTrackingSystem();








