import { createTheme, emphasize } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
const darkScrollbar = ({
    size = 7,
    border = 0,
    borderRadius = 8,
    thumbColor = emphasize('#1c1c46', 0.1),
    trackColor = 'transparent',
    active = emphasize('#1c1c46', 0.15)
} = {}) => {
    return {
        scrollbarColor: `${thumbColor} ${trackColor}`,
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: trackColor,
            height: size,
            width: size
        },
        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius,
            backgroundColor: thumbColor,
            minHeight: 24,
            border: `${border}px solid ${trackColor}`
        },
        '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: active
        },
        '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: active
        },
        '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: active
        },
        '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: trackColor
        }
    };
};

interface CustomTypographyOptions extends TypographyOptions {
    textOverflow?: string;
}

declare module '@mui/material/styles' {
    interface TypeText {
        gray03: string;
        gray04: string;
        failed: string;
        success: string;
        running: string;
        link: string;
        blue01: string;
        blue02: string;
        white01: string;
        creating: string;
    }

    interface TypeBackground {
        cPurple: string;
        cSidebar: string;
        black01: string;
        blue03: string;
        blue04: string;
        blue05: string;
        blue06: string;
        blue07: string;
        blue08: string;
        blue09: string;
        blue10: string;
        blue11: string;
        qElectronList: string;
        qElectronTabSelect: string;
        qElectronPanel: string;
        qElectronListBg: string;
        blue12: string;
        blue13: string;
        blue14: string;
        blue0380: string;
        dashboardCard: string;
        recentDispatchCard: string;
        blue15: string;
        blue16: string;
        blue17: string;
        violet01: string;
        failed20: string;
        gray0333: string;
        gray01: string;
    }

    interface Palette {
        cPurple: string;
        cSidebar: string;
        qElectronList: string;
        qElectronTabSelect: string;
        qElectronPanel: string;

    }

    interface PaletteOptions {
        cPurple?: string;
        cSidebar?: string;
        qElectronList?: string;
        qElectronTabSelect?: string;
        qElectronPanel?: string;
    }

}

export default createTheme({
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        values: { xs: 0, sm: 1000, md: 1420, lg: 1500, xl: 2000 }
    },
    palette: {
        mode: 'light',
        text: {
            // primary: '#CBCBD7', // setting the primary and secondary text color
            gray03: '#86869A',
            // secondary: '#FFFFFF', // setting the primary and secondary text color
            gray04: '#F1F1F6',
            failed: '#FF6464',
            success: '#55D899',
            running: '#DAC3FF',
            link: 'rgba(174, 182, 255, 1)',
            blue01: '#AEB6FF',
            blue02: '#5552FF',
            white01: '#D9D9D9',
            creating: '#FFC164'
        },
        secondary: {
            main: '#8B31FF'
        },
        background: {
            paper: '#F8F8F0',
            // default: '#08081A',  //changing the default background color
            cPurple: '#1c1c46',
            cSidebar: 'rgba(28, 28, 70, 0.4)',
            black01: '#000000',
            blue03: '#303067',
            blue04: 'rgba(85, 82, 255, 1)',
            blue05: '#6473FF',
            blue06: '#5552FF',
            blue07: '#403cff',
            blue08: '#1C1C4666',
            blue09: '#BEBEBE',
            blue10: '#1C1C46B2',
            blue11: '#41418D',
            qElectronList: 'rgba(48, 48, 103, 0.60)',
            qElectronTabSelect: 'rgba(28, 28, 70, 0.80)',
            qElectronPanel: 'rgba(8, 8, 26, 0.60)',
            qElectronListBg: 'rgba(8, 8, 26, 0.40)',
            blue12: '#1C1C4666',
            blue13: '#6D7CFF',
            blue14: '#2a2a5c',
            blue0380: '#303067cc',
            dashboardCard: 'rgba(28, 28, 70, 0.60)',
            recentDispatchCard: 'rgba(28, 28, 70, 0.90)',
            blue15: '#1C1C467D',
            blue16: '#30306799',
            blue17: '#303067CC',
            violet01: '#DAC3FF',
            failed20: '#FF646433',
            gray0333: '#86869A33',
            gray01: '#323267'
        }
    },
    shape: {
        borderRadius: 10
    },
    typography: {
        fontFamily: '"Titillium Web", Roboto, Helvetica, Arial, sans-serif',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,
        textOverflow: 'ellipsis',
        header20: { fontSize: '1.25rem', fontWeight: 200, fontFamily: 'DM Sans' },
        h1: {
            fontSize: '2.5rem',
            fontWeight: 200,
            fontFamily: 'Play,"Titillium Web", Roboto, Helvetica, Arial, sans-serif'
        },
        h2: {
            fontSize: '1.875rem',
            fontWeight: 300,
            fontFamily: 'Play,"Titillium Web", Roboto, Helvetica, Arial, sans-serif'
        },
        h3: {
            fontSize: '1.275rem',
            fontWeight: 300,
            fontFamily: 'Play,"Titillium Web", Roboto, Helvetica, Arial, sans-serif'
        },
        h4: {
            fontSize: '1rem',
            fontWeight: 300,
            fontFamily: 'Play,Roboto, Helvetica, Arial, sans-serif'
        },
        h5: {
            fontSize: '0.875rem',
            fontWeight: 300,
            fontFamily: 'Play,Roboto, Helvetica, Arial, sans-serif'
        },
        button: {
            textTransform: 'none'
        },
        sidebar: {
            fontSize: '0.75rem'
        },
        sidebarTitle: {
            color: '#86869A'
        },
        bannerHeader: {
            fontSize: '2.5rem'
        },
        bannerParagraph: {
            fontSize: '1.5rem'
        },
        status: {
            fontSize: '1rem'
        },
        downloads: {
            fontSize: '10px'
        },
        popUpDispatch: {
            fontSize: '0.875rem',
            fontWeight: 400
        },
        downloadsSolvers: {
            fontSize: '10px',
            fontWeight: 500
        },
        graphNodeDrawer: {
            fontSize: '14px',
            fontWeight: 400,
            color: '#FFF'
        },
        graphCodeAccordion: {
            fontSize: '14px',
            fontWeight: 400,
            color: '#CBCBD7'
        }
    } as CustomTypographyOptions,
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    ...darkScrollbar()
                }
            }
        },
        MuiTableSortLabel: {
            styleOverrides: {
                root: {
                    color: '#CBCBD7',
                    '&:hover': {
                        color: '#FFFFFF'
                    },
                    '&.Mui-active': {
                        color: '#FFFFFF'
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '0.1rem'
                }
            }
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '& td': { border: 0 },
                    height: '3.125rem',
                    '&:hover': {
                        background: '#1c1c46',
                        '& td': { color: '#FFFFFF' }
                    }
                }
            }
        },
        // MuiTabPanel: {
        //     styleOverrides: {
        //         root: {
        //             padding: '0.375rem'
        //         }
        //     }
        // },
        MuiButtonBase: {
            defaultProps: {
                // The props to apply
                disableRipple: true // No more ripple, on the whole application 💣!,
            }
        },
        MuiTooltip: {
            defaultProps: {
                // The props to apply
                arrow: true
            },
            styleOverrides: {
                tooltip: {
                    backgroundColor: 'rgba(28, 28, 70, 0.7)',
                    color: '#FAFAFA'
                },
                arrow: {
                    color: 'rgba(28, 28, 70, 0.7)'
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    padding: '0.25rem'
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    padding: '0px 3px 3.5px 3px'
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        color: '#CBCBD7'
                    }
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    backgroundColor: '#303067'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                outlined: {
                    border: '1px solid #6473FF',
                    borderRadius: '20px'
                },
                outlinedPrimary: {
                    color: '#CBCBD7'
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    padding: '10px'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '15px',
                    '&:last-child': {
                        padding: '10px'
                    }
                }
            }
        },
        MuiSnackbarContent: {
            styleOverrides: {
                root: {
                    color: 'white',
                    backgroundColor: '#3e3ef7',
                    border: '1px solid #0f0fd9'
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: '#303067',
                    border: '1px solid #1C1C46',
                    fontSize: '0.75rem',
                    borderRadius: '8px'
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    backgroundColor: '#323267',
                    cursor: 'pointer',
                    '&:hover': {
                        background: '#1C1C46',
                        color: '#FFFFFF'
                    }
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#323267',
                    cursor: 'pointer',
                    '&:hover': {
                        background: '#1C1C46',
                        color: '#FFFFFF'
                    }
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    padding: '0',
                    backgroundColor: '#323267'
                }
            }
        },
        MuiMenuItem: {
            defaultProps: {
                divider: true
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#FAFAFA',
                    '&:hover': {
                        background: '#d1cdcd'
                    },
                    borderBottom: '1px solid #FAFAFA'
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                // paper: {
                // 	borderRadius: '6rem'
                // },
                list: {
                    padding: '0'
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#CBCBD7',
                    '&.Mui-selected': {
                        color: '#AEB6FF',
                        fontWeight: 700
                    }
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: '#AEB6FF'
                }
            }
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: '#1C1C46',
                        color: '#fafafa',
                        border: '1px solid #AEB6FF'
                    }
                }
            }
        },
        MuiUseMediaQuery: {
            defaultProps: {
                noSsr: true
            }
        }
    }
});
