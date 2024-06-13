import { prisma } from '../utils/prisma.util.js';

export class UsersRepository {
  findByUser = async (userId) => {
    // ORM인 Prisma에서 Posts 모델의 findMany 메서드를 사용해 데이터를 요청합니다.
    const user = await prisma.user.findUnique({
      where: { id: userId },
      omit: { password: true },
    });
    return user;
  };
  findUniqueUsers = async (authorId, data) => {
    return await prisma.user.get(authorId, data);
  };
}
