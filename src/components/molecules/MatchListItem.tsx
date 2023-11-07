import Image from '../atoms/Image';
import * as S from '../../styles/molecules/MatchListItem';
import { PostChatRoom } from '../../apis/chat';
import { response } from 'msw';

interface Apply {
  id: number;
  certification: string;
  experience: string;
  member: Member;
}

interface Member {
  username: string;
  image: string;
}

type ListItemProps = {
  apply: Apply;
};

const MatchListItem = ({ apply }: ListItemProps) => {
  console.log('apply', apply);
  const { certification, experience, member } = apply;

  const handleApply = () => {
    console.log('Apply clicked');
    // 상세 페이지로 이동한다.
  };

  const handleAccept = () => {
    console.log('채팅방 생성');
    // 채팅방을 생성한다.
    // Add logic for accepting the applicant
    PostChatRoom(1, 2)
      .then((response) => {
        console.log('응답', response);
      })
      .catch((error) => {
        console.log('에러', error);
      });
    // 매칭 아이디를 삭제한다.
  };

  const handleReject = () => {
    console.log('Reject clicked');
    // 매칭 아이디를 삭제한다.
  };

  return (
    <S.Container onClick={handleApply}>
      <S.ProfileImgWrapper>
        <Image src={member.image} alt="지원자 임시 이미지" />
      </S.ProfileImgWrapper>
      <S.TextWrapper>
        <S.InfoWrapper>
          <S.ListTitle>닉네임 : {member.username}</S.ListTitle>
          <S.ListTitle>자격증 : {certification}</S.ListTitle>
          <S.ListTitle>경험 : {experience}</S.ListTitle>
        </S.InfoWrapper>
      </S.TextWrapper>
      <S.ButtonWrapper>
        <S.AcceptButton onClick={handleAccept}>수락</S.AcceptButton>
        <S.RejectButton onClick={handleReject}>거절</S.RejectButton>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default MatchListItem;