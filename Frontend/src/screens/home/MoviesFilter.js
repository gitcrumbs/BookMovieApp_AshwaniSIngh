import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    FormControl,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Input,
    Checkbox,
    Button,
} from "@material-ui/core";
import './MoviesFilter.css'



const MoviesFilter = (props) => {
    
    const [genres, setGenres] = useState([]);
    const [genreChoice, setGenreChoice] = useState([]);    
    const [nameChange, setNameChange] = useState("");
    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [artists, setArtists] = useState([]);
    const [artistChoice, setArtistChoice] = useState([]);
   
    
 

    useEffect(() => {
        // Populeting the genres
        axios
            .get("/api/v1/genres")
            .then((response) => setGenres(response.data.genres));

    // Populeting the artists
        axios
            .get("/api/v1/artists")
            .then((response) => setArtists(response.data.artists));


    }, []);


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    const submitCriteria = (event) => {
        event.preventDefault();
        

        const moviesFilter = {
        
            title: nameChange,
            start_date: startDate,
            end_date: endDate ,
            genre: [...genreChoice],
            artists: [...artistChoice],
            status:"Released"            
        }

        // Filtering the movies based on the applied filters in the 'FIND MOVIES BY:' section
        const searchParams = new URLSearchParams({...moviesFilter});     
        props.updatedUrl(searchParams); 

    }


    const handleChange = (event) => {

        const {
            target: { value },
        } = event;
        setGenreChoice(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
      
    };

    //Event Handlers for handling the applied filters.

    //Handler for artist selections
    const handleArtistChange = (event) => {
        
        const {
            target: { value },
        } = event;
        setArtistChoice(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

    };


    //Handler for start date changes
    const handleStartDateChange = (event) => {
        setstartDate(event.target.value);
    };

    //Handler for end date changes
    const handleEndDateChange = (event) => {
        setendDate(event.target.value);
    };

    //Handler for handling the name changes
    const handleNameChange = (event) => {
        setNameChange(event.target.value);
    };


    
    

    return (
       //Form control components for user interactions on the UI.

        <div className="filter-form">
            <Card >
                <CardContent >
                    <InputLabel style={{ color: "#4791db" }}>
                        FIND MOVIES BY:
                    </InputLabel>
                    <FormControl style={{ width: "100%", marginTop: "20px" }}>
                        <TextField id="standard-basic" label="Movie Name" onChange={handleNameChange} />
                    </FormControl>


                    <FormControl style={{ width: "100%", marginTop: "20px" }}>
                        <InputLabel id="demo-mutiple-name-label">Genres</InputLabel>
                        <Select
                           
                            id="demo-mutiple-name"
                            multiple={true}
                            value={genreChoice}
                            renderValue={(selected) => selected.join(', ')}
                            onChange={handleChange}
                            input={<Input />}
                            MenuProps={MenuProps}
                        >
                            {genres.map((genre) => (
                                <MenuItem key={genre.id} value={genre.genre}>
                                    <Checkbox color="primary" checked={genreChoice.indexOf(genre.genre) > -1} />
                                    {genre.genre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl style={{ width: "100%", marginTop: "20px" }}>
                        <InputLabel id="demo-mutiple-name-label">Artists</InputLabel>
                        <Select
                           
                            id="demo-mutiple-name"
                            multiple={true}
                            value={artistChoice}
                            onChange={handleArtistChange}
                            renderValue={(selected) => selected.join(', ')}
                            input={<Input />}
                            MenuProps={MenuProps}
                        >
                            {artists.map((artist) => (
                                <MenuItem
                                    key={artist.id}
                                    value={artist.first_name + " " + artist.last_name}
                                >
                                    <Checkbox color="primary" checked={artistChoice.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                    {artist.first_name + " " + artist.last_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: "100%", marginTop: "20px" }}>
                        <TextField
                            name="Release Date Start"
                            id="standard-basic"
                            type="date"
                            label="Release Date Start"
                            onChange={handleStartDateChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormControl>
                    <FormControl style={{ width: "100%", marginTop: "20px" }}>
                        <TextField
                            name="Release Date End"
                            id="standard-basic"
                            type="date"
                            label="Release Date End"
                            onChange={handleEndDateChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormControl>
                    <div>
                        <FormControl style={{ width: "100%", marginTop: "20px" }}>
                            <Button variant="contained" name="Apply" color="primary" onClick={submitCriteria}>
                                Apply
                            </Button>
                        </FormControl>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

}

export default MoviesFilter