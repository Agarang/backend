import { LocalToken } from './local-token.dto';

export interface IJwtLocalDto extends LocalToken {
  /**
   * @type int
   */
  iat: number;

  /**
   * @type int
   */
  exp: number;
}
