
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


import './Post.css';
import { useState, useEffect, useContext } from 'react';
import { HeartIcon } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import noImage from '../../assets/no-image.jpg';
import postimg from '../../../public/R15V3.jpg'
import { Link } from 'react-router-dom';
import  PostContext  from '../../Store/PostContext';


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
  // State to hold the products
  const [products, setProducts] = useState<productType[]>([]);
  const { setPostDetails }: { setPostDetails: React.Dispatch<React.SetStateAction<productType>> } = useContext(PostContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Reference to the "pro" collection in Firestore
        const productCollectionRef = collection(db, "pro");
        
        // Fetching the documents in the "pro" collection
        const productSnapshot = await getDocs(productCollectionRef);
        
        // Extracting data from each document and setting it to state
        // const productList:productType[] = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
        
        
        console.log(productList)
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => (
            <div key={product.id} className="card" onClick={()=>{setPostDetails(product)}}>
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
              <HeartIcon/>
            </div>
            <div className="image">
              <img src={postimg} alt="" />
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

