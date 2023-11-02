import Location from '../components/molecules/Location';
import Carousel from '../components/molecules/Carousel';
import BottomNavBar from '../components/molecules/BottomNavBar';
import MainListTemplate from '../components/templates/MainListTemplate';
import MainGNB from '../components/organisms/MainGNB';
import React, { useState, useEffect, Suspense, useCallback } from 'react';
import useGeolocation from '../hooks/useGeolocation';
import Container from '../components/atoms/Container';
import { useDebounce } from '../hooks/useDebounce';
import { fetchNotifications } from '../apis/notification';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import SkeletonList from '../components/organisms/SkeletonList';
import { FixedSizeList } from 'react-window'; // React Window 라이브러리 추가

type Filter = {
  size: string[];
  breed: string[];
};

const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [address, setAddress] = useState('');
  const location = useGeolocation();
  const [selectedFilter, setSelectedFilter] = useState<Filter>({
    size: [],
    breed: [],
  });

  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  const debouncedSearch = useDebounce(search, 500);
  const { lat, lng } = location.coordinates;
  let userImage = '';

  const {
    data: notifications,
    fetchNextPage,
    refetch,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['notifications', debouncedSearch, address],
    ({ pageParam = 0 }) =>
      fetchNotifications(debouncedSearch, selectedFilter, pageParam, lat, lng),
    {
      getNextPageParam: (lastPage, pages) => {
        if (
          !lastPage.data.response.notifications ||
          lastPage.data.response.nextCursorRequest.key === -1
        ) {
          // 마지막 페이지일 경우 NULL을 반환하여 더 이상 페이지를 불러오지 않음
          return null;
        }
        // 다음 페이지를 요청하기 위해 현재 커서 위치를 계산하여 반환
        return lastPage.data.response.nextCursorRequest.key;
      },
      onSuccess: (data) => {
        userImage = data?.pages[0]?.data.response.image;
      },
      onError: (error: any) => {
        // 에러 발생 시 에러 처리
        console.log('error', error);
      },
    },
  );

  useEffect(() => {
    // 페이지가 로드되면 첫 번째 페이지를 요청
    if (inView && hasNextPage && address) {
      fetchNextPage();
    }
  }, [inView]);

  const handleFilterAdap = useCallback(() => {
    // 모달창 닫기
    setModalOpen(false);

    // query 캐시된 데이터 삭제 후 다시 요청
    queryClient.setQueryData(['notifications', debouncedSearch, address], null);
    refetch();
  }, [notifications]);

  return (
    <Container>
      <MainGNB
        setModalOpen={setModalOpen}
        search={search}
        setSearch={setSearch}
        image={userImage}
      />
      <Location address={address} setAddress={setAddress} />
      <Carousel />
      <>
        <Suspense fallback={<SkeletonList />}>
          {!isLoading && notifications && address ? (
            // React Window의 FixedSizeList를 사용하여 가상 스크롤 추가
            <FixedSizeList
              itemData={notifications}
              itemCount={1}
              itemSize={10} // 각 아이템의 높이 설정
              height={500} // 리스트 컨테이너의 높이 설정
              width={800} // 리스트 컨테이너의 너비 설정
            >
              {() => (
                // 아이템을 렌더링하는 함수
                <MainListTemplate
                  address={address}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  search={search}
                  notifications={notifications}
                  location={location}
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                  handleFilterAdap={handleFilterAdap}
                />
              )}
            </FixedSizeList>
          ) : (
            <SkeletonList />
          )}
        </Suspense>
        <div ref={ref}></div>
        {isFetchingNextPage && <SkeletonList />}
      </>
      <BottomNavBar />
    </Container>
  );
};

export default React.memo(Main);
