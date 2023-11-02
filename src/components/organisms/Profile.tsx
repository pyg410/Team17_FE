import * as S from './../../styles/organisms/Profile';
import Image from '../atoms/Image';
import { useState, useRef, useCallback } from 'react';
import { PawPrint } from '@phosphor-icons/react';
import useProfileInput from '../../hooks/useProfileInput';
import { postProfile } from '../../apis/profile';

type profileProps = {
  id: number;
  nickname: string;
  profile_img: string;
  profileContent: string;
  dogBowl: number;
  coin: number;
  isOwner: boolean;
};
// /api/profile
const Profile = ({
  id,
  nickname,
  profile_img,
  profileContent,
  dogBowl,
  coin,
  isOwner,
}: profileProps) => {
  const [isReadOnly, setReadOnly] = useState(true);
  const { value, handleOnChange } = useProfileInput({
    profileImage: '',
    profileContent: '',
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const formData = new FormData();

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      setSelectedImage(e.target.files[0]);
      console.log(e.target.files[0].name);
    },
    [formData],
  );

  const onUploadImageClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);
  // // API 요청
  const handleEditClick = () => {
    console.log('formData :', formData);
    // 수정 중인 경우
    if (!isReadOnly) {
      // 프로필 내용이 변경되었을 때만 업로드
      if (value.profileContent) {
        formData.append('profileContent', value.profileContent);
      }
      // 이미지가 선택되었을 때만 업로드
      if (selectedImage) {
        formData.append('profileImage', selectedImage);
      }
      if (formData.has('profileContent') || formData.has('profileImage')) {
        // 서버로 프로필 업로드 요청
        // TODO:: S3연결되면 테스트 해야함
        // postProfile(formData)
        //   .then(() => {
        //     alert('프로필이 수정되었습니다.');
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });
      }
    }
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]); // 각 데이터의 이름과 값 출력
    }
    setReadOnly(!isReadOnly);
  };

  return (
    <>
      <S.Container>
        <S.MainProfile>
          <div className="pic">
            {isReadOnly ? (
              // TODO:: IMG 확인필요
              <Image
                src="./images/onboard_dog.png"
                alt="사용자 프로필 이미지"
                size="6.5"
              ></Image>
            ) : (
              <>
                {selectedImage ? (
                  //썸네일 표시
                  <Image
                    alt="not Found"
                    src={URL.createObjectURL(selectedImage)}
                    style={{ width: '100%', height: '100%' }}
                  ></Image>
                ) : (
                  <>
                    <label className="input-file-button" htmlFor="input-file">
                      업로드
                    </label>
                    <input
                      id="input-file"
                      type="file"
                      accept="image/*"
                      name="myImage"
                      ref={inputRef}
                      onChange={onUploadImage}
                      onClick={onUploadImageClick}
                      style={{ width: '100%', height: '100%' }}
                    ></input>
                  </>
                )}
              </>
            )}
          </div>
          <S.StyleTopProfileText>
            {/* 프로필 수정눌렀을 때, 안눌렀을 때 나타나는 차이 */}
            <S.Input
              type="text"
              value={nickname}
              background-color="#000000"
              style={{ fontSize: '2rem' }}
              readOnly
            />
            <div>
              <S.StyleDogBab>
                <span>개 밥그릇</span>
                <div className="paw">
                  <span>{dogBowl} % </span>
                  <div>
                    <Image src="./images/paw.png" alt="개밥그릇"></Image>
                  </div>
                </div>
              </S.StyleDogBab>
              {/* 자기 프로필이 아니라면 사라짐 */}
              {isOwner ? (
                <S.DogCoin>
                  <span> 멍코인</span>
                  <PawPrint weight="fill" color="#a59d52" />
                  <p> {coin} 멍</p>
                </S.DogCoin>
              ) : (
                ''
              )}
            </div>
          </S.StyleTopProfileText>
        </S.MainProfile>
        {isReadOnly ? (
          <S.Input
            type="text"
            value={profileContent}
            style={{ fontSize: '1rem', marginTop: '1.4rem' }}
            readOnly
          />
        ) : (
          <S.Input
            type="text"
            placeholder={profileContent}
            value={value.profileContent}
            onChange={handleOnChange}
            name="profileContent"
            // value={value.profileContent}
            color="#e2e2e2"
            style={{ fontSize: '1rem', marginTop: '1rem' }}
          />
        )}

        {/* 본인의 회원정보라면 */}
        {/* TODO :: 수정완료를 누르면 post요청해야함 */}
        {isOwner ? (
          <S.Button onClick={() => handleEditClick()}>
            {' '}
            {isReadOnly ? '프로필 수정' : '수정 완료'}{' '}
          </S.Button>
        ) : (
          ''
        )}
      </S.Container>
    </>
  );
};

export default Profile;

// const SPencil = styled.div`
//   position: absolute;

//   @media screen and (max-width: 768px) {
//     top: 11rem;
//     left: 6.5rem;
//   }
//   top: 11rem;
//   left: 18.5rem;
// `;
