import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function RestaurantBranchSelection() {
  const { state } = useLocation();
  const { brands } = state || { brands: [] };
  const navigate = useNavigate();
  const theme = useTheme();

  const [branches, setBranches] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Group branches by brand
  const branchesByBrand = brands.reduce((acc, brand) => {
    acc[brand] = branches.filter(branch => branch.name === brand);
    return acc;
  }, {});

  useEffect(() => {
    if (!brands.length) {
      // Redirect back if no brands selected
      navigate("/", { replace: true });
      return;
    }
    
    setLoading(true);
    fetch("https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/interactive/restaurant-branches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand_names: brands })
    })
      .then((r) => r.json())
      .then((data) => {
        setBranches(data);
        // Set default active tab to the first brand
        setActiveTab(0);
      })
      .catch(error => {
        console.error("Failed to fetch branches:", error);
        // Show fallback data in development
        if (process.env.NODE_ENV === "development") {
          const mockBranches = [];
          brands.forEach(brand => {
            for (let i = 1; i <= 8; i++) {
              mockBranches.push({
                restaurant_id: `${brand.toLowerCase().replace(/\s/g, '-')}-${i}`,
                name: brand,
                location_name: `${brand} - ${['Downtown', 'Uptown', 'Westside', 'Eastside', 'North', 'South', 'Mall', 'Plaza'][i-1]}`,
                address: `${Math.floor(Math.random() * 999) + 1} Main St, City ${i}`
              });
            }
          });
          setBranches(mockBranches);
        }
      })
      .finally(() => setLoading(false));
  }, [brands, navigate]);

  const toggle = (id) => {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  };

  const next = () => {
    if (selected.length !== 3) {
      alert("Please pick exactly 3 branches");
      return;
    }
    navigate('/food-selection', {
      state: {
        email: localStorage.getItem('userEmail'),
        branch_ids: selected
      }
    });
  };

  // Filter branches based on search term
  const getFilteredBranches = (brandName) => {
    const brandBranches = branchesByBrand[brandName] || [];
    if (!searchTerm) return brandBranches;
    
    return brandBranches.filter(branch => 
      branch.location_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (branch.address && branch.address.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ backgroundColor: "#f9f9f9" }}
      >
        <CircularProgress size={60} sx={{ color: "#4CAF50" }} />
        <Typography variant="h6" color="textSecondary" mt={3}>
          Loading restaurant branches...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4} textAlign="center">
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: "linear-gradient(45deg, #4CAF50, #2196F3)",
            backgroundClip: "text",
            color: "transparent",
            WebkitBackgroundClip: "text",
            textShadow: "0px 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          Select Restaurant Branches
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <PlaceIcon sx={{ mr: 1, color: "#4CAF50" }} />
          <Typography variant="h6" color="textSecondary">
            Choose <strong>exactly 3 branches</strong> to continue
          </Typography>
        </Box>
        
        <Box mb={1}>
          <Chip 
            label={`${selected.length}/3 selected`} 
            color={selected.length === 3 ? "success" : "default"}
            variant={selected.length === 3 ? "filled" : "outlined"}
            icon={selected.length === 3 ? <CheckCircleIcon /> : undefined}
            sx={{ fontSize: '1rem', px: 1 }}
          />
        </Box>
      </Box>

      {/* Selected branches summary */}
      {selected.length > 0 && (
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            mb: 3, 
            borderRadius: 2,
            backgroundColor: 'rgba(76, 175, 80, 0.06)',
            border: '1px solid rgba(76, 175, 80, 0.2)'
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Selected Branches:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {selected.map(branchId => {
              const branch = branches.find(b => b.restaurant_id === branchId);
              return branch ? (
                <Chip
                  key={branch.restaurant_id}
                  label={`${branch.name} - ${branch.location_name}`}
                  onDelete={() => toggle(branch.restaurant_id)}
                  color="primary"
                  sx={{ borderRadius: '8px' }}
                />
              ) : null;
            })}
          </Box>
        </Paper>
      )}

      {/* Search input */}
      <Box mb={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControl fullWidth variant="outlined" size="medium">
          <OutlinedInput
            placeholder="Search by location or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            endAdornment={
              searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setSearchTerm('')}
                    size="small"
                  >
                    ×
                  </IconButton>
                </InputAdornment>
              )
            }
            sx={{
              borderRadius: 2,
              backgroundColor: '#fafafa',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              }
            }}
          />
        </FormControl>
        <IconButton sx={{ ml: 1 }}>
          <FilterListIcon />
        </IconButton>
      </Box>

      {/* Tabs for brand selection */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              minWidth: 120,
              fontWeight: 600,
            }
          }}
        >
          {brands.map((brand, index) => (
            <Tab 
              key={brand} 
              label={brand} 
              icon={<RestaurantIcon />}
              iconPosition="start"
              sx={{
                opacity: activeTab === index ? 1 : 0.7,
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </Tabs>

        {/* Branch list for current tab */}
        {brands.map((brand, index) => (
          <Box 
            key={brand}
            role="tabpanel"
            hidden={activeTab !== index}
            sx={{ maxHeight: '60vh', overflow: 'auto' }}
          >
            {activeTab === index && (
              <List sx={{ padding: 0 }}>
                {getFilteredBranches(brand).length === 0 ? (
                  <ListItem>
                    <Box textAlign="center" width="100%" py={4}>
                      <Typography variant="subtitle1" color="text.secondary">
                        No branches found for this search.
                      </Typography>
                    </Box>
                  </ListItem>
                ) : (
                  getFilteredBranches(brand).map((branch) => {
                    const isSelected = selected.includes(branch.restaurant_id);
                    
                    return (
                      <ListItem 
                        key={branch.restaurant_id} 
                        disablePadding
                        divider
                      >
                        <ListItemButton
                          onClick={() => toggle(branch.restaurant_id)}
                          sx={{
                            py: 2,
                            backgroundColor: isSelected ? 'rgba(76, 175, 80, 0.08)' : 'transparent',
                            '&:hover': {
                              backgroundColor: isSelected ? 'rgba(76, 175, 80, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                            },
                          }}
                        >
                          <ListItemIcon>
                            {isSelected ? (
                              <CheckCircleIcon color="primary" />
                            ) : (
                              <RadioButtonUncheckedIcon color="action" />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" fontWeight={isSelected ? 700 : 500}>
                                {branch.location_name}
                              </Typography>
                            }
                            secondary={
                              branch.address ? (
                                <Box display="flex" alignItems="center" mt={0.5}>
                                  <PlaceIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {branch.address}
                                  </Typography>
                                </Box>
                              ) : null
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })
                )}
              </List>
            )}
          </Box>
        ))}
      </Paper>

      {/* Next button */}
      <Box
        mt={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "sticky",
          bottom: 20,
          zIndex: 10,
        }}
      >
        <Button
          variant="contained"
          size="large"
          disabled={selected.length !== 3}
          onClick={next}
          endIcon={<ArrowForwardIcon />}
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: 3,
            fontSize: "1.1rem",
            fontWeight: "bold",
            textTransform: "none",
            backgroundColor: selected.length === 3 ? "#4CAF50" : "#e0e0e0",
            boxShadow: selected.length === 3 ? "0 4px 14px rgba(76, 175, 80, 0.4)" : "none",
            "&:hover": {
              backgroundColor: selected.length === 3 ? "#43A047" : "#e0e0e0",
              transform: selected.length === 3 ? "translateY(-2px)" : "none",
              boxShadow: selected.length === 3 ? "0 6px 20px rgba(76, 175, 80, 0.6)" : "none",
            },
            transition: "all 0.3s ease",
          }}
        >
          Continue to Food Selection
        </Button>
      </Box>
    </Container>
  );
}