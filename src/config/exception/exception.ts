export abstract class GenericException extends Error {}

export abstract class ServiceException extends GenericException {}

export abstract class DatabaseException extends GenericException {}
