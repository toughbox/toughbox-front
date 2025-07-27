import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Navigator from './components/Navigator';
import Header from './components/Header';
import Content from './components/Content';
import Authentication from './components/Authentication';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
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
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState('Dashboard');
  const location = useLocation();

  // URL 경로에 따라 selectedMenu 상태 업데이트
  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/dashboard':
        setSelectedMenu('Dashboard');
        break;
      case '/authentication':
        setSelectedMenu('Authentication');
        break;
      case '/analytics':
        setSelectedMenu('Analytics');
        break;
      case '/performance':
        setSelectedMenu('Performance');
        break;
      case '/test-lab':
        setSelectedMenu('Test Lab');
        break;
      case '/database':
        setSelectedMenu('Database');
        break;
      case '/storage':
        setSelectedMenu('Storage');
        break;
      case '/hosting':
        setSelectedMenu('Hosting');
        break;
      case '/functions':
        setSelectedMenu('Functions');
        break;
      case '/ml-kit':
        setSelectedMenu('ML Kit');
        break;
      default:
        setSelectedMenu('Dashboard');
    }
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
        <Header onDrawerToggle={handleDrawerToggle} selectedMenu={selectedMenu} />
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
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Content />
              </ProtectedRoute>
            } />
            <Route path="/authentication" element={
              <ProtectedRoute>
                <Authentication />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <div>Analytics 페이지 (준비 중)</div>
              </ProtectedRoute>
            } />
            <Route path="/performance" element={
              <ProtectedRoute>
                <div>Performance 페이지 (준비 중)</div>
              </ProtectedRoute>
            } />
            <Route path="/test-lab" element={
              <ProtectedRoute>
                <div>Test Lab 페이지 (준비 중)</div>
              </ProtectedRoute>
            } />
            <Route path="/database" element={
              <ProtectedRoute>
                <div>Database 페이지 (준비 중)</div>
              </ProtectedRoute>
            } />
            <Route path="/storage" element={
              <ProtectedRoute>
                <div>Storage 페이지 (준비 중)</div>
              </ProtectedRoute>
            } />
            <Route path="/hosting" element={
              <ProtectedRoute>
                <div>Hosting 페이지 (준비 중)</div>
              </ProtectedRoute>
            } />
            <Route path="/functions" element={
              <ProtectedRoute>
                <div>Functions 페이지 (준비 중)</div>
              </ProtectedRoute>
            } />
            <Route path="/ml-kit" element={
              <ProtectedRoute>
                <div>ML Kit 페이지 (준비 중)</div>
              </ProtectedRoute>
            } />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
