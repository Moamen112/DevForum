import ROUTES from "./routes";

export const DEFAULT_EMPTY = {
  title: "No Data Found",
  message:
    "Looks like the database is taking a nap. Wake it up with some new entries.",
  button: {
    text: "Add Data",
    href: ROUTES.HOME,
  },
};

export const DEFAULT_ERROR = {
  title: "Oops! Something Went Wrong",
  message: "Even our code can have a bad day. Give it another shot!",
  button: {
    text: "Try Again",
    href: ROUTES.HOME,
  },
};

export const EMPTY_QUESTION = {
  title: "No Questions Yet",
  message: "The question board is empty, maybe it's time to ask the first one?",
  button: {
    text: "Ask a Question",
    href: ROUTES.ASK_QUESTION,
  },
};

export const EMPTY_TAG = {
  title: "No Tags Available",
  message: "There are currently no tags. Be the first to create one!",
  button: {
    text: "Create Tag",
    href: ROUTES.TAGS,
  },
};
export const EMPTY_ANSWERS = {
  title: "No Answers Found",
  message:
    "The answer board is empty. Make it rain with your brilliant answers!",
};

export const EMPTY_COLLECTION = {
  title: "No Collections Found",
  message:
    "You haven't created any collections yet. Start building your collections now!",
  button: {
    text: "Create Collection",
    href: ROUTES.COLLECTION,
  },
};
