import { Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const MyOrdersPage = () => {
  const {getMyOrders, myOrders} = useAuth();
  // const navigate = useNavigate();

  useEffect(() => {
    getMyOrders();
  }, []);


  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
        <Typography>
            My Orders
        </Typography>
        {myOrders.map(({ address,orderItems, total}) => (

        <Box sx={{border:1, borderColor: "gray", borderRadius:2, padding:1}}>
          
          <Typography>
            Address: {address}
          </Typography>
          <Typography>
            Items: {orderItems.length}
          </Typography>
          <Typography>
            Total: {total}
          </Typography>
        </Box>
          
        
        ))}


    </Container>
  );
};

export default MyOrdersPage;