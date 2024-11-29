import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import MovieDetailsPage from '../pages/MovieDetailPage/MovieDetailPage';
import LoginPage from '../pages/Login/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import FavoriteMoviesPage from '../pages/FavriotePage/FavotitePage';
 import Search from '../component/Search/SearchBar';
import TVShowsPage from '../pages/TvShow/TvshowPage';
import MoviesPage from '../pages/MoviePage/MoviePage';
import TVDetailsPage from '../pages/TvshowDetail/TVDetailsPage';
import WatchlistPage from '../pages/WatchListPage/WatchListPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
export default function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            {/* <Route path='/search' element={<Search/>}/> */}
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path="/movie/:id" element={<MovieDetailsPage/>}/>
            <Route path='/tv/:id' element={<TVDetailsPage/>}/>
            <Route path="/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/search" element={<Search/>}></Route>
            <Route path="/movie" element={< MoviesPage/>} />
            <Route path="/tv" element={<TVShowsPage/>}></Route>
        </Routes>
    )
}
