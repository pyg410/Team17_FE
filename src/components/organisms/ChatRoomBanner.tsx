import * as S from '../../styles/molecules/ProfileBanner';
import ChatRoomBannerItem from '../molecules/ChatRoomBannerItem';
import { useLocation } from 'react-router-dom';

const ChatRoomBanner = () => {
  const { state } = useLocation();
  console.log('state', state);
  const data = [
    {
      chat: {
        name: '댕댕죠아',
        image: '/images/dog-sample.png',
      },
      id: 1,
    },
  ];

  return (
    <S.Container>
      {data.map((item) => (
        <ChatRoomBannerItem
          key={item.id} // user id
          chat={item.chat} // last message
        />
      ))}
    </S.Container>
  );
};

export default ChatRoomBanner;