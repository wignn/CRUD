"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ChapterSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(3),
  bookId: z.string().cuid(),
});

export const saveChapter = async (prevState: any, formData: FormData) => {
  console.log("Received formData:", Object.fromEntries(formData.entries()));

  const validatedFields = ChapterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    console.log("Validation errors:", validatedFields.error.flatten().fieldErrors);
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    console.log("Validated data:", validatedFields.data);


    await prisma.chapter.create({
      data: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
        bookId: validatedFields.data.bookId,
      },
    });

    await prisma.book.update({
      where: { id: validatedFields.data.bookId },
      data: { updatedAt: new Date() },
    });

    console.log("Chapter created and book updated successfully.");
  } catch (error) {
    console.error("Failed to create chapter or update book:", error);
    return { message: "Failed to create chapter or update book" };
  }

  revalidatePath("/DataBook");
  redirect("/DataBook");
};
