export const getIpFromHeader = request => (
    request.headers['x-forwarded-for']
    || request.connection.remoteAddress
    || ''
    ).split(',')[0].trim();
