export const SQL_TYPE = 'mysql';
export const SQL_HOST = process.env.SQLHOST || 'mysql';
export const SQL_PORT = Number(process.env.SQLPORT) || 3306;
export const SQL_USER = process.env.SQLUSER || 'nikita';
export const SQL_PASSWORD = process.env.SQLPASSWORD || '1234';
export const SQL_DATABASE = process.env.SQLDATABASE || 'clientDB';
