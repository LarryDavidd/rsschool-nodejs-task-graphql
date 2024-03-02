import { Id, DataRecord, Prisma, IPostInput } from '../types/common.js';

const getPost = async ({ id }: Id, { prisma }: Prisma) => {
  const post = await prisma.post.findUnique({ where: { id } });
  return post;
};

const getPosts = async (_: DataRecord, { prisma }: Prisma) => {
  const posts = await prisma.post.findMany();
  return posts;
};

const createPost = async ({ dto: data }: { dto: IPostInput }, { prisma }: Prisma) => {
  const post = await prisma.post.create({ data });
  return post;
};

const changePost = async (
  { id, dto: data }: Id & { dto: Partial<IPostInput> },
  { prisma }: Prisma,
) => {
  try {
    const post = await prisma.post.update({
      where: { id },
      data,
    });
    return post;
  } catch {
    return null;
  }
};

const deletePost = async ({ id }: Id, { prisma }: Prisma) => {
  try {
    await prisma.post.delete({ where: { id } });
    return id;
  } catch {
    return null;
  }
};

export default {
  post: getPost,
  posts: getPosts,
  createPost,
  changePost,
  deletePost,
};
