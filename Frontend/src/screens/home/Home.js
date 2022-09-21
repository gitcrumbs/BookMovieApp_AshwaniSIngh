import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import React, { useState } from "react";
import ReleasedMovies from "./ReleasedMovies";
import MoviesFilter from './MoviesFilter';
import './Home.css'
const Home = () =>{

  const [data, setData] = useState([]);
  const [releaseddata, setreleaseddata] = useState([]);  
  
  
    return (
        <div >
           <div className="upcoming_movies">Upcoming Movies</div>
           <div id="list_container">     
            <GridList className={"classes"} cols={6} cellHeight={250}>
            {data.map((tile) => (          
                <GridListTile key={tile.id}>
                  <img src={tile.poster_url} alt={tile.title} />
                  <GridListTileBar
                    title={tile.title}                
                    actionIcon={<IconButton aria-label={`star ${tile.title}`} />}
                  />
                </GridListTile>
                
              ))}
            </GridList>
           
          </div>           
          <ReleasedMovies movieData={releaseddata} />      
        </div>
      );
    
      }
    export default Home;