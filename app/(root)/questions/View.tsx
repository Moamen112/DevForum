"use client";

import { useCallback, useEffect } from "react";
import { toast } from "sonner";

import { incrementViews } from "@/lib/actions/question.action";

const View = ({ questionId }: { questionId: string }) => {
  const handleIncrement = useCallback(async () => {
    const result = await incrementViews({ questionId });

    if (result.success) {
      toast.success("View count incremented");
    } else {
      toast.error(result.error?.message || "Failed to increment view count");
    }
  }, [questionId]);

  useEffect(() => {
    handleIncrement();
  }, [handleIncrement]);
  return null;
};

export default View;
