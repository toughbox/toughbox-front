import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  ContactMail as ContactIcon,
  Article as ArticleIcon,
  Description as ResumeIcon,
  People as PeopleIcon,
  Logout as LogoutIcon,
  Science as ScienceIcon,
} from '@mui/icons-material';
import { authAPI } from '../services/api';

const categories = [
  {
    id: 'Portfolio',
    children: [
      { id: 'Home', icon: <HomeIcon />, path: '/home' },
      { id: 'About Me', icon: <PersonIcon />, path: '/about' },
      { id: 'Projects', icon: <WorkIcon />, path: '/projects' },
      { id: 'Contact', icon: <ContactIcon />, path: '/contact' },
    ],
  },
  {
    id: 'Tools',
    children: [
      { id: 'Sample', icon: <ScienceIcon />, path: '/sample' },
    ],
  },
  {
    id: 'Admin',
    children: [
      { id: 'User Management', icon: <PeopleIcon />, path: '/authentication' },
    ],
  },
];

interface NavigatorProps {
  PaperProps?: any;
  selectedMenu?: string;
}

const Navigator: React.FC<NavigatorProps> = ({ PaperProps, selectedMenu = 'Dashboard' }) => {
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      navigate('/');
    } catch (error) {
      console.error('로그아웃 에러:', error);
      navigate('/');
    }
  };

  return (
    <Drawer variant="permanent" PaperProps={PaperProps}>
      <List disablePadding>
        <ListItem sx={{ fontSize: 22, color: '#fff', py: 3, px: 3 }}>
          Portfolio
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>
                <Typography color="inherit" variant="caption">
                  {id}
                </Typography>
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, path }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  selected={selectedMenu === childId}
                  onClick={() => handleMenuClick(path)}
                  sx={{
                    py: 0,
                    minHeight: 32,
                    color: 'rgba(255,255,255,.8)',
                    '&.Mui-selected': {
                      color: '#4fc3f7',
                      bgcolor: 'rgba(255,255,255,.08)',
                    },
                    '&.Mui-selected:hover': {
                      bgcolor: 'rgba(255,255,255,.08)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={childId}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2, bgcolor: 'rgba(255,255,255,.15)' }} />
          </Box>
        ))}
        
        {/* 로그아웃 버튼 */}
        <Box sx={{ mt: 'auto', p: 2 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                py: 0,
                minHeight: 32,
                color: 'rgba(255,255,255,.8)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,.08)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="로그아웃"
                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
              />
            </ListItemButton>
          </ListItem>
        </Box>
      </List>
    </Drawer>
  );
};

export default Navigator; 