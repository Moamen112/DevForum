import Link from "next/link";

import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    description: "I want to learn react, can anyone help me?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "What is Next.js?",
    description: "I want to learn Next.js, can anyone help me?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "Next" },
    ],
    author: { _id: "1", name: "Moe Doe" },
    upvotes: 4,
    answers: 1,
    views: 233,
    createdAt: new Date(),
  },
  {
    _id: "3",
    title: "How to learn TypeScript?",
    description: "I want to learn TypeScript, can anyone help me?",
    tags: [
      { _id: "1", name: "JavaScript" },
      { _id: "2", name: "TypeScript" },
    ],
    author: { _id: "1", name: "ssSa Doe" },
    upvotes: 10,
    answers: 8,
    views: 120,
    createdAt: new Date(),
  },
  {
    _id: "4",
    title: "What is Tailwind CSS?",
    description: "I want to learn Tailwind CSS, can anyone help me?",
    tags: [
      { _id: "1", name: "Css" },
      { _id: "2", name: "Tailwind" },
    ],
    author: { _id: "1", name: "Moamen Doe" },
    upvotes: 120,
    answers: 54,
    views: 1003,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query?.toLowerCase());
    const matchesFilter =
      !filter ||
      question.tags.some(
        (tag) => tag.name.toLowerCase() === filter.toLowerCase()
      );
    return matchesQuery && matchesFilter;
  });
  return (
    <>
      <section className="flex w-full flex-col-reverse sm:flex-row justify-between sm:items-center gap-4 ">
        <h1 className="h1-bold text-dar100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};

export default Home;
