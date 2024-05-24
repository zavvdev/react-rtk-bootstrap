import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import {
  configureStore,
  ConfigureStoreOptions,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import {
  counter,
  increment,
  incrementEffect,
} from "~/application/features/counter/counter";
import { auth } from "~/application/features/auth";
import { API_TAGS } from "~/application/managers/api/config";

// ===========================
//
//  Listener middleware
//
// ===========================

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: increment,
  effect: incrementEffect,
});

// ===========================
//
//  Api
//
// ===========================

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_API_ENDPOINT,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authentication", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: "api",
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQueryWithRetry,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: Object.values(API_TAGS),
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
});

// ===========================
//
//  Store
//
// ===========================

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined,
) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [counter.name]: counter.reducer,
      [auth.name]: auth.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(api.middleware),
    ...options,
  });

export const store = createStore();

// ===========================

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;