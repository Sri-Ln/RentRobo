import React, { useEffect, useState, useRef } from "react";
import NavBar from "../../components/navbar/index.tsx";
import Footer from "../../components/footer/index.tsx";
import Card from "@mui/material/Card";
import { useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Fade from "@mui/material/Fade";
import axios from "axios";
import FloatingChatbot, {
  FinalChatOutput,
  FloatingChatbotHandle,
} from "../../components/chatbot";
import routes from "../../constants/routes.json";

import coverImage from "../../assets/boston-downtown-usa.jpg";
import homeImage from "../../assets/Home-Photo.jpg";

const API_URL = "http://127.0.0.1:5000/get-data";

const Services: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showData, setShowData] = useState<boolean>(false); // Controls fade-in effect
  const [chatbotData, setChatbotData] = useState<FinalChatOutput | null>(null);
  // Control whether the chatbot is visible.
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const chatbotRef = useRef<FloatingChatbotHandle>(null);
  const navigate = useNavigate();
  const [parallaxOffset, setParallaxOffset] = useState<number>(0);

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    setShowData(false); // Hide data before new fetch
    try {
      const response = await axios.get(`${API_URL}?page=${pageNumber}&count=9`);
      console.log("response: ", response);
      setData(response.data.items);
      setTotalPages(response.data.metadata.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setShowData(true), 200); // Small delay for smoother fade-in
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Multiply window.scrollY by a factor <1 for a slower effect
      setParallaxOffset(window.scrollY * 0.25);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleChatComplete = (data: FinalChatOutput) => {
    setChatbotData(data);
    console.log("Chatbot data:", data);
    // Hide the chatbot modal; later the Navbar Help button can re-open it.
    setShowChatbot(false);
    if (data) {
      navigate(routes.RECOMMENDATION, { state: { chatbotData: data } });
    }
  };

  return (
    <React.Fragment>
      <NavBar
        onHelpClick={() => {
          // Open the chat window directly when Help is clicked.
          chatbotRef.current?.openChatWindow();
        }}
      />
      {/* Cover Section with Parallax Effect */}
      <div
        style={{
          width: "100%",
          height: "98vh",
          position: "relative",
          overflow: "hidden",
          backgroundImage: `url(${coverImage})`,
          backgroundAttachment: "fixed",
          backgroundPosition: `center ${-parallaxOffset}px`,
          backgroundSize: "cover",
          transition: "background-position 0.1s ease-out",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "36%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black",
            fontSize: "4rem",
            fontWeight: "600",
            textAlign: "center",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          Rent Robo
        </div>
        <div
          style={{
            position: "absolute",
            top: "41%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black",
            fontSize: "1.5rem",
            fontWeight: "normal",
            textAlign: "center",
            marginTop: "20px",
            textShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          Finding Affordable Housing Made Simple
        </div>
      </div>
      <Container sx={{ py: 6, maxWidth: "90%", pl: 0 }}>
        {/* Title aligned to the left */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "left",
            ml: 17,
            fontSize: "2.5rem",
          }}
        >
          What We Do
        </Typography>

        {/* Layout: Image on the Left, Text on the Right */}
        <Grid container spacing={4} alignItems="left">
          {/* Image on the Left */}
          <Grid item xs={12} md={6}>
            <img
              src={homeImage}
              alt="What We Do"
              style={{
                width: "60%",
                height: "auto",
                borderRadius: "10px",
              }}
            />
          </Grid>

          {/* Text on the Right */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                margin: "0px !important",
                textAlign: "justify",
                lineHeight: "1.8",
                mt: 5,
                mr: 6,
              }}
            >
              At Rent Robo, we simplify the moving experience by providing a
              seamless platform to find rental properties suited to your needs.
              Our AI-powered recommendations help match you with the best rental
              options based on your preferences, budget, and location
              requirements. Whether you're looking for a cozy apartment, a
              family home, or a shared space, we make renting easier, faster,
              and stress-free.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ textAlign: "start", maxWidth: "100vw !important" }}>
        <Grid container spacing={4}>
          {loading
            ? [...Array(9)].map((_, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Skeleton
                        variant="text"
                        sx={{ width: "80%", height: 17, mb: 1.1 }}
                      />
                      <Skeleton
                        variant="text"
                        sx={{ width: "60%", height: 17, mb: 1.1 }}
                      />
                      <Skeleton
                        variant="text"
                        sx={{ width: "50%", height: 17, mb: 1.05 }}
                      />
                      <Skeleton
                        variant="text"
                        sx={{ width: "70%", height: 17, mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        sx={{ width: "40%", height: 17, mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        sx={{ width: "90%", height: 17, mb: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : data.map((item, index) => (
                <Fade in={showData} timeout={300} key={index}>
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{item.Address}</Typography>
                        <Typography>Area: {item["Area Name"]}</Typography>
                        <Typography>Bedrooms: {item.Bed}</Typography>
                        <Typography>Bathrooms: {item.Bath}</Typography>
                        <Typography>Rent: ${item.Rent}</Typography>
                        <Typography>
                          Crime Rate: {item["Overall CrimeRate"]}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Fade>
              ))}
        </Grid>
        <Stack spacing={2} sx={{ mt: 4, display: "flex", alignItems: "center" }}></Stack>
      </Container>
      <Footer />
      <FloatingChatbot ref={chatbotRef} onChatComplete={handleChatComplete} />
    </React.Fragment>
  );
};

export default Services;
