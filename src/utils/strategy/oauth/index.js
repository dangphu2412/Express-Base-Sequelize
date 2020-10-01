import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CRED } from '../../../common/constants';
import { logger } from '../../logger';
import { UnAuthorized } from '../../errors';

class Strategy {
    constructor() {
        this.service = new OAuth2Client(GOOGLE_CRED.GG_CLIENT_ID);
        this.clientId = GOOGLE_CRED.GG_CLIENT_ID;
        this.logger = logger;
        this.logger.info('Initialize logger');
    }

    async verify(OAuthToken) {
        if (!OAuthToken) {
            throw new UnAuthorized();
        }

        const ticket = await this.service.verifyIdToken({
            idToken: OAuthToken,
            audience: this.clientId,
        });
        const googlePayload = ticket.getPayload();
        const credentials = {
            username: googlePayload.email,
            displayName: googlePayload.name,
            avatar: googlePayload.picture,
        };
        return credentials;
    }
}

export const OauthStrategy = new Strategy();
