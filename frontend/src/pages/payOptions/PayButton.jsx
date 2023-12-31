import axios from 'axios'
// import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { payOrder } from '../../actions/orderActions'
// import styled from 'styled-components'
import styled, { ThemeProvider } from 'styled-components'
import { color, space, fontSize, buttonStyle, variant } from 'styled-system'


const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #45a049;
  }
`;
const PayButton = ({order,orderId})=>{
    const dispatch = useDispatch();
    // const orderArray = Object.values(orderDetails)
    // console.log("consolling orderArray " + orderArray)
    console.log("consolling order " +order.totalPrice)
    console.log("consolling order " +order.totalPrice)
    console.log("consolling orderID " +orderId)

    const handleCheckout = ()=>{
        axios.post(`http://localhost:5000/api/stripe/create-checkout-session`,{
            order,
            orderID:order._id
            
        }).then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url
                // dispatch(payOrder(orderId)) 
                // console.log("calling here paybutton res.data.url" )
            }
        }).catch((err=>console.log(err.message)))
        console.log(order)

        dispatch(payOrder(orderId))
    }
    
    //  useEffect(()=>{ 
    //      handleCheckout();
    //  },[])
    return(
        <>
        {/* <Button onClick={handleCheckout}> Check out</Button> */}
        {/* <button onClick={()=>handleCheckout}> Check out</button> */}
        {/* <ThemeProvider theme={theme}>
        <Button  onClick={handleCheckout}  color='custom' variant='secondary' size='large'>Check out</Button>
      </ThemeProvider> */}
      <div>
      <Button  onClick={handleCheckout}  color='custom' variant='secondary' size='large'>Check out</Button>
    </div>
        </>
    )
}
export default PayButton