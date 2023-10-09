import Image from '../atoms/Image';
import SearchBar from '../molecules/SearchBar';
import * as S from '../../styles/organisms/MainGNB';
import { getLocalStorage } from '../../utils/localStorage';
import { Dispatch, SetStateAction } from 'react';

/*
 * 로컬 스토리지에 저장하는 user 정보
 * 1. 사용자 프로필 이미지 경로
 * 2. 사용자 토큰
 *   - refresh token
 *   - access token
 */

type MainGNBProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

// 메인 페이지의 상단 헤더
const MainGNB = ({ setModalOpen }: MainGNBProps) => {
  const user = getLocalStorage('user');

  // 사용자가 로그인 상태인 경우 사용자가 지정한 이미지를 프로필 이미지로 사용
  // 비로그인 상태인 경우 기본 프로필 이미지 사용
  return (
    <S.Container>
      <Image src="/images/dog_logo.png" alt="dog logo" size="1.5" />
      <SearchBar setModalOpen={setModalOpen} />
      <S.ProfileWrapper>
        {user ? (
          <Image
            src="/images/test.png"
            alt="user profile"
            className="profile__image"
          />
        ) : (
          <Image
            src="/images/default_profile.png"
            alt="default profile"
            className="profile__image"
          />
        )}
      </S.ProfileWrapper>
    </S.Container>
  );
};

export default MainGNB;
