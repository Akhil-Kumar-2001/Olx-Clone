import './Create.css';
import Header from '../Header/Header';
import { useFirebase } from '../../Store/FirebaseContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // New: Axios for HTTP requests
import toast from 'react-hot-toast';
import { productRef } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import noImage from '../../assets/no-image.jpg';

const Create = () => {
  const { isAuthenticated } = useFirebase();
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    category: "",  // Changed description to category
    location: ""
  });

  const [productImage, setProductImage] = useState<File | null>(null);
  const [prev, setPrev] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to sell the item");
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleImagePrev = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setPrev(imageUrl);
      setProductImage(e.target.files[0]);
    }
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let imageUrl = '';

      if (productImage) {
        // Upload to Cloudinary
        const formData = new FormData();
        formData.append('file', productImage);
        formData.append('upload_preset', 'olx_preset'); // Cloudinary preset

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dhhzuean5/image/upload`, 
          formData
        );

        imageUrl = response.data.secure_url;  // Cloudinary image URL
      } else {
        toast.error("Please select an image to upload.");
        return;
      }

      const dataToInsert = {
        title: formData.title,
        price: formData.price,
        category: formData.category,  // Updated to category
        location: formData.location,
        image: imageUrl,
        date: new Date()
      };

      await setDoc(productRef, dataToInsert);
      toast.success("Product uploaded successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload product.");
    }
  };

  return (
    <>
      <Header />
      <div className='cardA'>
        <div className="centerDiv">
          <form onSubmit={handleAddProduct}>
            <label htmlFor="fname">Name</label>
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <label htmlFor="category">Category</label>
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              value={formData.category}  // Changed to formData.category
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <label htmlFor="price">Price</label>
            <input
              className="input"
              type="number"
              id="price"
              name="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
            <label htmlFor="location">Location</label>
            <input
              className="input"
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <img alt="Preview" width="200px" height="200px" src={prev || noImage} />
            <input type="file" onChange={handleImagePrev} />
            <button type="submit" className="uploadBtn">Upload and Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
