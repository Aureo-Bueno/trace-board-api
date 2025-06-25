import dotenv from 'dotenv';

dotenv.config();

class ConfigEnv {
  private static instance: ConfigEnv;
  private env: Record<string, string>;

  private constructor() {
    this.env = Object.keys(process.env).reduce((acc, key) => {
      const value = process.env[key];
      if (typeof value === 'string') {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);
  }

  public static getInstance(): ConfigEnv {
    if (!ConfigEnv.instance) {
      ConfigEnv.instance = new ConfigEnv();
    }
    return ConfigEnv.instance;
  }

  public get(key: string): string | undefined {
    return this.env[key];
  }
}

export default ConfigEnv.getInstance();