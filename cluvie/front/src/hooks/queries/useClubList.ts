import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { AxiosError, AxiosResponse } from "axios";

import * as Api from "@/utils/api";
import { Club } from "@/utils/interface";

/*
* 해당 React Query 구조분해 없이 그냥 받아올 시 
* status, isLoading, isSuccess, isError, data, isFetching, error 등이 있음
*/

// 전체 클럽 리스트 불러오기
export function useAllClubList(options?: object) {
  return useQuery<AxiosResponse, AxiosError, Club[], string[]>(
    ["clublist"], 
    async () => { 
      const res = await Api.get("/clubs");
      return res.data.result;
    }, {
      ...options,
    }
  );
}

// 무한 스크롤 위해서 6개씩 클럽 리스트 불러오기
export function useScrollClubList(path: string) {
  return useInfiniteQuery(
    // QueryKey
    ["clublist", path], 
    // QueryFn
    async ({ pageParam = 999999 }) => {
      const res = await Api.get(`/clubs/${path}`, pageParam);
      return res.data;
    }, {
      // QueryOptions
      getNextPageParam: (lastPage, allPages) => {
        const nextId = lastPage.scrollClublist.length - 1;
        return nextId === 5 && lastPage.scrollClublist[nextId].id;
      },
      refetchOnMount: true,
      refetchOnReconnect: true,
    }
  );
}

// 메인에 보일 클럽 리스트 불러오기
export function useMainClubList(path: string, options?: object) {
  return useQuery<AxiosResponse, AxiosError, Club[], string[]>(
    [path], 
    async () => { 
      const res = await Api.get(`/clubs/${path}`);
      return res.data[path];
    }, {
      ...options,
    }
  );
}

// 클럽 생성하기
export function useCreateClub() {
  const queryClient = useQueryClient();
  return useMutation(
    (clubInfo: Club) => Api.post("/clubs", clubInfo), {
      // QueryOptions   
      // 요청이 성공한 경우 queryKey 유효성 제거
      onSuccess: () => queryClient.invalidateQueries("clublist")
    }
  );
}