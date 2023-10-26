import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../constants";
import Cookies from "js-cookie";

export const educationServer = createApi({
  reducerPath: "education",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEducations: builder.query({
      query: (page) => `education?page=${page}`,
      transformResponse: (res) => res,
    }),
    getEducation: builder.mutation({
      query: (id) => ({
        url: `education/${id}`,
        method: "GET",
      }),
    }),
    addEducation: builder.mutation({
      query: (body) => ({
        url: "education",
        method: "POST",
        body,
      }),
    }),
    updateEducation: builder.mutation({
      query: ({ id, body }) => ({
        url: `education/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `education/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetEducationsQuery,
  useGetEducationMutation,
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = educationServer;

export default educationServer.reducer;
