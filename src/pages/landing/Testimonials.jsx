// components/Testimonials.jsx - With Four Testimonials
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Rating,
  Stack,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Ops Lead, Metro Logistics",
    content:
      "AMS has fundamentally transformed our maintenance efficiency. We've seen a 30% reduction in downtime since launch.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Anita Sharma",
    role: "Facility Head, Apex Corp",
    content:
      "The mobile interface is flawless. Our field staff adopted it instantly—no training required. Total game changer.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Vikram Mehta",
    role: "CTO, Innovate Solutions",
    content:
      "The predictive analytics feature has saved us over ₹15L in maintenance costs. The ROI has been exceptional.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Priya Nair",
    role: "Operations Director, Global Industries",
    content:
      "Best asset management platform we've used. The team loves the intuitive interface and real-time reporting capabilities.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

const Testimonials = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        bgcolor: "#fafbfc",
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, sm: 6, md: 7 } }}>
          <Typography
            variant="overline"
            sx={{
              color: "#1a4a6b",
              fontWeight: 600,
              fontSize: { xs: "0.6rem", sm: "0.65rem" },
              letterSpacing: "0.1em",
              mb: 0.75,
              display: "block",
            }}
          >
            CLIENT TESTIMONIALS
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem", lg: "2.2rem" },
              fontWeight: 700,
              mb: 1,
              letterSpacing: "-0.02em",
              color: "#0f172a",
            }}
          >
            Trusted by Industry Leaders
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              fontSize: { xs: "0.7rem", sm: "0.75rem" },
              maxWidth: "500px",
              mx: "auto",
            }}
          >
            Hear what our clients say about their experience with AMS
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2.5, sm: 3, md: 4 }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3, md: 3.5 },
                  borderRadius: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                  border: "1px solid",
                  borderColor: alpha("#0f172a", 0.06),
                  boxShadow: "0 4px 20px -2px rgba(0,0,0,0.03)",
                  height: "100%",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px -12px rgba(0,0,0,0.1)",
                    borderColor: alpha("#1a4a6b", 0.15),
                  },
                }}
              >
                {/* Quote Icon */}
                <Box sx={{ mb: { xs: 1.5, sm: 2, md: 2.5 } }}>
                  <FormatQuoteIcon
                    sx={{
                      fontSize: { xs: 24, sm: 28, md: 32 },
                      color: alpha("#1a4a6b", 0.2),
                      transform: "rotate(180deg)",
                    }}
                  />
                </Box>

                {/* Rating */}
                <Rating
                  value={testimonial.rating}
                  readOnly
                  icon={<StarIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />}
                  sx={{ mb: { xs: 1.5, sm: 2, md: 2.5 }, color: "#f59e0b" }}
                />

                {/* Content */}
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                    fontWeight: 500,
                    lineHeight: 1.5,
                    mb: { xs: 2.5, sm: 3, md: 3.5 },
                    color: "#334155",
                    fontStyle: "italic",
                    flex: 1,
                  }}
                >
                  "{testimonial.content}"
                </Typography>

                {/* Author */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar
                    src={testimonial.avatar}
                    sx={{
                      width: { xs: 44, sm: 48, md: 52 },
                      height: { xs: 44, sm: 48, md: 52 },
                      borderRadius: "0.875rem",
                      border: "1px solid",
                      borderColor: alpha("#0f172a", 0.08),
                      bgcolor: "#f1f5f9",
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{
                        fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                        color: "#0f172a",
                        mb: 0.25,
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#1a4a6b",
                        fontWeight: 600,
                        fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" },
                        letterSpacing: "0.03em",
                        display: "block",
                      }}
                    >
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Trust Indicators */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 4 }}
          justifyContent="center"
          alignItems="center"
          sx={{
            mt: { xs: 5, sm: 6, md: 7 },
            pt: { xs: 3, sm: 4 },
            borderTop: "1px solid",
            borderColor: alpha("#0f172a", 0.06),
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ fontSize: { xs: "0.95rem", sm: "1rem" }, color: "#1a4a6b" }}
            >
              500+
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" }, color: "#64748b" }}
            >
              Happy Clients
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ fontSize: { xs: "0.95rem", sm: "1rem" }, color: "#1a4a6b" }}
            >
              98%
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" }, color: "#64748b" }}
            >
              Satisfaction Rate
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ fontSize: { xs: "0.95rem", sm: "1rem" }, color: "#1a4a6b" }}
            >
              4.9
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" }, color: "#64748b" }}
            >
              Average Rating
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ fontSize: { xs: "0.95rem", sm: "1rem" }, color: "#1a4a6b" }}
            >
              30%
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" }, color: "#64748b" }}
            >
              Avg. Efficiency Gain
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Testimonials;