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

        axios
            .get("http://localhost:8085/api/v1/genres")
            .then((response) => setGenres(response.data.genres));


        axios
            .get("http://localhost:8085/api/v1/artists")
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
        let url = new URL('http://localhost:8085/api/v1/movies?limit=500&status=Released')

        const moviesFilter = {
        
            name: nameChange,
            releaseStartDate: startDate,
            releaseEndDate: endDate ,
            genres: [...genreChoice],
            artists: [...artistChoice]                 
        }
   

        for (const item in moviesFilter) {          

             if((item==='name')&&moviesFilter[item]!==''){
                url.searchParams.set('title', moviesFilter[item]);
                console.log(item+"My item is"+moviesFilter[item])
             }

             if((item==='releaseStartDate')&&moviesFilter[item]!==''){
                url.searchParams.set('start_date', moviesFilter[item]);
             }

             if((item==='releaseEndDate')&&moviesFilter[item]!==''){
                url.searchParams.set('end_date', moviesFilter[item]);
             }


             if((item==='genres')&&moviesFilter[item].length>0){
                url.searchParams.set('genre', moviesFilter[item]);
             }

             if((item==='artists')&&moviesFilter[item].length>0){
                url.searchParams.set('artists', moviesFilter[item]);
             }

          }

        console.log("My Updated Object from form is ",moviesFilter.name)
        props.updatedUrl(url); 

    }


    const handleChange = (event) => {

        const {
            target: { value },
        } = event;
        setGenreChoice(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        //setGenreChoice(event.target.value);
    };

    const handleArtistChange = (event) => {

        console.log("Inside Artist check"+event.target.value)
        const {
            target: { value },
        } = event;
        setArtistChoice(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
//        setArtistChoice(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setstartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setendDate(event.target.value);
    };

    const handleNameChange = (event) => {
        setNameChange(event.target.value);
    };


    

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];

        options.map((item) => {
            value.push(item)
        })
        // for (let i = 0, l = options.length; i < l; i += 1) {
        //     if (options[i].selected) {
        //         value.push(options[i].value);
        //     }
        // }
        console.log("Generated Value", options)
        //setGenreChoice(JSON.parse(value));       
    };

    const handleChangeArtistMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setArtistChoice(value);
    };



    return (

        <div className="filter-form">
            <Card>
                <CardContent>
                    <InputLabel style={{ color: "#4791db" }}>
                        FIND MOVIES BY:
                    </InputLabel>
                    <FormControl style={{ width: "100%", marginTop: "20px" }}>
                        <TextField id="standard-basic" label="Movie Name" onChange={handleNameChange} />
                    </FormControl>


                    <FormControl style={{ width: "100%", marginTop: "20px" }}>
                        <InputLabel id="demo-mutiple-name-label">Genres</InputLabel>
                        <Select
                            labelId="demo-mutiple-name-label"
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
                            labelId="demo-mutiple-name-label"
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