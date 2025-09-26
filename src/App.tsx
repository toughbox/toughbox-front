import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Navigator from './components/Navigator';
import Content from './components/Content';
import Authentication from './components/Authentication';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Sample from './components/Sample';
import Architecture from './components/Architecture';
import { TokenManager } from './services/api';

const drawerWidth = 256;

// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  console.log('ProtectedRoute - 인증 상태 확인 중...');
  const isAuthenticated = TokenManager.isTokenValid();
  console.log('ProtectedRoute - 인증 결과:', isAuthenticated);
  
  if (!isAuthenticated) {
    console.log('ProtectedRoute - 인증 실패, 홈으로 리다이렉트');
    return <Navigate to="/" replace />;
  }
  
  console.log('ProtectedRoute - 인증 성공, 컴포넌트 렌더링');
  return <>{children}</>;
};

function App() {
  const [selectedMenu, setSelectedMenu] = React.useState('Home');
  const location = useLocation();

  // URL 경로에 따라 selectedMenu 상태 업데이트
  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/home':
        setSelectedMenu('Home');
        break;
      case '/about':
        setSelectedMenu('About Me');
        break;
      case '/projects':
        setSelectedMenu('Projects');
        break;
      case '/architecture':
        setSelectedMenu('Architecture');
        break;
      case '/contact':
        setSelectedMenu('Contact');
        break;
      case '/sample':
        setSelectedMenu('Sample');
        break;
      case '/authentication':
        setSelectedMenu('User Management');
        break;
      default:
        setSelectedMenu('Home');
    }
  }, [location.pathname]);

  // 로그인/회원가입/환영 페이지에서는 네비게이션과 헤더를 숨김
  const isAuthPage = ['/login', '/register', '/'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Navigator
          PaperProps={{ style: { width: drawerWidth } }}
          selectedMenu={selectedMenu}
        />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          component="main"
          sx={{ 
            flex: 1, 
            py: 6, 
            px: 4, 
            backgroundColor: '#eaeff1' 
          }}
        >
          <Routes>
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <ProtectedRoute>
                <AboutMe />
              </ProtectedRoute>
            } />
            <Route path="/projects" element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            } />
            <Route path="/sample" element={
              <ProtectedRoute>
                <Sample />
              </ProtectedRoute>
            } />
            <Route path="/architecture" element={
              <ProtectedRoute>
                <Architecture />
              </ProtectedRoute>
            } />
            <Route path="/authentication" element={
              <ProtectedRoute>
                <Authentication />
              </ProtectedRoute>
            } />
            {/* 기본 경로를 /home으로 리다이렉트 */}
            <Route path="/dashboard" element={<Navigate to="/home" replace />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
