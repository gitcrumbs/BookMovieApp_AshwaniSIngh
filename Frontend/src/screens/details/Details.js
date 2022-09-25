import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@material-ui/core";
import YouTube from "react-youtube";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import "./Details.css";
import { Fragment } from "react";
import Button from '@material-ui/core/Button';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import StarBorderIcon from "@material-ui/icons/StarBorder";
const Details = () => {
  let { id } = useParams();
  let [movieData, setMovieData] = useState("");
  let [genres, setGenres] = useState([]);
  let [youtubeUrl, setYouttubeUrl] = useState("");
  let [actors, setActors] = useState([]);


  useEffect(() => {
    axios
      .get(`/api/v1/movies/${id}`)
      .then((response) => {
        setMovieData(response.data);
        setGenres(response.data.genres);
        setYouttubeUrl(response.data.trailer_url);
        setActors(response.data.artists);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.clear();
        }
      });
  }, []);

  const useStyles = makeStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
    },
    gridList: {
      width: 300,
      height: 350,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  });

  var releaseDate = new Date(movieData.release_date).toDateString();

  let youtubeId = youtubeUrl.split("=")[1];

  let opts = {
    height: "390",
    width: "640",
    playerVars: {      
      autoplay: 0,
      origin: "http://localhost:3000",
    },
  };

  const classes = useStyles();
    //Books show route and the movie details when user has performed the click and has landed on the 
    //movie details page
  return (
    <div>

      
      {<div id="book_show">
        <Link
          to={`/bookshow/${id}`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" size="small" style={{ marginRight: "10px" }} color="primary">Book Show</Button>
        </Link>
      </div>}


      <Fragment>
        <div className="details-content">
          <Typography style={{ margin: "10px" }}>
            <Link to="/" className="back-link">
              <span className="back-to-home">&#60; Back to Home</span>
            </Link>
          </Typography>
          <div className="main-content">
            {/* First Section */}
            <div className="first-container">
              <img src={movieData.poster_url} alt={movieData.title} />
            </div>
            {/* Second Section */}
            <div className="mid-container">
              <Typography variant="h2" component="h2">
                {movieData.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <b>Genre: </b>
                {genres.map((genre) => `${genre}, `)}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <b>Duration: </b>
                {movieData.duration}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <b>Release Date: </b>
                {releaseDate}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <b>Rating: </b>
                {movieData.rating}
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ marginTop: "16px" }}
              >
                <b>
                  Plot:{" "}
                  <a href={movieData.wiki_url} target="_blank">
                    (Wiki Link)
                  </a>
                </b>
                {" " + movieData.storyline}
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ marginTop: "16px" }}
              >
                <b>Trailer:</b>
                {/* React youtube component for showing the movie trailer */}
                <YouTube
                  videoId={youtubeId}
                  opts={opts}
                  onReady={(event) => {
                    event.target.pauseVideo();
                  }}
                />
              </Typography>
            </div>
            {/* Third section */}
            <div className="last-container">
              <Typography variant="subtitle1" gutterBottom>
                <b>Rate this movie:</b>
                <div className="star-container">
                  <Stack spacing={1}>
                     <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> 
                    {/*  /*This new component can be used for better appearance.
                      to use
                       added by Ashwani Singh
                      */}
                                        
                  </Stack>


                    {/* To use the StarBorderIcon disable the comments appropriately  */}

                  {/* <div className="star-container">
                      <StarBorderIcon />
                      <StarBorderIcon />
                      <StarBorderIcon />
                      <StarBorderIcon />
                      <StarBorderIcon />
                    </div> */}



                </div>
                <div className="artist-heading">
                  <b>Artists: </b>
                </div>

                      {/* Component for populating the actors data */}

                <div className={classes.root}>
                  <GridList cellHeight={180} className={classes.gridList}>
                    {actors ? (
                      actors.map((actor) => (
                        <GridListTile key={actor.id}>
                          <img src={actor.profile_url} alt={actor.first_name} />
                          <GridListTileBar
                            title={actor.first_name + " " + actor.last_name}
                          />
                        </GridListTile>
                      ))
                    ) : (
                      <h6>No actor data available</h6>
                    )}
                  </GridList>
                </div>
              </Typography>
            </div>
          </div>
        </div>
      </Fragment>






    </div>

  );
};

export default Details;
