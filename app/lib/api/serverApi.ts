import {IStory,
  IStoryByIdResponse,
  PaginatedStoriesResponse, } from "@/types/story";
import { User } from "@/types/user";
import axios from "axios";
import { nextServer } from './api';

export const apiServer = axios.create({
  
});

export type StoriesListResponse = {
  data: IStory[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
export const fetchStoryById = async (storyId: string): Promise<IStory> => {
  const { data } = await nextServer.get<IStoryByIdResponse>(
    `/stories/${storyId}`
  );
  return data.data;
};

export const getTopStoriesServer = async (limit = 3) => {
  const res = await apiServer.get<StoriesListResponse>("/stories", {
    params: {
      page: 1,
      limit,
      sortBy: "popular",
    },
  });
  return res.data;
};

export type GetUsersResponse = {
  data: User[];
  pagination: { total: number; page: number; limit: number; pages: number };
};

export async function getUsersServer(page = 1, limit = 4) {
  const res = await apiServer.get<GetUsersResponse>("/users", {
    params: {
      page,
      limit,
    },
  });

  return res.data;
}


export interface StoryDetailResponse {
  data: IStory;
  isSaved: boolean;
}

export async function getStoryByIdServer(storyId: string) {
  const { data } = await apiServer.get<StoryDetailResponse>(
    `/stories/${storyId}`,
  );

  return data;
}