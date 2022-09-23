
import { Link } from "react-router-dom";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import './ReleasedMovies.css'
import MoviesFilter from './MoviesFilter';
import React, { useState, useEffect } from "react";
import axios from "axios";




export default function ReleasedMovies( {movieData}) {
  const [filteredData, setfilteredData] = useState([]);
  const [updatedUrl, setupdatedUrl] = useState("");
  const [updatedEvent, setupdatedEvent] = useState(false);

  
  
  

  useEffect(()=>{
    
    if(updatedUrl!==''){
      console.log("received updated Url as ",updatedUrl)
      setupdatedEvent(true);
      axios
      .get(`${updatedUrl}`)
      .then((response) =>  setfilteredData(response.data.movies))
      .then(console.log(filteredData.length));
    }else{
      setupdatedEvent(false);
    }
  

  },[updatedUrl])
 
 
  return (
    <div className='released_container'>
    <div className="released_movies" >
      {(updatedEvent) ?
    <GridList cellHeight={350} cols={4}>
        {filteredData.map((tile) => {
          var expectedDate = new Date(tile.release_date).toDateString();

          return (
            <GridListTile key={tile.id} >
              <Link to={"/movie-details/" + tile.id} >
                <img
                  src={tile.poster_url}
                  alt={tile.title}                  
                  style={{
                    width: "100%",
                    alignItems: "center",
                    margin: "0px",
                  }}
                />
              </Link>
              <GridListTileBar
                title={tile.title}
                subtitle={<span>Release Date: {expectedDate}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${tile.title}`}
                   
                  />
                }
              />
            </GridListTile>
          );
        })}
       
      </GridList>
      
      :
      
<GridList cellHeight={350} cols={4}>
        {movieData.map((tile) => {
          var expectedDate = new Date(tile.release_date).toDateString();

          return (
            <GridListTile key={tile.id}>
              <Link to={"/movie-details/" + tile.id}>
                <img
                  src={tile.poster_url}
                  alt={tile.title}
                  style={{
                    width: "100%",
                    alignItems: "center",
                    margin: "0px",
                  }}
                
                />
              </Link>
              <GridListTileBar
                title={tile.title}
                subtitle={<span>Release Date: {expectedDate}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${tile.title}`}
                   
                  />
                }
              />
            </GridListTile>
          );
        })}
       
      </GridList>
      }
      
     
    </div>
     <MoviesFilter movieData={movieData} updatedUrl={setupdatedUrl}/>
    </div>
  );
}
