import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newApiHeaders = {
  "x-rapidapi-key": "9d8d5d05c9msh16582c521abaa4fp150e42jsnd49d96245d43",
  "x-rapidapi-host": "live-fitness-and-health-news.p.rapidapi.com",
};

const createRequest = (url) => ({ url, headers: newApiHeaders });

export const newApi = createApi({
  reducerPath: 'newApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://live-fitness-and-health-news.p.rapidapi.com/news" }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => createRequest(`/`),
    }),
    
  }),
});

export const { useGetNewsQuery } = newApi;
