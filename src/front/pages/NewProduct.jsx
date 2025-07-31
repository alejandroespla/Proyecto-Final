import {AddProduct} from "../components/AddProduct";
import { Navbar } from "../components/Navbar.jsx"
import { Footer } from "../components/Footer.jsx";
const NewProduct = () => {
  return (
    <div className="pt-6">
      <Navbar/>
      <AddProduct />
      <Footer/>
    </div>
  );
};

export default NewProduct;