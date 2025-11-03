interface EnvConfig {
    baseURL: string;
    apiURL: string;
    frtBaseURL: string; // Nueva propiedad para la URL de Free Range Testers
}

export class Environment {
    private static configs: Record<string, EnvConfig> = {
        DEV: {
            baseURL: "https://dev.example.com",
            apiURL: "https://api.dev.example.com",
            frtBaseURL: "https://www.freerangetesters.dev.com"

        },
        TEST: {
            baseURL: "https://test.example.com",
            apiURL: "https://api.test.example.com",
            frtBaseURL: "https://www.freerangetesters.test.com"

        },
        PROD: {
            baseURL: "https://prod.example.com",
            apiURL: "https://api.prod.example.com",
            frtBaseURL: "https://www.freerangetesters.com"
        },
        DEFAULT: {
            baseURL: "https://thefreerangetester.github.io/sandbox-automation-testing/",
            apiURL: "https://api.github.com",
            frtBaseURL: "https://www.freerangetesters.com", // URL para Free Range Testers
        },
    };

    static getConfig(): EnvConfig {
        const env = process.env.ENVIRONMENT || "DEFAULT";
        return Environment.configs[env] || Environment.configs.DEFAULT;
    }
}