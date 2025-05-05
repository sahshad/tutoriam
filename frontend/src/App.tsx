import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from './redux/store';
import { refreshToken } from './services/authService';
import { fetchCartItems } from './redux/thunks/cartThunk';
import { fetchChats } from './redux/thunks/chatThunk';
import { SocketProvider } from './context/socket-context';
import { DashboardFooter } from './components/common/footer';

import { adminRoutes } from './routes/admin-routes';
import { instructorRoutes } from './routes/instructor-routes';
import { userRoutes } from './routes/user-routes';
import { commonRoutes } from './routes/common-routes';
import { fetchInstructor } from './redux/thunks/instructorThunk';

const App = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const user = await refreshToken(dispatch);
        if (user?.role !== 'admin') {
          appDispatch(fetchCartItems());
          appDispatch(fetchChats());
        }

        if(user?.role === 'instructor'){
          appDispatch(fetchInstructor(user._id))
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [dispatch]);

  if (loading) return <div />;

  return (
    <Router>
      <Toaster richColors position="top-right" />
      <SocketProvider>
        <Routes>
          {commonRoutes}
          {userRoutes}
          {instructorRoutes}
          {adminRoutes}
        </Routes>
      </SocketProvider>
      <DashboardFooter />
    </Router>
  );
};

export default App;
