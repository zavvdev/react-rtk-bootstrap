import * as yup from "yup";

export const postSchema = yup.object({
  id: yup.number().required(),
  title: yup.string().required(),
  body: yup.string().required(),
  userId: yup.number().required(),
});

export type Post = yup.InferType<typeof postSchema>;
