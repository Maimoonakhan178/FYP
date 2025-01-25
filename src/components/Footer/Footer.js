import React, { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from './Animation.json';
import './Footer.css';
import WriteReview from '../Header/writeareview'; // Adjust path
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Tooltip,
  Stack,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // Modal Styles
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    overflow: 'hidden',
  };

  const modalHeaderStyle = {
    backgroundColor: '#3f51b5',
    color: 'white',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const modalBodyStyle = {
    padding: '24px',
  };

  // Open Modal
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Handle Tab Changes
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Foodie</h4>
          <ul>
            <li>
              <Tooltip title="Learn more about us!" arrow>
                <span
                  onClick={() => openModal('about')}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  <InfoOutlinedIcon /> About Us
                </span>
              </Tooltip>
            </li>
            <li>
              <Tooltip title="Join our team!" arrow>
                <span
                  onClick={() => openModal('careers')}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  <WorkOutlineIcon /> Careers
                </span>
              </Tooltip>
            </li>
            <li>
              <Tooltip title="We’d love to hear from you!" arrow>
                <span
                  onClick={() => openModal('contact')}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  <ContactMailIcon /> Contact Us
                </span>
              </Tooltip>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li>
              <span
                onClick={() => openModal('review')}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                <HelpOutlineIcon /> Write a Review
              </span>
            </li>
            <li>
              <span
                onClick={() => window.location.href = '/blog'}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                <HelpOutlineIcon /> Blog
              </span>
            </li>
            <li>
              <span
                onClick={() => openModal('help')}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                <HelpOutlineIcon /> Help Center
              </span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <div className="footer-animation">
            <Lottie options={defaultOptions} height={200} width={100} />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <p>© 2024 Foodie LLC All rights reserved.</p>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social">
          <IconButton href="https://facebook.com" target="_blank">
            <FacebookIcon color="primary" />
          </IconButton>
          <IconButton href="https://twitter.com" target="_blank">
            <TwitterIcon color="primary" />
          </IconButton>
          <IconButton href="https://instagram.com" target="_blank">
            <InstagramIcon color="primary" />
          </IconButton>
          <IconButton href="https://linkedin.com" target="_blank">
            <LinkedInIcon color="primary" />
          </IconButton>
        </div>
      </div>

      {/* MUI Modal */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={modalStyle}>
          <Box sx={modalHeaderStyle}>
            <Typography variant="h6">
              {modalContent === 'about' && 'About Us'}
              {modalContent === 'careers' && 'Careers'}
              {modalContent === 'contact' && 'Contact Us'}
              {modalContent === 'review' && 'Write a Review'}
              {modalContent === 'help' && 'Help Center'}
            </Typography>
            <IconButton onClick={closeModal}>
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>

          <Box sx={modalBodyStyle}>
            {modalContent === 'about' && (
              <Typography>
                Foodie is your go-to platform for discovering great food and
                sharing your culinary experiences. We’re passionate about
                bringing people closer to food they love.
              </Typography>
            )}
            {modalContent === 'careers' && (
              <Typography>
                Join the Foodie team! We offer exciting opportunities in tech,
                marketing, and operations. Let's grow together!
              </Typography>
            )}
            {modalContent === 'contact' && (
              <Stack spacing={2}>
                <Typography>
                  Get in touch with us using the details below:
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EmailIcon color="primary" />
                  <Typography>support@foodie.com</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocalPhoneIcon color="primary" />
                  <Typography>(123) 456-7890</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOnIcon color="primary" />
                  <Typography>123 Foodie Street, Foodie City, FC 12345</Typography>
                </Stack>
              </Stack>
            )}
            {modalContent === 'review' && (
              <WriteReview
                onSubmitReview={(data) => {
                  alert('Review submitted successfully!');
                  console.log(data);
                  closeModal();
                }}
              />
            )}
            {modalContent === 'help' && (
              <>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="FAQs" />
                  <Tab label="Support" />
                  <Tab label="Feedback" />
                </Tabs>
                <Box sx={{ mt: 2 }}>
                  {tabValue === 0 && <Typography>Here are our FAQs...</Typography>}
                  {tabValue === 1 && <Typography>Contact Support here...</Typography>}
                  {tabValue === 2 && <Typography>Share your Feedback here...</Typography>}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </footer>
  );
};

export default Footer;
