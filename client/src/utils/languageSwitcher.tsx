import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem, IconButton, Typography, Box } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public'; // Globe icon
import { setLanguage } from '../store/commonSlice';
import { RootState } from '../store/reducers';
import { changeLanguage } from '../utils/i18n';

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.common.language);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    dispatch(setLanguage({ language }));
    changeLanguage(language); // Update i18n language dynamically
    handleMenuClose();
  };

  // Map language codes to readable labels
  const languageLabels: Record<string, string> = {
    en: 'EN',
    fr: 'FR',
    es: 'ES',
    ta: 'TA',
  };

  return (
    <>
      <IconButton
        aria-label="language"
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
        style={{ display: 'flex', alignItems: 'center', padding:0, margin:'0px 20px' }}
      >
        <PublicIcon />
        <Typography variant="body2" style={{ marginLeft: 8 }}>
          {languageLabels[currentLanguage]}
        </Typography>
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
      >
        <MenuItem onClick={() => handleLanguageChange('en')}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" style={{ marginRight: 8 }}>🇺🇸</Typography>
            <Typography variant="body1">English</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('fr')}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" style={{ marginRight: 8 }}>🇫🇷</Typography>
            <Typography variant="body1">French</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('es')}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" style={{ marginRight: 8 }}>🇪🇸</Typography>
            <Typography variant="body1">Spanish</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('ta')}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" style={{ marginRight: 8 }}>🇮🇳</Typography>
            <Typography variant="body1">தமிழ்</Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
