
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ReleasedMovies from "./ReleasedMovies";
import axios from "axios";
import React, { useState, useEffect } from "react";
import './Home.css'


const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",

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



function Home(props) {

  const [tileData, settileData] = useState([]);
  const [releaseddata, setreleaseddata] = useState([]); 

  useEffect(() => {
    axios
      .get("/api/v1/movies?limit=500&status=PUBLISHED")
      .then((response) => settileData(response.data.movies));

    axios
      .get("/api/v1/movies?limit=500&status=RELEASED")
      .then((response) => setreleaseddata(response.data.movies));

  }, []);

  

  const { classes } = props;

  return (
    <div>    
      <div className="upcoming_movies">Upcoming Movies</div>
      <div id="list_container">

        <GridList className={classes.gridList} cols={6} cellHeight={250} >
          {tileData.map((tile) => (
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
        <div>


        </div>
      
    </div>
  );
}



export default withStyles(styles)(Home);