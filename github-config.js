// GitHub Configuration
// Follow these steps to set up GitHub as your database:
// 
// 1. Create a GitHub Account (if you don't have one):
//    - Go to https://github.com
//    - Click "Sign up" and create your account
//
// 2. Create a Personal Access Token:
//    - Go to https://github.com/settings/tokens
//    - Click "Generate new token" → "Generate new token (classic)"
//    - Give it a name like "Labor Tracking System"
//    - Select scopes: Check "repo" (Full control of private repositories)
//    - Click "Generate token"
//    - COPY THE TOKEN - you won't see it again!
//
// 3. Create a Repository for your data:
//    - Go to https://github.com/new
//    - Repository name: "labor-tracking-data" (or any name you prefer)
//    - Make it Private (recommended for sensitive data)
//    - Click "Create repository"
//
// 4. Fill in the configuration below:

const GITHUB_CONFIG = {
    // Your GitHub username (e.g., "john-doe")
    username: 'abhishekbh063-prog',
    
    // Your repository name (e.g., "labor-tracking-data")
    repo: 'labor-tracking-data',
    
    // Your Personal Access Token (paste the token you copied)
    token: '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',
    
    // Branch name (usually "main" or "master")
    branch: 'main',
    
    // File paths in the repository
    files: {
        records: 'data/labor_records.json',
        workTypes: 'data/work_types.json',
        translations: 'data/translations.json'
    }
};

// SECURITY NOTE:
// For production use, consider using GitHub OAuth or a backend server
// to keep your token secure. Never commit this file with real credentials
// to a public repository!

// Example configuration (replace with your actual values):
// const GITHUB_CONFIG = {
//     username: 'john-doe',
//     repo: 'labor-tracking-data',
//     token: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
//     branch: 'main',
//     files: {
//         records: 'data/labor_records.json',
//         workTypes: 'data/work_types.json',
//         translations: 'data/translations.json'
//     }
// };
