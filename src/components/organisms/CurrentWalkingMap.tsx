import KakaoMap from '../molecules/KakaoMap';
import { CaretLeft } from '@phosphor-icons/react';
import * as S from '../../styles/organisms/CurrentWalkingMap';
import { useMutation } from 'react-query';
import {
  walkingStart,
  walkingEnd,
  partTimeLocationSave,
} from '../../apis/walking';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { getCookie } from '../../utils/cookie';
import { UserType, WalkStatus } from '../../const/code';

const CurrentWalkingMap = () => {
  // const userToken = getCookie('user');
  const matchingId = 1; // TODO: matchingId props로 받아오기

  // // 웹 워커 생성
  // const workerScript = `
  // self.addEventListener('message', (e) => {
  //   // 웹 워커로부터 메시지를 받아 위치 업데이트 및 서버 통신 수행
  //   const { matchingId, lat, lng } = e.data;

  //   // 서버로 위치 정보를 전송하는 코드 작성
  //   // 위치를 주기적으로 업데이트하고 서버로 보낸다.
  //   const processLocationData = (matchingId, lat, lng) => {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + '${userToken}',
  //   }

  //   const body = {
  //     lat,
  //     lng,
  //   }

  //   // 위치 정보 서버로 전송
  //   fetch('https://port-0-team17-be-12fhqa2llo9i5lfp.sel5.cloudtype.app/api/walkRoad/${matchingId}', {
  //     method: 'POST',
  //     header: headers,
  //     body: body,
  //   })
  //     .then((data) => {
  //       console.log('Location data sent to server:', data);
  //     })
  //     .catch((error) => {
  //       console.error('Error sending location data:', error);
  //     });
  //   }

  //   // 위치 업데이트를 주기적으로 실행
  //   const intervalId = setInterval(() => {
  //     if(navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const {latitude, longitude} = position.coords;
  //       console.log('동작!!!');
  //       // 웹 워커에 위치 데이터 전송
  //       processLocationData(matchingId, latitude, longitude);
  //     },
  //     (err) => {
  //       console.error('Error getting user location:', err);
  //     }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported');
  //   }
  //   }, 5000); // 5초마다 업데이트

  //   self.addEventListener('terminate', () => {
  //     // 웹 워커 종료 시 실행
  //     clearInterval(intervalId);
  //   });
  // });
  // `;
  // const blob = new Blob([workerScript], { type: 'application/javascript' });
  // const workerUrl = URL.createObjectURL(blob);
  // const worker = new Worker(workerUrl);
  const navigate = useNavigate();
  const user: string = 'PART_TIMER'; // TODO: user props로 받아오기
  const [walkStatus, setWalkStatus] = useState(WalkStatus.done);
  const buttonInnerText =
    walkStatus === WalkStatus.ACTIVATE ? '산책 종료하기' : '산책 시작하기';

  const { mutate: mutateWalkingStart } = useMutation({
    mutationFn: walkingStart,
  });

  const { mutate: mutateWalkingEnd } = useMutation({
    mutationFn: walkingEnd,
  });

  const onClickBackCursor = () => {
    // TODO: BackCursor 클릭시 채팅방 페이지로 이동 기능 추가
  };

  const startLocationUpdate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // 웹 워커에 위치 데이터 전송
          const postData = {
            matchingId,
            location: {
              lat: latitude,
              lng: longitude,
            },
          };
          partTimeLocationSave(postData)
            .then((res) => {
              console.log('res', res);
            })
            .catch((err) => {
              console.log('err', err);
            });
          // sendToLocationToWorker(matchingId, latitude, longitude);
        },
        (err) => {
          console.error('Error getting user location:', err);
        },
      );
    } else {
      console.error('Geolocation is not supported');
    }
  };

  // 산책 종료 버튼 클릭 시 clearInterval을 통해 업데이트 중지
  const stopLocationUpdate = (intervalId: any) => {
    clearInterval(intervalId);
  };

  // const sendToLocationToWorker = (
  //   matchingId: number,
  //   lat: number,
  //   lng: number,
  // ) => {
  //   worker.postMessage({
  //     matchingId,
  //     lat,
  //     lng,
  //   });
  // };

  const handleClickButton = () => {
    let intervalId: any;
    if (walkStatus === WalkStatus.ACTIVATE) {
      mutateWalkingEnd(matchingId, {
        onSuccess: (res) => {
          // 산책 종료 알림 보내기
          alert('산책을 종료합니다!');
          // 웹 워커 종료
          worker.terminate();
          stopLocationUpdate(intervalId);
          navigate('/review', {
            state: {
              memberId: res.data.response.memberId,
              receiveMemberId: res.data.response.receiveMemberId,
            },
          });
        },
        onError: (error: any) => {
          alert(error.response.message);
        },
      });
    } else {
      mutateWalkingStart(matchingId, {
        onSuccess: (res) => {
          console.log('res', res);
          // 산책 시작 알림 보내기
          alert('산책을 시작합니다!');
          setWalkStatus(WalkStatus.ACTIVATE);
          // 알바생이 산책 시작 버튼을 클릭하면 알바생 위치를 웹 워커를 통해 실시간 업데이트
          startLocationUpdate();
          intervalId = setInterval(startLocationUpdate, 5000); // 2초마다 업데이트
        },
        onError: (error: any) => {
          alert(error.response.message);
        },
      });
    }
  };

  return (
    <S.Container>
      <S.BackCursor onClick={onClickBackCursor}>
        <CaretLeft size={30} color="black" />
      </S.BackCursor>
      <KakaoMap user={user} matchingId={matchingId} />
      <S.BottomBox>
        {user === UserType.DOG_OWNER ? (
          <S.Button onClick={onClickBackCursor}>메세지 보내기</S.Button>
        ) : (
          <S.Button onClick={handleClickButton}>{buttonInnerText}</S.Button>
        )}
      </S.BottomBox>
    </S.Container>
  );
};

export default CurrentWalkingMap;