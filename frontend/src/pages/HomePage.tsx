import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);  
  
  useEffect(() => {
    const fetchdata=async()=>{
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch  {
        setError(true);
      }
    };
    fetchdata();
  }, []);
  if (error) {
    return <div>Failed to load products. Please try again later.</div>;
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 2,
          justifyContent: 'flex-start'
        }}
      >
        {products.map((p) => (
          <Box 
            key={p._id}
            sx={{ 
              flex: '0 0 calc(33.333% - 16px)',
              minWidth: '280px',
              '@media (max-width: 768px)': {
                flex: '0 0 100%'
              }
            }}
          >
            <ProductCard id={p._id} title={p.title} image={p.image} price={p.price}/>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default HomePage;


