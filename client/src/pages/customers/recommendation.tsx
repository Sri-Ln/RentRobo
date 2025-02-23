import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from "../../components/navbar/index.tsx";
import axios from 'axios';
import GoogleMapComponent, { Recommendation } from '../../components/googleMaps';
import FloatingChatbot, { FloatingChatbotHandle } from '../../components/chatbot';
import routes from '../../constants/routes.json';

export interface FinalChatOutput {
    current_living_conditions: [string, string, number, number, number];
    preference_of_future_house: {
        Rent: number | null;
        Location: number | null;
        Safety: number | null;
    };
}

const RecommendationPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [chatbotData, setChatbotData] = useState<FinalChatOutput | undefined>(location.state?.chatbotData);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
    const [showChatbot, setShowChatbot] = useState<boolean>(false);
    const chatbotRef = useRef<FloatingChatbotHandle>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleChatComplete = (data: FinalChatOutput) => {
        setChatbotData(data);
        console.log("Chatbot data:", data);
        setShowChatbot(false);
        if (data) {
            navigate(routes.RECOMMENDATION, { state: { chatbotData: data } });
        }
    };

    // Use chatbot data to fetch recommendations.
    useEffect(() => {
        if (chatbotData) {
            axios
                .post('http://127.0.0.1:5000/recommend', chatbotData)
                .then(response => {
                    console.log("API Response:", response.data);
                    setRecommendations(response.data.recommendations);
                })
                .catch(error => {
                    console.error("Error fetching recommendations:", error);
                });
        }
    }, [chatbotData]);

    // Global click listener to clear selection if click is outside container.
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setSelectedRecommendation(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <NavBar onHelpClick={() => chatbotRef.current?.openChatWindow()} />
            {/* Title between navbar and container */}
            <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '10px' }}>
                <h2>Recommended Places</h2>
            </div>
            {/* Outer container: 80% width, 80vh height, with margin from navbar */}
            <div
                ref={containerRef}
                style={{
                    margin: '0 auto',
                    width: '80%',
                    height: '80vh',
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    border: '1px solid #ccc',
                }}
            >
                {/* Left Column: Map (50% width) */}
                <div style={{ flex: '0 0 50%', height: '100%' }}>
                    <GoogleMapComponent
                        recommendations={recommendations}
                        selectedMarker={selectedRecommendation}
                    />
                </div>
                {/* Right Column: Cards in a 2-column grid */}
                <div
                    style={{
                        flex: '0 0 50%',
                        height: '100%',
                        overflowY: 'auto',
                        padding: '10px',
                        background: '#f8f8f8',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '10px',
                    }}
                >
                    {recommendations.map((rec, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedRecommendation({ ...rec })}
                            style={{
                                height: '180px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                padding: '10px',
                                backgroundColor:
                                    selectedRecommendation && selectedRecommendation.Address === rec.Address
                                        ? '#e0f7fa'
                                        : '#fff',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                wordBreak: 'break-word',
                            }}
                        >
                            <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
                                <h4
                                    style={{
                                        margin: '15px 0 5px 0',
                                        height: '80px',
                                        fontSize: '1em',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {rec.Address}
                                </h4>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <p style={{ margin: 0, fontSize: '0.9em' }}>
                                        <strong>Bedrooms:</strong> {rec.Bed}
                                    </p>
                                    <p style={{ margin: 0, fontSize: '0.9em' }}>
                                        <strong>Bathrooms:</strong> {rec.Bath}
                                    </p>
                                </div>
                            </div>

                            <div style={{ flexShrink: 0, textAlign: 'right', fontWeight: 'bold' }}>
                                <p style={{ margin: 0 }}>Rent: ${rec.Rent}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <FloatingChatbot ref={chatbotRef} onChatComplete={handleChatComplete} />
        </>
    );
};

export default RecommendationPage;
