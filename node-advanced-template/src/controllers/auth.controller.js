//2서비스 연결 : import & export
import { AuthService } from '../services/auth.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  // HASH_SALT_ROUNDS,
} from '../constants/auth.constant.js';
// import { HttpError } from '../errors/http.error.js';

export class AuthController {
  authService = new AuthService();
  //여기서 알아서 걸러주므로 req, res, next 는 컨트롤러에서만 :)
  createAuth =
    //인증 미들웨어 위치?,
    async (req, res, next) => {
      try {
        const { email, password, name } = req.body;

        const data = await this.authService.createAuth(
          email,
          password,

          name,
        );
        console.log('data-->', data);

        return res.status(HTTP_STATUS.CREATED).json({
          status: HTTP_STATUS.CREATED,
          message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
          data,
        });
      } catch (
        error
        // HttpError: class.NotFound
      ) {
        next(error);
      }
    };

  signInAuth = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await this.authService.signInAuth(email, password);

      //유저가져오기
      const payload = { id: user.id };

      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      });
      //
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data: { accessToken, user },
      });
    } catch (error) {
      next(error);
    }
  };
}
