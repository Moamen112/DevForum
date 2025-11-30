"use server";

import { CollectionBaseParams } from "@/types/action";
import { ActionResponse, ErrorResponse } from "@/types/global";
import action from "../handlers/actions";
import { CollectionBaseSchema } from "../validations";
import handleError from "../handlers/error";
import { Collection, Question } from "@/database";
import ROUTES from "@/constants/routes";
import { revalidatePath } from "next/cache";

export async function toggleSaveQuestion(
  params: CollectionBaseParams
): Promise<ActionResponse<{ saved: boolean }>> {
  const validationResult = await action({
    params,
    schema: CollectionBaseSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    const collection = await Collection.findOne({
      question: questionId,
      author: userId,
    });

    if (collection) {
      await Collection.findByIdAndDelete(collection.id);
      return { success: true, data: { saved: false } };
    } else {
      await Collection.create({ question: questionId, author: userId });
      revalidatePath(ROUTES.QUESTION(questionId));
      return { success: true, data: { saved: true } };
    }
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
