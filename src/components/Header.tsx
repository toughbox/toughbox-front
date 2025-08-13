import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
  Tab,
  Tabs,
  Box,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
} from '@mui/icons-material';

interface HeaderProps {
  onDrawerToggle: () => void;
  selectedMenu?: string;
}

const getMenuTitle = (menuId: string) => {
  switch (menuId) {
    case 'Dashboard':
      return 'Dashboard';
    case 'Authentication':
      return '사용자 관리';
    case 'Analytics':
      return '분석';
    case 'Performance':
      return '성능';
    case 'Test Lab':
      return '테스트 랩';
    case 'Database':
      return '데이터베이스';
    case 'Storage':
      return '저장소';
    case 'Hosting':
      return '호스팅';
    case 'Functions':
      return '함수';
    case 'ML Kit':
      return 'ML 키트';
    default:
      return 'Dashboard';
  }
};

const getMenuTabs = (menuId: string) => {
  switch (menuId) {
    case 'Authentication':
      return ['사용자 등록', '사용자 목록', '권한 관리', '설정'];
    case 'Analytics':
      return ['개요', '사용자 분석', '이벤트', '전환율'];
    case 'Database':
      return ['데이터', '백업', '보안', '성능'];
    default:
      return ['사용자', '로그인 방법', '템플릿', '사용량'];
  }
};

const Header: React.FC<HeaderProps> = ({ selectedMenu = 'Dashboard' }) => {
  const menuTitle = getMenuTitle(selectedMenu);
  const menuTabs = getMenuTabs(selectedMenu);

  return (
    <AppBar
      component="div"
      position="static"
      elevation={0}
      sx={{ zIndex: 0 }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Box sx={{ flex: 1 }}>
            <Typography color="inherit" variant="h5" component="h1">
              {menuTitle}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Search">
              <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Alerts • No alerts">
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Help">
              <IconButton color="inherit">
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <IconButton color="inherit" sx={{ p: 0.5 }}>
              <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
      <Toolbar>
        <Box sx={{ width: '100%' }}>
          <Tabs value={0} textColor="inherit">
            {menuTabs.map((tab, index) => (
              <Tab key={index} label={tab} />
            ))}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 