import * as S from '../../styles/organisms/DogProfile';
import Image from '../atoms/Image';
import DogSizeImage from '../atoms/DogSizeImage';

type DogProfileProps = {
  img: string;
  name: string;
  breed: string;
  age: number;
  size: string;
  onClickDogSelectModal?: () => void; // 클릭 시 DogSelectModal을 열기 위한 함수
};

const DogProfile = ({
  img,
  name,
  breed,
  age,
  size,
  onClickDogSelectModal,
}: DogProfileProps) => {
  const handleImageClick = () => {
    // DogSelectModal 열기 함수 호출
    if (onClickDogSelectModal) {
      onClickDogSelectModal();
    }
  };

  return (
    <>
      <S.Container>
        <S.Dog>
          <div className="image" onClick={handleImageClick}>
            <Image
              src={img || ''}
              alt="강아지 예시"
              style={{
                border: '1px solid #e2e2e2', // 테두리 스타일 설정
                boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)', // 그림자 스타일 설정
              }}
            />
          </div>
          <S.DogSpan>
            <div className="block">
              <span className="title"> 이름 </span>
              <span> {name || ''}</span>
            </div>
            <div className="block">
              <span className="title"> 견종 </span>
              <span> {breed || ''}</span>
            </div>
            <div className="block">
              <span className="title"> 나이 </span>
              <span> {age !== -1 ? `${age}살` : ''}</span>
            </div>
          </S.DogSpan>
        </S.Dog>
        <S.DogSize>
          <span> 반려견 크기 </span>
          <S.Images>
            <DogSizeImage children="소형견" mark={size === '소형견'} />
            <DogSizeImage children="중형견" mark={size === '중형견'} />
            <DogSizeImage children="대형견" mark={size === '대형견'} />
          </S.Images>
        </S.DogSize>
      </S.Container>
    </>
  );
};

export default DogProfile;
// const { data, isLoading, isError } = useQuery(['dogProfile'], () =>
//   getDogProfile(selectedDog),
// );