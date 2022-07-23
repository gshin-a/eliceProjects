import React, { useEffect, useRef } from "react";
import { UseInfiniteQueryResult } from "react-query";

/*
  * root : 대상 객체의 가시성을 확인할 때 사용되는 뷰포트 요소. default는 null => 브라우저의 viewport
  * target : 감지 대상
  * threshold : 교차 감지 영역 비율. 0: 교차영역 진입감지, 1: 다보일 때
  * rootMargin : margin을 이용하여 Root 범위 확장/축소
*/

function useInfiniteScroll(res: UseInfiniteQueryResult, targetRef: React.RefObject<HTMLElement>) {
  const observerRef = useRef<IntersectionObserver>();

  // IntersectionObserver 설정
  const setIntersectionObserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    // 콜백함수
    entries.forEach((entry) => {
      // 관찰하고 있는 entry가 화면에 보여질 때
      if (entry.isIntersecting) {
        io.unobserve(entry.target); // 관찰 해제
        if (res.hasNextPage) {
           res.fetchNextPage();
        } // 다음 페이지 요청
      }
    })
  }

  // res 값 변경 시마다 관찰 변경
  useEffect(() => {
    // 이미 IntersectionObserver가 있을 경우 연결 해제
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // IntersectionObserver 새롭게 정의
    observerRef.current = new IntersectionObserver(setIntersectionObserver, {
      rootMargin: "0px",
      threshold: 1.0,
    });

    // targetRef 관찰 시작
    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }
  }, [res]);
}

export default useInfiniteScroll;