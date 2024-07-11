export class ConfigurationException extends Error {
  constructor(key: string, value: unknown) {
    super(`${key} not found or it is not valid. Value: ${value}`);
  }
}
