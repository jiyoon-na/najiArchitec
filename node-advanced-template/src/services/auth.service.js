//3 repository 연결
import { prisma } from '../utils/prisma.util.js';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';
// import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import bcrypt from 'bcrypt';
import { HttpError } from '../errors/http.error.js';

export class AuthService {
  createAuth = async (email, password, name) => {
    const existedUser = await prisma.user.findUnique(
      { where: { email } },
      name,
    );

    // 이메일이 중복된 경우
    //여기는 req, res 없으므로 대체할 것 찾아볼것 throw
    if (existedUser) {
      throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
      // return res.status(HTTP_STATUS.CONFLICT).json({
      //   status: HTTP_STATUS.CONFLICT,
      //   message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
      // });
    }
    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    const data = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    data.password = undefined;
    return data;
  };

  //로그인
  //email, password 정보 외부에서 받아오기
  signInAuth = async (email, password) => {
    //이메일로 찾은 사용자 정보와 패스워드가 일치하는지
    const user = await prisma.user.findUnique({ where: { email } });

    const isPasswordMatched =
      user && bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.UNAUTHORIZED);
    }
    // return res.status(HTTP_STATUS.UNAUTHORIZED).json({
    //   status: HTTP_STATUS.UNAUTHORIZED,
    //   message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
    // });
    return user;
  };
}
