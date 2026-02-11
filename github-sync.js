// GitHub Sync Service
class GitHubSync {
    constructor(config) {
        this.config = config;
        this.baseUrl = `https://api.github.com/repos/${config.username}/${config.repo}`;
        this.headers = {
            'Authorization': `token ${config.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        };
    }

    // Check if GitHub is configured
    isConfigured() {
        return this.config.username !== 'YOUR_GITHUB_USERNAME' &&
               this.config.repo !== 'YOUR_REPOSITORY_NAME' &&
               this.config.token !== 'YOUR_GITHUB_TOKEN' &&
               this.config.token.length > 0;
    }

    // Get file content from GitHub
    async getFile(filePath) {
        try {
            const url = `${this.baseUrl}/contents/${filePath}?ref=${this.config.branch}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            });

            if (response.status === 404) {
                // File doesn't exist yet
                return null;
            }

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const data = await response.json();
            const content = atob(data.content); // Decode base64
            return {
                content: JSON.parse(content),
                sha: data.sha // Needed for updates
            };
        } catch (error) {
            console.error('Error getting file from GitHub:', error);
            throw error;
        }
    }

    // Save file to GitHub
    async saveFile(filePath, content, message = 'Update data') {
        try {
            // First, try to get the current file to get its SHA
            let sha = null;
            try {
                const existing = await this.getFile(filePath);
                if (existing) {
                    sha = existing.sha;
                }
            } catch (error) {
                // File doesn't exist, that's okay
            }

            const url = `${this.baseUrl}/contents/${filePath}`;
            const encodedContent = btoa(JSON.stringify(content, null, 2)); // Encode to base64

            const body = {
                message: message,
                content: encodedContent,
                branch: this.config.branch
            };

            if (sha) {
                body.sha = sha; // Include SHA for updates
            }

            const response = await fetch(url, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error saving file to GitHub:', error);
            throw error;
        }
    }

    // Sync records to GitHub
    async syncRecords(records) {
        if (!this.isConfigured()) {
            throw new Error('GitHub is not configured. Please update github-config.js');
        }

        return await this.saveFile(
            this.config.files.records,
            records,
            `Update labor records - ${new Date().toISOString()}`
        );
    }

    // Sync work types to GitHub
    async syncWorkTypes(taskDetails, categoryTranslations, taskTranslations) {
        if (!this.isConfigured()) {
            throw new Error('GitHub is not configured. Please update github-config.js');
        }

        const data = {
            taskDetails,
            categoryTranslations,
            taskTranslations
        };

        return await this.saveFile(
            this.config.files.workTypes,
            data,
            `Update work types - ${new Date().toISOString()}`
        );
    }

    // Load records from GitHub
    async loadRecords() {
        if (!this.isConfigured()) {
            throw new Error('GitHub is not configured. Please update github-config.js');
        }

        const result = await this.getFile(this.config.files.records);
        return result ? result.content : [];
    }

    // Load work types from GitHub
    async loadWorkTypes() {
        if (!this.isConfigured()) {
            throw new Error('GitHub is not configured. Please update github-config.js');
        }

        const result = await this.getFile(this.config.files.workTypes);
        return result ? result.content : null;
    }

    // Check repository status
    async checkConnection() {
        try {
            const response = await fetch(this.baseUrl, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`Cannot access repository: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('GitHub connection error:', error);
            return false;
        }
    }
}

// Initialize GitHub sync (will be used by the main app)
let githubSync = null;
if (typeof GITHUB_CONFIG !== 'undefined') {
    githubSync = new GitHubSync(GITHUB_CONFIG);
}
