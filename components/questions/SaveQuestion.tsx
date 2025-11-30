"use client";

import { toggleSaveQuestion } from "@/lib/actions/collection.action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const SaveQuestion = ({ questionId }: { questionId: string }) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (isLoading) return;
    if (!userId) {
      return toast.error("You must be signed in to save questions.");
    }
    setIsLoading(true);

    try {
      const { success, data, error } = await toggleSaveQuestion({ questionId });
      if (!success)
        throw new Error(error?.message || "Failed to save the question.");

      toast.success(
        data?.saved
          ? "Question saved to your collection."
          : "Question removed from your collection."
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while saving the question."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const hasSaved = false;

  return (
    <Image
      src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
      width={18}
      height={18}
      alt="save"
      className={`cursor-pointer ${isLoading && "opacity-50"}`}
      aria-label="Save question"
      onClick={handleSave}
    />
  );
};

export default SaveQuestion;
