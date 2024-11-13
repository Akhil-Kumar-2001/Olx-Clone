
// import { HeartIcon } from 'lucide-react';
// import postimg from '../../../public/R15V3.jpg'
// import './Post.css';
// import { useEffect } from 'react';

// function Posts() {

//   useEffect(()=>{

//   })

//   return (
//     <div className="postParentDiv">
//       <div className="moreView">
//         <div className="heading">
//           <span>Quick Menu</span>
//           <span>View more</span>
//         </div>
//         <div className="cards">
//           <div
//             className="card"
//           >
//             <div className="favorite">
//              <HeartIcon/>
//             </div>
//             <div className="image">
//               <img src={postimg} alt="" />
//             </div>
//             <div className="content">
//               <p className="rate">&#x20B9; 250000</p>
//               <span className="kilometer">Two Wheeler</span>
//               <p className="name"> YAMAHA R15V3</p>
//             </div>
//             <div className="date">
//               <span>Tue May 04 2021</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="recommendations">
//         <div className="heading">
//           <span>Fresh recommendations</span>
//         </div>
        // <div className="cards">
        //   <div className="card">
        //     <div className="favorite">
        //       <HeartIcon/>
        //     </div>
        //     <div className="image">
        //       <img src={postimg} alt="" />
        //     </div>
        //     <div className="content">
        //       <p className="rate">&#x20B9; 250000</p>
        //       <span className="kilometer">Two Wheeler</span>
        //       <p className="name"> YAMAHA R15V3</p>
        //     </div>
        //     <div className="date">
        //       <span>10/5/2021</span>
        //     </div>
        //   </div>
        // </div>
//       </div>
//     </div>
//   );
// }

// export default Posts;


import { useState, useEffect, useContext } from 'react';
import { HeartIcon } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import noImage from '../../assets/no-image.jpg';
import postimg from '../../../public/R15V3.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { PostContext } from '../../Store/PostContext';
import './Post.css';

type productType = {
  title?: string;
  price?: number;
  location: string;
  category?: string;
  date?: any;
  description: string;
  id: string;
  image?: string;
};

const Posts = () => {
  const [products, setProducts] = useState<productType[]>([]);
  
  // Access context and ensure it exists
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("PostContext must be used within a PostProvider");
  }
  
  const { setPostDetails } = context;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCollectionRef = collection(db, "pro");
        const productSnapshot = await getDocs(productCollectionRef);
        const productList: productType[] = productSnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title || 'Untitled',
          price: doc.data().price || 0,
          location: doc.data().location || 'Unknown',
          category: doc.data().category || 'Uncategorized',
          date: doc.data().date,
          description: doc.data().description || 'No description available',
          image: doc.data().image || ''
        }));
        
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (product: productType) => {
    setPostDetails(product);  // Set the clicked product details in context
    navigate('/view');        // Navigate to the '/view' page
  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => (
            <div key={product.id} className="card" onClick={() => handleCardClick(product)}>
              <div className="favorite">
                <HeartIcon />
              </div>
              <Link to='/view'>
                <div className="image">
                  <img src={product.image || noImage} alt={product.title} />
                </div>
              </Link>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.description}</span>
                <p className="name">{product.title}</p>
              </div>
              <div className="date">
                <span>{product.date ? new Date(product.date.seconds * 1000).toLocaleDateString() : 'No Date'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <HeartIcon />
            </div>
            <div className="image">
              <img src={postimg} alt="YAMAHA R15V3" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
