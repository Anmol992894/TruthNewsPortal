import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { add_news } from '../redux/action';

const Favorite = () => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const navigate=useNavigate()
  const dispatch=useDispatch();

  const goto=(index)=>{
    // localStorage.setItem('data',JSON.stringify(data[index]))
    dispatch(add_news(data[index]))
    navigate('/detail')
  }
  const gotomain = () => {
    navigate('/');
}

const removeFavorite = (article) => {
    const newFavorites = data.filter(fav => fav.url !== article.url);
    console.log(newFavorites);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));

};

const isFavorite = (article) => {
    return favorites.some(fav => fav.url === article.url);
};
  useEffect(() => {
    console.log(data);
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setData(savedFavorites);
        console.log(savedFavorites);
        console.log(data);
  },[favorites])

  return (
    <div>
      <nav class="navbar  bg-body-tertiary">
        <div class="container-fluid d-flex justify-cotent-center align-items-center">
          <div>
            <a class="navbar-brand fs-2 m-3" onClick={gotomain}>
              <i class="m-2 text-primary fs-1 fa-solid fa-globe"></i>
              <span className='text-decoration-underline'>True <span className='text-primary'>News</span> </span>
            </a>
          </div>
          <div className='me-lg-2 bg-primary rounded-circle p-1 border border-dark text-light'>
            <i class="fs-5 fa-brands fa-searchengin"></i>
          </div>
        </div>
      </nav>
      <br />

      <div className='mt-3'>
        {data.length != 0?
          <div className='container'>
            {data.map((info,index) => {
              return (
                <div>
                {info.content != null? <div class="card mb-3 border border-3 border-dark" style={{ width: "100%",height:"400px"}}>
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img onClick={()=>goto(index)}  src={info.urlToImage} style={{ width: "100%", height: "400px" }} class="img-fluid rounded-start" alt="Image Not Available" />
                    </div>
                    <div class="col-md-8">
                    <div className='d-flex align-items-center justify-content-end'>
                            <a  onClick={() => removeFavorite(info)}>
                              <i style={{color:'blue'}} class="  m-2 fs-3 fa-solid fa-bookmark"></i>
                            </a>
                          </div>
                      <div className='text-start p-2'><span>Published By:- {info.author}</span></div>
                      <div class="h-100 card-body text-start d-flexflex-column ">
                        <h3 class="card-title">{info.title}</h3>
                        <span><em>{info.source.id}</em></span>
                        <p class="card-text my-5" onClick={()=>goto(index)}>{info.content}</p>
                        <p class="card-text"><small class="text-body-secondary">{info.publishedAt}</small></p>
                      </div>
                    </div>
                  </div>
                </div>:''}
                </div>
              )
            })}
          </div>
          : ""}
      </div>
    </div>
  )
}

export default Favorite
