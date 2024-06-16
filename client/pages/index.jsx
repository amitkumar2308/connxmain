import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Typography, Box, Card, CardContent, CardMedia, Divider, IconButton, Button } from '@mui/material';
import { Share, ArrowForward } from '@mui/icons-material';
import { UserContext } from '../context';
import articles from '../pages/articles';  // Importing articles

const Home = () => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  const handleContributorClick = () => {
    router.push('/contribution');
  };

  return (
    <div className="container mx-auto px-4">
      <Typography variant="h1" className="text-4xl text-center mt-8 mb-4">DAILY UPDATES</Typography>
      <Typography variant="h6" className="text-center mb-4">Your contribution can make a huge impact on society</Typography>
      <div className="flex justify-center"> 
        <Button
          variant="contained"
          onClick={handleContributorClick}
          sx={{ backgroundColor: 'black', py: 0.5, px: 1, alignItems: 'center' }}
        >
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
