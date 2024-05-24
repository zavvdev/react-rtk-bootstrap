import { Post, postSchema } from "~/entities/Post";
import { api } from "~/application/store";
import { API_TAGS } from "~/application/managers/api/config";
import { notificationService } from "~/application/services/NotificationService";

export const apiPosts = api.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => "/posts",

      providesTags: () => [API_TAGS.posts],

      transformErrorResponse: (response) => {
        notificationService.error("Error");
        return response;
      },

      transformResponse: (response: Post[]) => {
        try {
          return response.map((post) => {
            return postSchema.validateSync(post, { strict: true });
          });
        } catch (error) {
          notificationService.error("Validation error");
          throw error;
        }
      },
    }),
  }),
});

export const { useGetPostsQuery } = apiPosts;
