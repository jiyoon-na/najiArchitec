import { prisma } from "../utils/prisma.util.js";
export class ResumesRepository {
    findAllResumes = async () => {
        const resumes = await prisma.resumes.findMany();
        return resumes
    }
    createResume = async (title, content) => {
        const createdResume = await prisma.resumes.create({
            data: {
                title, content
            }
        });
        return createdResume;
    }
    


}