import React, {
  useState,
  useEffect,
  FormEvent,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Aibot from '../../assets/AI_bot.avif';

// ----- Typing Indicator Styles & Component -----
const typingIndicatorContainer: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 50,
  height: 20,
};

const dotCommon: React.CSSProperties = {
  display: 'inline-block',
  width: 6,
  height: 6,
  margin: '0 2px',
  backgroundColor: '#888',
  borderRadius: '50%',
  animation: 'dotsBounce 1.4s infinite ease-in-out both',
};

const dot1: React.CSSProperties = { ...dotCommon, animationDelay: '0.0s' };
const dot2: React.CSSProperties = { ...dotCommon, animationDelay: '0.2s' };
const dot3: React.CSSProperties = { ...dotCommon, animationDelay: '0.4s' };

const TypingIndicator: React.FC = () => (
  <div style={typingIndicatorContainer}>
    <span style={dot1}></span>
    <span style={dot2}></span>
    <span style={dot3}></span>
  </div>
);

// Inject keyframes (or add these in a CSS file)
const bounceKeyframes = `
@keyframes dotsBounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
`;
// ----- End of Typing Indicator -----

// The data shape returned by the chatbot.
export interface ChatData {
  location: string;
  rent: number;
  bed: number;
  bath: number;
  preferredNeighbourhood: string;
  surveyResults: {
    "Lower Rent": number | null;
    "Neighbourhood preference": number | null;
    "Commute convenience": number | null;
  };
}

export interface FloatingChatbotHandle {
  openChatWindow: () => void;
}

interface FloatingChatbotProps {
  onChatComplete?: (data: FinalChatOutput) => void;
}

interface Message {
  sender: 'bot' | 'user';
  text: React.ReactNode; // Allows string or a React node (like TypingIndicator)
}

interface TypewriterProps {
  text: string;
  onComplete?: () => void;
  speed?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, onComplete, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, onComplete, speed]);
  return <div style={{ whiteSpace: 'pre-wrap' }}>{displayedText}</div>;
};

// Helpers to convert string values to numbers.
const convertApartmentType = (apt: string): number => {
  if (apt.toLowerCase() === 'studio') return 0;
  const match = apt.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

const convertBathCount = (bath: string): number => {
  const match = bath.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

const convertRent = (rent: string): number => parseFloat(rent);

// Initial state for chat data.
const initialChatData = {
  location: '',
  rent: '',
  apartmentType: '',
  bathCount: '',
  preferredNeighbourhood: '',
  surveyResults: {
    "Lower Rent": null,
    "Neighbourhood preference": null,
    "Commute convenience": null,
  },
};

// Final output interface (for recommendation data)
export interface FinalChatOutput {
  current_living_conditions: [string, string, number, number, number];
  preference_of_future_house: {
    Rent: number | null;
    Location: number | null;
    Safety: number | null;
  };
}

const FloatingChatbot = forwardRef<FloatingChatbotHandle, FloatingChatbotProps>(
  ({ onChatComplete }, ref) => {
    // Whether the chat modal is open.
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    // Whether the conversation is complete (survey submitted).
    const [conversationComplete, setConversationComplete] = useState<boolean>(false);

    // Conversation steps:
    // 0: initial greeting – waiting for user's text input.
    // 1: ask for location.
    // 2: ask for current rent.
    // 3: ask for apartment type (buttons).
    // 4: ask for number of bathrooms (buttons).
    // 5: ask for preferred neighbourhood (buttons).
    // 6: show survey UI.
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>('');
    const [showButtons, setShowButtons] = useState<boolean>(false);

    // Chat data stored as strings.
    const [chatData, setChatData] = useState(initialChatData);

    // For smooth scrolling.
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, currentStep]);

    // Minimal bounce for the floating icon, stops on hover.
    const [iconHovered, setIconHovered] = useState(false);
    const bounceVariants = {
      bounce: { y: [0, -5, 0], transition: { duration: 1, repeat: Infinity } },
      still: { y: 0 },
    };

    // Expose openChatWindow() to the parent via ref.
    useImperativeHandle(ref, () => ({
      openChatWindow: () => {
        openChat();
      },
    }));

    // Open chat window; if previous conversation was complete, reset all data.
    const openChat = () => {
      if (conversationComplete) {
        setChatData(initialChatData);
        setMessages([]);
        setCurrentStep(0);
        setConversationComplete(false);
      }
      setIsChatOpen(true);
    };

    // The initial greeting.
    const initialBotText =
      'Hi, welcome to RentRobo! We are here to help you ease your house hunting. How can I help you today?';

    // Simulate bot response with a 1‑second typing indicator.
    const simulateBotResponse = (response: string, nextStep: number) => {
      setMessages((prev) => [...prev, { sender: 'bot', text: <TypingIndicator /> }]);
      setTimeout(() => {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { sender: 'bot', text: response };
          return newMessages;
        });
        setCurrentStep(nextStep);
        if ([3, 4, 5].includes(nextStep)) {
          setShowButtons(true);
        }
      }, 1000);
    };

    // Handle text input (for steps 0,1,2).
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!inputValue.trim()) return;
      setMessages((prev) => [...prev, { sender: 'user', text: inputValue }]);
      if (currentStep === 0) {
        simulateBotResponse('Sure! Where do you currently stay?', 1);
      } else if (currentStep === 1) {
        setChatData((prev) => ({ ...prev, location: inputValue }));
        simulateBotResponse('What is your current rent?', 2);
      } else if (currentStep === 2) {
        setChatData((prev) => ({ ...prev, rent: inputValue }));
        simulateBotResponse('What is your current apartment type?', 3);
      }
      setInputValue('');
    };

    // Handle button selections (steps 3,4,5).
    const handleApartmentTypeSelection = (option: string) => {
      setShowButtons(false);
      setMessages((prev) => [...prev, { sender: 'user', text: option }]);
      setChatData((prev) => ({ ...prev, apartmentType: option }));
      simulateBotResponse('How many bathrooms does your current stay have?', 4);
    };

    const handleBathroomSelection = (option: string) => {
      setShowButtons(false);
      setMessages((prev) => [...prev, { sender: 'user', text: option }]);
      setChatData((prev) => ({ ...prev, bathCount: option }));
      simulateBotResponse('Choose the preferred neighbourhood/ locality', 5);
    };

    const handleNeighbourhoodSelection = (option: string) => {
      setShowButtons(false);
      setMessages((prev) => [...prev, { sender: 'user', text: option }]);
      setChatData((prev) => ({ ...prev, preferredNeighbourhood: option }));
      simulateBotResponse(
        "Thank you for your patience! You're almost done narrowing down the options for your next home. There's only one last question:",
        -1
      );
      setTimeout(() => {
        simulateBotResponse(
          'Please rate your preference on the following aspects: Rent, Neighbourhood preference, and Commute convenience.',
          6
        );
      }, 1200);
    };

    // Survey handling.
    const handleSurveyChange = (aspect: string, value: number) => {
      setChatData((prev) => ({
        ...prev,
        surveyResults: { ...prev.surveyResults, [aspect]: value },
      }));
    };

    const isOptionDisabled = (currentAspect: string, value: number) => {
      return Object.keys(chatData.surveyResults).some(
        (aspect) =>
          aspect !== currentAspect &&
          chatData.surveyResults[aspect as keyof typeof chatData.surveyResults] === value
      );
    };

    const handleResetSurvey = () => {
      setChatData((prev) => ({
        ...prev,
        surveyResults: {
          "Lower Rent": null,
          'Neighbourhood preference': null,
          'Commute convenience': null,
        },
      }));
    };

    const handleSurveySubmit = () => {
      const allSelected = Object.values(chatData.surveyResults).every((v) => v !== null);
      if (!allSelected) return;

      const finalOutput: FinalChatOutput = {
        current_living_conditions: [
          chatData.location,                           // Address (current location)
          chatData.preferredNeighbourhood,             // Preferred location (from neighbourhood selection)
          convertRent(chatData.rent),                  // Rent as number
          convertApartmentType(chatData.apartmentType),// Bed count as number
          convertBathCount(chatData.bathCount)         // Bath count as number
        ],
        preference_of_future_house: {
          Rent: chatData.surveyResults["Lower Rent"],
          // "Commute convenience" is renamed to "Location"
          Location: chatData.surveyResults["Commute convenience"],
          // "Neighbourhood preference" is renamed to "Safety"
          Safety: chatData.surveyResults["Neighbourhood preference"]
        }
      };

      setTimeout(() => {
        setIsChatOpen(false);
        setConversationComplete(true);
        if (onChatComplete) {
          onChatComplete(finalOutput);
        }
      }, 500);
    };

    // Header buttons: Minimize & Close.
    const handleMinimize = () => {
      setIsChatOpen(false);
    };

    const handleClose = () => {
      setChatData(initialChatData);
      setMessages([]);
      setCurrentStep(0);
      setConversationComplete(true);
      setIsChatOpen(false);
    };

    // Render bot messages with an avatar
    const renderMessage = (msg: Message, index: number) => {
      if (msg.sender === 'bot') {
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              margin: '5px 0',
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            {/* Bot Avatar */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#007bff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                marginRight: 8,
              }}
            >
              R
            </div>
            <div
              style={{
                padding: '8px 12px',
                borderRadius: 16,
                background: '#f1f0f0',
                color: '#000',
                maxWidth: '75%',
              }}
            >
              {msg.text}
            </div>
          </motion.div>
        );
      } else {
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              margin: '5px 0',
              textAlign: 'right',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: 16,
                background: '#007bff',
                color: '#fff',
                maxWidth: '75%',
              }}
            >
              {msg.text}
            </div>
          </motion.div>
        );
      }
    };

    return (
      <>
        {/* Inject keyframes */}
        <style>{bounceKeyframes}</style>

        {/* Floating Icon: shown when chat modal is NOT open and conversation not complete */}
        {!isChatOpen && !conversationComplete && (
          <motion.div
          style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000, cursor: 'pointer' }}
          onClick={openChat}
          onHoverStart={() => setIconHovered(true)}
          onHoverEnd={() => setIconHovered(false)}
        >
          {/* Container for the bot and its shadow */}
          <div style={{ position: 'relative', width: 80, height: 80 }}>
            {/* Floating Bot Avatar */}
            <motion.div
              variants={{
                bounce: { y: [0, -5, 0], transition: { duration: 1, repeat: Infinity } },
                still: { y: 0 },
              }}
              animate={iconHovered ? 'still' : 'bounce'}
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                overflow: 'hidden',
                // border: '1.5px solid #09295c',
                background: '#007bff',
              }}
            >
              <img
                src={Aibot}
                alt="RentRobo Avatar"
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              />
            </motion.div>
            {/* Shadow beneath the avatar */}
            <motion.div
              variants={{
                bounce: {
                  // When the bot bounces upward, the shadow shrinks and becomes lighter.
                  scale: [1, 0.8, 1],
                  opacity: [0.5, 0.3, 0.5],
                  transition: { duration: 1, repeat: Infinity },
                },
                still: { scale: 1, opacity: 0.5 },
              }}
              animate={iconHovered ? 'still' : 'bounce'}
              style={{
                position: 'absolute',
                bottom: -15,
                left: '15%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 20,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '50%',
                filter: 'blur(2px)',
              }}
            />
          </div>
        </motion.div>
        
        )}

        {/* Chat Modal */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              key="chatModal"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: 100, transition: { duration: 0.5 } }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'fixed',
                bottom: 80,
                right: 20,
                width: 350,
                maxHeight: '70vh',
                background: '#fff',
                borderRadius: 8,
                // boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                zIndex: 1000,
              }}
            >
              {/* Header with Minimize and Close buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '4px' }}>
                <button
                  onClick={handleMinimize}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: 'none',
                    background: '#d0d0d0',
                    cursor: 'pointer',
                    marginRight: 6,
                    fontSize: 20,
                  }}
                  title="Minimize"
                >
                  –
                </button>
                <button
                  onClick={handleClose}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: 'none',
                    background: '#d0d0d0',
                    cursor: 'pointer',
                    fontSize: 20,
                  }}
                  title="Close"
                >
                  ×
                </button>
              </div>

              {/* Message Container */}
              <div style={{ flex: 1, padding: 10, overflowY: 'auto' }}>
                {messages.map((msg, index) => renderMessage(msg, index))}
                <div ref={messagesEndRef} />
                {messages.length === 0 && (
                  <Typewriter
                    text={initialBotText}
                    onComplete={() => {
                      setMessages((prev) => [
                        ...prev,
                        { sender: 'bot', text: initialBotText },
                      ]);
                      setCurrentStep(0);
                    }}
                  />
                )}
              </div>

              {/* Text Input (Steps 0,1,2) */}
              {(currentStep === 0 || currentStep === 1 || currentStep === 2) && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', borderTop: '1px solid #ccc' }}>
                  <input
                    type={currentStep === 2 ? 'number' : 'text'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ flex: 1, padding: 10, border: 'none', outline: 'none' }}
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '0 10px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    Send
                  </button>
                </form>
              )}

              {/* Button Options (Steps 3,4,5) */}
              {currentStep === 3 && (
                <div style={{ padding: 10, borderTop: '1px solid #ccc' }}>
                  <div style={{ marginBottom: 10 }}>Select your current apartment type:</div>
                  <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    {['Studio', '1 bed', '2 bed', '3 bed', '4 bed', '5 bed or more'].map((option) => (
                      <AnimatePresence key={option}>
                        {showButtons && (
                          <motion.button
                            onClick={() => handleApartmentTypeSelection(option)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              border: '1px solid #007bff',
                              borderRadius: '4px',
                              padding: '8px 12px',
                              background: 'transparent',
                              cursor: 'pointer',
                              margin: '4px',
                            }}
                          >
                            {option}
                          </motion.button>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>
                </div>
              )}
              {currentStep === 4 && (
                <div style={{ padding: 10, borderTop: '1px solid #ccc' }}>
                  <div style={{ marginBottom: 10 }}>Select number of bathrooms in your current stay:</div>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {['1 bath', '2 bath', '3 or more'].map((option) => (
                      <AnimatePresence key={option}>
                        {showButtons && (
                          <motion.button
                            onClick={() => handleBathroomSelection(option)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              border: '1px solid #007bff',
                              borderRadius: '4px',
                              padding: '8px 12px',
                              background: 'transparent',
                              cursor: 'pointer',
                              margin: '4px',
                            }}
                          >
                            {option}
                          </motion.button>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>
                </div>
              )}
              {currentStep === 5 && (
                <div style={{ padding: 10, borderTop: '1px solid #ccc' }}>
                  <div style={{ marginBottom: 10 }}>Choose the preferred neighbourhood/ locality:</div>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {['Northeastern University', 'Boston University', 'Boston College'].map((option) => (
                      <AnimatePresence key={option}>
                        {showButtons && (
                          <motion.button
                            onClick={() => handleNeighbourhoodSelection(option)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              border: '1px solid #007bff',
                              borderRadius: '4px',
                              padding: '8px 12px',
                              background: 'transparent',
                              cursor: 'pointer',
                              margin: '4px',
                            }}
                          >
                            {option}
                          </motion.button>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>
                </div>
              )}
              {currentStep === 6 && (
                <div style={{ padding: 10, borderTop: '1px solid #ccc' }}>
                  <div style={{ marginBottom: 10, textAlign: 'center', fontWeight: 'bold' }}>
                    Please select your preferences:
                  </div>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      marginBottom: 10,
                      border: '2px solid #ccc',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <thead>
                      <tr>
                        <th style={{ border: '2px solid #ccc', padding: '8px', background: '#f7f7f7' }}></th>
                        <th style={{ border: '2px solid #ccc', padding: '8px', background: '#f7f7f7' }}>High</th>
                        <th style={{ border: '2px solid #ccc', padding: '8px', background: '#f7f7f7' }}>Medium</th>
                        <th style={{ border: '2px solid #ccc', padding: '8px', background: '#f7f7f7' }}>Low</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(chatData.surveyResults).map((aspect) => (
                        <tr key={aspect}>
                          <td style={{ border: '2px solid #ccc', padding: '8px', textAlign: 'left' }}>
                            {aspect}
                          </td>
                          {[1, 2, 3].map((value) => (
                            <td
                              key={value}
                              style={{ border: '2px solid #ccc', padding: '8px', textAlign: 'center' }}
                            >
                              <input
                                type="radio"
                                name={aspect}
                                value={value}
                                checked={
                                  chatData.surveyResults[aspect as keyof typeof chatData.surveyResults] === value
                                }
                                disabled={isOptionDisabled(aspect, value)}
                                onChange={() => handleSurveyChange(aspect, value)}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      onClick={handleResetSurvey}
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #007bff',
                        background: '#e8e8e8',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                    >
                      Reset Selections
                    </button>
                    <button
                      onClick={handleSurveySubmit}
                      disabled={!Object.values(chatData.surveyResults).every((v) => v !== null)}
                      style={{
                        padding: '8px 12px',
                        border: 'none',
                        background: '#007bff',
                        color: '#fff',
                        cursor: Object.values(chatData.surveyResults).every((v) => v !== null)
                          ? 'pointer'
                          : 'not-allowed',
                        borderRadius: '4px',
                      }}
                    >
                      Submit Survey
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

export default FloatingChatbot;
