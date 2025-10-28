import { email, z } from "zod";

export const SignInSchema = z.object({
  email: z
    .email()
    .min(1, { message: "Email is required" })
    .meta({ description: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password cannot exceed 100 characters" }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 charachters long." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),

  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),

  email: z
    .email()
    .min(1, { message: "Email is required" })
    .meta({ description: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password cannot exceed 100 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least on uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least on lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least on number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least on special character.",
    }),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." }),

  content: z
    .string()
    .min(1, { message: "Body must be at least 1 character long." }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Tag is required." })
        .max(30, { message: "Tag cannot exceed 30 characters." })
    )
    .min(1, { message: "Please select at least one tag." })
    .max(3, { message: "You can select up to 3 tags." }),
});

export const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 charachters long." }),
  email: z.email({ message: "Email is required" }),
  bio: z.string().optional(),
  image: z.url({ message: "Image must be a valid URL." }).optional(),
  reputation: z.number().optional(),
});

export const AccountSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
  name: z.string().min(1, { message: "Name is required." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password cannot exceed 100 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least on uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least on lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least on number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least on special character.",
    })
    .optional(),
  provider: z.string().min(1, { message: "Provider is required." }),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required." }),
  image: z.url({ message: "Image must be a valid URL." }).optional(),
});

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(["google", "github"], {
    message: "Provider must be either 'google' or 'github'.",
  }),
  providerAccountId: z
    .string()
    .min(3, { message: "Provider Account ID is required." }),
  user: z.object({
    name: z.string().min(1, { message: "Name is required." }),
    username: z
      .string()
      .min(3, { message: "Username must be atleast 3 characters long." }),
    email: z.email({ message: "Email is required" }),
    image: z.url({ message: "Image must be a valid URL." }).optional(),
  }),
});
