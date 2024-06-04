import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Box, Card, CardContent, CardMedia, Divider, IconButton, Button } from '@mui/material'; // Added Button
import { Share, ArrowForward } from '@mui/icons-material';

const API_KEY = "1bebd07efcf441d3b164a00ea46d5ecc";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [contributorClicked, setContributorClicked] = useState(false); // Added
  const router = useRouter(); // Using useRouter instead of useHistory

  useEffect(() => {
    const fetchArticles = async () => {
      if (!API_KEY) {
        console.error("API key is missing");
        setError("API key is missing");
        return;
      }

      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=technology&pageSize=30&apiKey=${API_KEY}`);
        console.log("API Response:", response.data); // Print the response for debugging
        setArticles(response.data.articles.slice(0, 30)); // Limit to 30 articles
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError(error.message);
      }
    };
    fetchArticles();
  }, []);

  if (error) {
    return <Typography variant="h5" color="error">Error: {error}</Typography>;
  }

  const handleContributorClick = () => {
    setContributorClicked(true);
    router.push('/contribution'); // Redirect using Next.js router
  };

  return (
    <div className="container mx-auto px-4">
      <Typography variant="h1" className="text-4xl text-center mt-8 mb-4">DAILY UPDATES</Typography>
      <Typography variant="h6" className="text-center mb-4">Your contribution can make a huge impact on society</Typography>
      <div className="flex justify-center"> 
      <Button
        
        variant="contained"
        onClick={handleContributorClick}
        sx={{ backgroundColor:'black' , py: 0.5, px:1,  alignItems: 'center'}} // Added padding
      >
        {/* Styled Button */}
        <Typography variant="h6" className="text-center small">Become a contributor</Typography>
      </Button>
      <Divider sx={{ borderColor: 'black' }} /> {/* Divider with black color */}
      </div>
      <div id="article-section" className="mt-8">
        
        {articles.map((article, index) => (
          <Card key={index} sx={{ marginBottom: '20px' }}>
            <CardMedia
              component="img"
              height="200"
              image={article.urlToImage}
              alt={article.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(article.publishedAt).toDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article.description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <IconButton
                  aria-label="share"
                  onClick={() => {
                    navigator.clipboard.writeText(article.url);
                    alert("Link copied to clipboard!");
                  }}
                >
                  <Share />
                </IconButton>
                <IconButton aria-label="read-more" href={article.url} target="_blank" rel="noopener noreferrer">
                  <ArrowForward />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
