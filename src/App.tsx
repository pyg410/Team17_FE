import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import OnBoarding from './pages/OnBoarding';
import Main from './pages/Main';
import ProfilePage from './pages/ProfilePage';
import ChatList from './pages/ChatList';
import ChatRoom from './pages/ChatRoom';
import Payment from './pages/Payment';
import Review from './pages/Review';
import DetailNotification from './pages/DetailNotificationPage';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/onboard" element={<OnBoarding />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chatlist" element={<ChatList />} />
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/review" element={<Review />} />
          <Route path="/notification" element={<DetailNotification />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
