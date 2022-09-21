import './Home.css'
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import ReleasedMovies from "./ReleasedMovies";
import MoviesFilter from './MoviesFilter';



const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginBottom: "15px",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },

  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
});


const Home = ()=> {
  const [data, setData] = useState([]);
  const [releaseddata, setreleaseddata] = useState([]);  
  

  useEffect(() => {
    axios
      .get("http://localhost:8085/api/v1/movies?limit=500&status=PUBLISHED")
      .then((response) => setData(response.data.movies));

      axios
      .get("http://localhost:8085/api/v1/movies?limit=500&status=RELEASED")
      .then((response) => setreleaseddata(response.data.movies));

  }, []);


 

  const classes = useStyles();

  return (
    <div >
       <div className="upcoming_movies">Upcoming Movies</div>
       <div id="list_container">     
        <GridList className={classes.gridList} cols={6} cellHeight={250}>
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
