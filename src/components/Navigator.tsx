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
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';

const drawerWidth = 256;

const categories = [
  {
    id: 'Develop',
    children: [
      { id: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
      { id: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
      { id: 'Performance', icon: <HomeIcon />, path: '/performance' },
      { id: 'Test Lab', icon: <StorageIcon />, path: '/test-lab' },
    ],
  },
  {
    id: 'Quality',
    children: [
      { id: 'Authentication', icon: <PeopleIcon />, path: '/authentication' },
      { id: 'Database', icon: <StorageIcon />, path: '/database' },
      { id: 'Storage', icon: <StorageIcon />, path: '/storage' },
      { id: 'Hosting', icon: <HomeIcon />, path: '/hosting' },
      { id: 'Functions', icon: <SettingsIcon />, path: '/functions' },
      { id: 'ML Kit', icon: <BarChartIcon />, path: '/ml-kit' },
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

  return (
    <Drawer variant="permanent" PaperProps={PaperProps}>
      <List disablePadding>
        <ListItem sx={{ fontSize: 22, color: '#fff', py: 3, px: 3 }}>
          Paperbase
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
      </List>
    </Drawer>
  );
};

export default Navigator; 