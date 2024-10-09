import { useState, useEffect } from "react";
import { Card, Grid, useMediaQuery } from "@mui/material";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, getDoc, doc, query, where, getDocs } from "firebase/firestore";

import VuiBox from "components/VuiBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import VuiTypography from "components/VuiTypography";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import articleimage from 'assets/images/avatar1.png';

// Firestore setup
const db = getFirestore();

// Reusable component to display a section of articles with responsive layout
const ArticleSection = ({ title, description, articles }) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Grid item xs={12} xl={12}>
      <Card>
        <VuiBox display="flex" flexDirection="column" height="100%">
          <VuiBox display="flex" flexDirection="column" mb="24px">
            <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
              {title}
            </VuiTypography>
            <VuiTypography color="text" variant="button" fontWeight="regular">
              {description}
            </VuiTypography>
          </VuiBox>
          <ScrollContainer isMobile={isMobile}>
            {articles.map((article, index) => (
              <DefaultProjectCard
                key={index}
                image={article.Image || articleimage}
                label=""
                title={article.Title}
                description={article.Description}
                action={{
                  type: 'external',
                  route: article.Link,
                  color: "white",
                  label: "READ MORE",
                }}
                authors={[]}
              />
            ))}
          </ScrollContainer>
        </VuiBox>
      </Card>
    </Grid>
  );
};

// Responsive scroll container that switches to vertical on mobile
const ScrollContainer = ({ isMobile, children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      overflowX: isMobile ? 'hidden' : 'auto',
      overflowY: isMobile ? 'auto' : 'hidden',
      gap: '20px',
      padding: '10px',
    }}
  >
    {children}
  </div>
);

const NewsFeed = () => {
  const [dietaryArticles, setDietaryArticles] = useState([]);
  const [medicalArticles, setMedicalArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);

  const isMobile = useMediaQuery('(max-width: 600px)'); // Detect mobile screens

  useEffect(() => {
    const fetchArticlesForUser = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userDoc = await getUserDoc(user.email);
        if (userDoc) {
          const { medicalHistory, dietary } = userDoc;
          await Promise.all([
            fetchArticles("Dietary", dietary, setDietaryArticles),
            fetchArticles("Chronical", medicalHistory, setMedicalArticles),
          ]);
        }
      }
      // Fetch all available articles
      await fetchAllArticles();
    };

    fetchArticlesForUser();
  }, []);

  const getUserDoc = async (email) => {
    const userDoc = await getDoc(doc(db, "users", email));
    return userDoc.exists() ? userDoc.data() : null;
  };

  const fetchArticles = async (field, preference, setState) => {
    try {
      let articleQuery = query(collection(db, "articles"), where("Field", "==", field));
      if (preference && preference !== "None" && preference !== "Overall Health and Wellness") {
        articleQuery = query(articleQuery, where("Personalized", "==", preference));
      }
      const snapshot = await getDocs(articleQuery);
      setState(snapshot.docs.map(doc => doc.data()));
    } catch (error) {
      console.error(`Error fetching ${field} articles:`, error);
    }
  };

  const fetchAllArticles = async () => {
    try {
      const allQuery = query(collection(db, "articles"));
      const allSnapshot = await getDocs(allQuery);
      setAllArticles(allSnapshot.docs.map(doc => doc.data()));
    } catch (error) {
      console.error("Error fetching all articles:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3} mb="30px">
            {/* Center-aligned and responsive title with padding */}
            <VuiBox py={2} px={isMobile ? 2 : 5}> {/* Adding padding around the title */}
              <VuiTypography
                color="white"
                variant={isMobile ? "h3" : "h1"} // Adjust font size based on screen size
                fontWeight="normal"
                mb="12px"
                textAlign="center" // Center align text
              >
                Your Personal News Flow
              </VuiTypography>
            </VuiBox>

            {/* Dietary News Section */}
            <ArticleSection
              title="Latest Diet and Nutrition News"
              description="Articles tailored to your preferences."
              articles={dietaryArticles}
            />

            {/* Medical Conditions News Section */}
            <ArticleSection
              title="Latest Articles on Medical Conditions"
              description="Articles tailored to your preferences."
              articles={medicalArticles}
            />

            {/* All Available Health Articles */}
            <ArticleSection
              title="All Available Health Articles"
              description="All of our articles."
              articles={allArticles}
            />
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
};

export default NewsFeed;