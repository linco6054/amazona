import HomeScreen from "./Routes/HomeScreen";
import ProductDetails from "./Routes/ProductScreen";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SignIn from "./Routes/SignIn";
import Cart from "./Routes/Cart";
import Register from "./Routes/Register";
import PaymentMethod from "./Routes/PaymentMethod";
import ShippingAdress from "./Routes/ShippingAdress";
import PlaceOrder from "./Routes/PlaceOrder";
import OrderDetails from "./Routes/OrderDetails";
import OrderHistory from "./Routes/OrderHistory";
import Profile from "./Routes/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ProductList from "./Routes/admin/ProductList";
import AdminRoute from "./components/AdminRoute";
import ProductEdit from "./Routes/admin/ProductEdit";
import OrderList from "./Routes/admin/OrderList";
function App() {
  //ShippingAdress
  return (
    <BrowserRouter>
      <div className="grid-container">
        <NavBar />
        <main>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/product/:id" exact component={ProductDetails} />
            <AdminRoute path="/product/:id/edit" component={ProductEdit} />
            <Route path="/Cart/:id?" component={Cart} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/Register" component={Register} />
            <Route path="/shipping" component={ShippingAdress} />
            <Route path="/payment" component={PaymentMethod} />
            <Route path="/placeOrder" component={PlaceOrder} />
            <PrivateRoute path="/order/:orderId" component={OrderDetails} />
            <PrivateRoute path="/orderhistory" component={OrderHistory} />
            <PrivateRoute path="/Profile" component={Profile} />
            <AdminRoute path="/productList" component={ProductList} />
            <AdminRoute path="/ordersList" component={OrderList} />
          </Switch>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
//Profile

export default App;
