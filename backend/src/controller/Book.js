import { respone } from "../utils/response.js";
import { prisma } from "../config/db.js";

export const bookCreate = async (req, res) => {
  try {
    const { title, author, synopsis, imageUrl } = req.body;
    const result = await prisma.book.create({
      data: {
        title,
        author,
        synopsis,
        coverImage: imageUrl,
        publishedAt: new Date(),
      },
    });
    respone(200, result, res);
  } catch (error) {
    respone(500, "An error occurred.", res);
  }
};

export const bookAll = async (req, res) => {
  try {
    const result = await prisma.book.findMany({
      include: {
        chapters: true,
      },
    });
    respone(200, result, res);
  } catch (err) {
    respone(500, "error occurred", res);
  }
};

export const bookSearch = async (req, res) => {
  try {
    const { query } = req.query;

    let books;
    if (!query) {
      books = await prisma.book.findMany();
    } else {
      books = await prisma.book.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              author: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      });
    }

    return res.status(200).json(books);
  } catch (err) {
    console.error(err);
    r;
    return res.status(500).json({ message: "An error occurred" });
  }
};

export const bookById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.book.findUnique({
      where: {
        id: id,
      },
      include: {
        chapters: true,
        genre: true,
      },
    });
    respone(200, result, res);
  } catch (err) {
    respone(500, "error occurred", res);
  }
};

export const chapterId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.chapter.findUnique({
      where: {
        id: id,
      },
      include: {
        book: true,
      },
    });
    respone(200, result, res);
  } catch (err) {
    respone(500, "error occurred", res);
  }
};
export const chapterAll = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.chapter.findMany({
      where: { bookId: id },
      include: {
        book: true,
      },
    });
    respone(200, result, res);
  } catch (err) {
    respone(500, "error occurred", res);
  }
};

export const chapterCreate = async (req, res) => {
  try {
    const { title, content, bookId } = req.body;

    if (!title || !content || !bookId) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const result = await prisma.chapter.create({
      data: {
        title,
        content,
        bookId,
      },
    });
    respone(200, result, res);
  } catch (err) {
    respone(500, "error occurred", res);
  }
};

export const chapterDelete = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return respone(400, "Chapter ID is required", res);
  }
  try {
    const result = await prisma.chapter.delete({
      where: { id },
    });
    respone(200, result, res);
  } catch (err) {
    console.error(err);
    respone(500, "Error occurred", res);
  }
};

export const bookMark = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await prisma.bookMark.findMany({
      where: { userId: id },
      include: {
        book: true,
        user: true,
      },
    });
    respone(200, result, res);
  } catch (err) {
    respone(500, err, res);
  }
};
export const isMark = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const result = await prisma.bookMark.findFirst({
      where: { userId: parseInt(userId, 10), bookId: bookId },
      include: {
        book: true,
        user: true,
      },
    });
    respone(200, result, res);
  } catch (err) {
    respone(500, err, res);
  }
};

export const bookMarkCreate = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const result = await prisma.bookMark.create({
      data: {
        userId,
        bookId,
      },
    });
    respone(200, result, res);
  } catch (err) {
    respone(500, err, res);
  }
};

export const deleteMark = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    console.log(userId, bookId);
    const result = await prisma.bookMark.deleteMany({
      where: {
        userId: parseInt(userId, 10),
        bookId: bookId,
      },
    });

    respone(200, result, res);
  } catch (err) {
    respone(500, err, res);
  }
};

export const genre = async (req, res) => {
  try {
    const genres = await prisma.genre.findMany({
      include: {
        books: true,
      },
    });

    if (!genres) {
      throw new Error("Chapter not found");
    }

    respone(200, genres, res);
  } catch (err) {
    respone(500, "internal server eror", res);
  }
};

export const addgenre = async (req, res) => {
  try {
    const { bookId, genreIds } = req.body;
    const result = await prisma.book.update({
      where: { id: bookId },
      data: {
        genre: {
          connect: genreIds.map((id) => ({ id })),
        },
      },
      include: { genre: true },
    });
    respone(200, result, res);
  } catch (err) {
    respone(500, "Internal server error", res);
  }
};

export const createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await prisma.genre.create({
      data: {
        name,
      },
    });
    respone(200, result, res);
  } catch (err) {
    respone(500, "internal server eror", res);
  }
};

export const unConectGenre = async (req, res) => {
  try {
    const { bookId, genreId } = req.body;
    console.log(bookId, genreId)
    const result = await prisma.book.update({
      where: { id: bookId },
      data: {
        genre: {
          disconnect: { id: parseInt (genreId,10)}
        }
      }
    });
    
    respone(200, result, res)
  } catch (err) {
    respone(500, "internal server error", res);
  }
};
