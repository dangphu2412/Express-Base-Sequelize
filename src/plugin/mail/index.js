import { logger } from '../../utils';
import { mailerConfig, defaultMailOptions } from '../../config/mailer';

class Mailer {
    constructor() {
      this.logger = logger;
      this.transporter = mailerConfig;
      this.defaultMailOptions = defaultMailOptions;
    }

    sendMail(mailOptions) {
      const options = { ...this.defaultMailOptions, ...mailOptions };
      return this.transporter.sendMail(options,
        (err, info) => {
          this.logger.info(info);
          if (err) throw err;
        });
    }
}

export const MailPlugin = new Mailer();
