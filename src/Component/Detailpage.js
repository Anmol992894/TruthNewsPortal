import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Detailpage = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    const datadetail = useSelector((state) => state)
    const [info, setInfo] = useState();
    const goto = () => {
        navigate('/');
    }
    const gotofavrouite = () => {
        navigate('/fav');
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
        setInfo(datadetail)
    }, [])
    return (
        <div>
            <nav class="navbar  bg-body-tertiary">
                <div class="container-fluid d-flex justify-cotent-center align-items-center">
                    <div>
                        <a class="navbar-brand fs-2 m-3" onClick={goto}>
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
            <div className='container'>
                <div className='d-flex justify-content-end'>
                <button className="btn btn-primary rounded" onClick={gotofavrouite}>
                    Goto Favourite
                </button>
                </div>
                <div className='mt-3'>
                    <div className='container'>
                        <div className='d-flex align-items-center justify-content-end'>
                            <a onClick={() => (isFavorite(info) ? removeFavorite(info) : addFavorite(info))}>
                                <i style={{ color: `${isFavorite(info) ? 'blue' : 'black'}` }} class="  m-2 fs-3 fa-solid fa-bookmark"></i>
                            </a>
                        </div>
                        <div>
                            {info != undefined ?
                                <div class="card" style={{ width: "100%", height: "400px" }}>
                                    <img src={info.urlToImage} class="card-img-top" alt="..." />
                                    <div class="card-body fs-4">
                                        <div className='d-flex justify-content-between fw-bold'>
                                            <span>{info.author}</span>
                                            <span>{info.publishedAt}</span>
                                        </div>
                                        <p class="card-text text-start mt-3">{info.content} {info.description}</p>
                                    </div>
                                </div>
                                : ""
                            }                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detailpage
