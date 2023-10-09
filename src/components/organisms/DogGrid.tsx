import * as S from './../../styles/organisms/DogGrid';
import Image from '../atoms/Image';
import { Plus } from '@phosphor-icons/react';
// "dogs": [
//   {
//     "id": 1,
//      "image" : "basicProfile_47838475947393908393.png",
//   },
//   {
//     "id": 2,
//      "image" : "basicProfile_47838475947393908393.png",
//   },
//   {
//     "id": 3,
//      "image" : "basicProfile_47838475947393908393.png",
//   },
// ],
type Dog = {
  id: number;
  image: string;
};
type dogProps = {
  dogs: Dog[];
};
const DogGrid = ({ dogs }: dogProps) => {
  // const dogdata = dogs;
  return (
    <>
      <S.Container>
        <h1>Dogs</h1>
        <S.DogsContainer>
          <button>
            <Plus size="32" />
          </button>
          {dogs.map((dog) => (
            <Image src={dog.image} alt="강아지사진" size="4" />
          ))}
        </S.DogsContainer>
      </S.Container>
    </>
  );
};

export default DogGrid;
