import React from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    InputAdornment,
    Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import appLogo from '../../assets/logo.png';
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Box sx={{ backgroundColor: "#f9f9f9", padding: "40px 20px", width: '100%' }}>
            {/* Newsletter Section */}
            <Box
                sx={{
                    textAlign: "center",
                    marginBottom: "40px",
                    padding: "0 20px",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", marginBottom: "16px" }}
                >
                    {t('footer.newsletter')}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        maxWidth: "600px",
                        margin: "0 auto",
                    }}
                >
                    <TextField
                        placeholder={t('footer.emailPlaceholder')}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: "30px",
                            marginRight: "16px",
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#8bc34a",
                            borderRadius: "30px",
                            padding: "10px 24px",
                            fontWeight: "bold",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#7cb342",
                            },
                        }}
                    >
                        {t('footer.subscribe')}
                    </Button>
                </Box>
            </Box>

            <Divider sx={{ marginBottom: "40px" }} />

            {/* Main Footer Section */}
            <Grid container spacing={4} justifyContent='space-between'>
                {/* Left Column */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            {/* <img
                                src={appLogo}
                                alt="App Logo"
                                style={{ height: '70px', cursor: 'pointer' }}

                            /> */}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                            RentRobo
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: "center" }}>
                            {t('footer.tagLine')}
                        </Typography>
                    </Box>
                </Grid>

                {/* Center Column Links */}
                <Grid item xs={12} md={7}>
                    <Grid container spacing={4}>
                        {/* About Us Section */}
                        <Grid item xs={6} sm={4} md={3}>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", marginBottom: "8px" }}
                            >
                                {t('footer.about')}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "#1877F2", // Optional: Add hover color
                                    },
                                }}
                            >
                                Our Story
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "#1877F2",
                                    },
                                }}
                            >
                                Careers
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "#1877F2",
                                    },
                                }}
                            >
                                Customer Reviews
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "#1877F2",
                                    },
                                }}
                            >
                                Contact Us
                            </Typography>
                        </Grid>

                        {/* Resources Section */}
                        <Grid item xs={6} sm={4} md={3}>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", marginBottom: "8px" }}
                            >
                                {t('footer.resources')}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "#1877F2",
                                    },
                                }}
                            >
                                FAQs
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "#1877F2",
                                    },
                                }}
                            >
                                Help Center
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "#1877F2",
                                    },
                                }}
                            >
                                Service Policies
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "#1877F2",
                                    },
                                }}
                            >
                                Terms & Conditions
                            </Typography>
                        </Grid>

                        {/* Follow Us Section */}
                        <Grid item xs={6} sm={4} md={3}>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", marginBottom: "8px" }}
                            >
                                {t('footer.followUs')}
                            </Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                mb={1}
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "#1877F2", // Matches Facebook icon color
                                    },
                                }}
                            >
                                <Facebook size={16} style={{ marginRight: "8px", color: "#1877F2" }} />
                                <Typography variant="body2">Facebook</Typography>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                mb={1}
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "#E1306C", // Matches Instagram icon color
                                    },
                                }}
                            >
                                <Instagram size={16} style={{ marginRight: "8px", color: "#E1306C" }} />
                                <Typography variant="body2">Instagram</Typography>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                mb={1}
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "#0A66C2", // Matches LinkedIn icon color
                                    },
                                }}
                            >
                                <Linkedin size={16} style={{ marginRight: "8px", color: "#0A66C2" }} />
                                <Typography variant="body2">LinkedIn</Typography>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                mb={1}
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "#1DA1F2", // Matches Twitter icon color
                                    },
                                }}
                            >
                                <Twitter size={16} style={{ marginRight: "8px", color: "#1DA1F2" }} />
                                <Typography variant="body2">Twitter</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{ marginTop: "40px", marginBottom: "20px" }} />

            {/* Bottom Footer Section */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    fontSize: "14px",
                    marginTop: "20px",
                }}
            >
                <Typography variant="body2" sx={{ textAlign: "center", flexGrow: 1 }}>
                    © 2024 RentRobo TBD
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "16px",
                        flexGrow: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                color: "#1877F2", // Optional: Hover color
                            },
                        }}
                    >
                        Terms of Service
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                color: "#1877F2",
                            },
                        }}
                    >
                        Privacy Policy
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                color: "#1877F2",
                            },
                        }}
                    >
                        Cookies
                    </Typography>
                </Box>

            </Box>
        </Box>
    );
};

export default Footer;
