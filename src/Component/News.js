// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { add_news } from '../redux/action';

// const News = () => {
//   const [data, setData] = useState([]);
//   const [favorites, setFavorites] = useState([]);

//   const navigate=useNavigate()
//   const dispatch=useDispatch();
//   // const getInitialState = () => {
//   //   const value = "Orange";
//   //   return value;
//   // };
//   const goto=(index)=>{
//     localStorage.setItem('data',JSON.stringify(data[index]))
//     dispatch(add_news(data[index]))
//     navigate('/detail',{state:{data:data[index],index:index}})
//   }
//   const gotofavrouite=()=>{
//     navigate('/fav')
//   }
//   const [sort,setSort]=useState('');
//   console.log(sort);
//   const newsdata = async () => {
//       try {
//         const categoryQuery = sort!='' ? `&category=${sort}` : '';
//         console.log(categoryQuery);
//         const url = `https://newsapi.org/v2/top-headlines?country=in${categoryQuery}&apiKey=e8d9936576d6476495871e9719c31554`;
//         const response = await axios.get(url);
//         console.log(response.data.articles[0].url);
//         setData(response.data.articles)
//     } catch (error) {
//         console.error('Error fetching top headlines:', error);
//         throw error; // Rethrow the error if you want it to be handled by the caller
//     }

//   }
//   const handleChange = (e) => {
//     setSort(e.target.value);

//     newsdata();
//   };
//   const addFavorite = (article) => {
//     const newFavorites = [...favorites, article];
//     setFavorites(newFavorites);
//     localStorage.setItem('favorites', JSON.stringify(newFavorites));
// };

// const removeFavorite = (article) => {
//     const newFavorites = favorites.filter(fav => fav.url !== article.url);
//     setFavorites(newFavorites);
//     localStorage.setItem('favorites', JSON.stringify(newFavorites));
// };

// const isFavorite = (article) => {
//     return favorites.some(fav => fav.url === article.url);
// };
//   useEffect(() => {
//     console.log(data);
//     newsdata();
//     const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
//         setFavorites(savedFavorites);
//         console.log(savedFavorites);
//   }, [sort])
//   useEffect(()=>{

//   },[sort])

//   return (
//     <div>
//       <nav class="navbar  bg-body-tertiary">
//         <div class="container-fluid d-flex justify-cotent-center align-items-center">
//           <div>
//             <a class="navbar-brand fs-2 m-3" href="#">
//               <i class="m-2 text-primary fs-1 fa-solid fa-globe"></i>
//               <span className='text-decoration-underline'>True <span className='text-primary'>News</span> </span>
//             </a>
//           </div>
//           <div className='me-lg-2 bg-primary rounded-circle p-1 border border-dark text-light'>
//             <i class="fs-5 fa-brands fa-searchengin"></i>
//           </div>
//         </div>
//       </nav>
//       <br />
//       <div className='container d-flex justify-content-between'>
//       <select 
//         value={sort} 
//         onChange={handleChange} 
//       >
//        <option value="">All</option>
//        <option value="business">Business</option>
//         <option value="health">Health</option>
//         <option value="science">Science</option>
//         <option value="sports">Sports</option>
//         <option value="technology">Technology</option>
//         <option value="entertainment">Entertainment</option>
//       </select>
//       <button type='btn btn-secondary' onClick={gotofavrouite}>Goto Favrouite</button>
//       </div>
//       <div className='mt-3'>
//         {data.length != 0?
//           <div className='container'>
//             {data.map((info,index) => {
//               return (
//                 <div>
//                 {info.content != null? <div class="card mb-3 border border-3 border-dark" style={{ width: "100%",height:"400px"}}>
//                   <div class="row g-0">
//                     <div class="col-md-4">
//                       <img onClick={()=>goto(index)}  src={info.urlToImage} style={{ width: "100%", height: "400px" }} class="img-fluid rounded-start" alt="Image Not Available" />
//                     </div>
//                     <div class="col-md-8">
//                     <button onClick={() => isFavorite(info) ? removeFavorite(info) : addFavorite(info)}>
//                             {isFavorite(info) ? 'Remove from Favorites' : 'Add to Favorites'}
//                         </button>
//                       <div className='text-start p-2'><span>Published By:- {info.author}</span></div>
//                       <div class="h-100 card-body text-start d-flexflex-column ">
//                         <h3 class="card-title">{info.title}</h3>
//                         <span><em>{info.source.id}</em></span>
//                         <p class="card-text my-5" onClick={()=>goto(index)}>{info.content}</p>
//                         <p class="card-text"><small class="text-body-secondary">{info.publishedAt}</small></p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>:''}
//                 </div>
//               )
//             })}
//           </div>
//           : ""}
//       </div>
//     </div>
//   )
// }

// export default News


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { add_news } from '../redux/action';

const News = () => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goto = (index) => {
    localStorage.setItem('data', JSON.stringify(data[index]));
    dispatch(add_news(data[index]));
    navigate('/detail', { state: { data: data[index], index: index } });
  };

  const gotofavrouite = () => {
    navigate('/fav');
  };

  const [sort, setSort] = useState('');
  console.log(sort);

  const newsdata = async () => {
    try {
      const categoryQuery = sort !== '' ? `&category=${sort}` : '';
      console.log(categoryQuery);
      const url = `https://newsapi.org/v2/top-headlines?country=in${categoryQuery}&apiKey=e8d9936576d6476495871e9719c31554`;
      const response = await axios.get(url);
      console.log(response.data.articles[0].url);
      setData(response.data.articles);
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw error;
    }
  };

  const handleChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1); // Reset to first page on sort change
    newsdata();
  };

  const addFavorite = (article) => {
    const newFavorites = [...favorites, article];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFavorite = (article) => {
    const newFavorites = favorites.filter((fav) => fav.url !== article.url);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (article) => {
    return favorites.some((fav) => fav.url === article.url);
  };

  useEffect(() => {
    console.log(data);
    newsdata();
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
    console.log(savedFavorites);
  }, [sort]);

  useEffect(() => { }, [sort]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-flex justify-cotent-center align-items-center">
          <div>
            <a className="navbar-brand fs-2 m-3" href="#">
              <i className="m-2 text-primary fs-1 fa-solid fa-globe"></i>
              <span className="text-decoration-underline">
                True <span className="text-primary">News</span>
              </span>
            </a>
          </div>
          <div className="me-lg-2 bg-primary rounded-circle p-1 border border-dark text-light">
            <i className="fs-5 fa-brands fa-searchengin"></i>
          </div>
        </div>
      </nav>
      <br />
      <div className="container d-flex justify-content-between">
        <select value={sort} onChange={handleChange}>
          <option value="">All</option>
          <option value="business">Business</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <button className='btn btn-primary rounded' onClick={gotofavrouite}>
          Goto Favourite
        </button>
      </div>
      <div className="mt-3">
        {data.length !== 0 ? (
          <div className="container">
            {currentItems.map((info, index) => {
              return (
                <div key={index}>
                  {info.content != null ? (
                    <div className="card mb-3 border border-3 border-dark" style={{ width: '100%', height: '400px' }}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            onClick={() => goto(index)}
                            src={info.urlToImage}
                            style={{ width: '100%', height: '400px' }}
                            className="img-fluid rounded-start"
                            alt="Image Not Available"
                          />
                        </div>
                        <div className="col-md-8">
                          <div className='d-flex align-items-center justify-content-end'>

                            <a onClick={() => (isFavorite(info) ? removeFavorite(info) : addFavorite(info))}>
                              <i style={{ color: `${isFavorite(info) ? 'blue' : 'black'}` }} class="  m-2 fs-3 fa-solid fa-bookmark"></i>
                            </a>
                          </div>

                          <div className="text-start p-2">
                            <span>Published By:- {info.author}</span>
                          </div>
                          <div className="h-100 card-body text-start d-flexflex-column ">
                            <h3 className="card-title">{info.title}</h3>
                            <span>
                              <em>{info.source.id}</em>
                            </span>
                            <p className="card-text my-5" onClick={() => goto(index)}>
                              {info.content}
                            </p>
                            <p className="card-text">
                              <small className="text-body-secondary">{info.publishedAt}</small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="container pagination my-3">
        <button className='btn rounded btn-primary' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <button className='btn rounded btn-primary' onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= data.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default News;
