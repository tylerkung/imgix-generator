import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import Imgix from '../Imgix';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  textField: {
      width: '100%',
      marginBottom: '15px'
  },
  formControl: {
      width: '100%',
      marginBottom: '15px'
  }
}));

const ImageGenerator = () => {
    const [textValue, setTextValue] = useState("");
    const [colorValue, setColorValue] = useState("");
    const [textColorValue, setTextColor] = useState("");
    const [imageProps, setImageProps] = useState({text: '', color: '', textColor: ''});
    const [bgColorError, setBgColorError] = useState(false);
    const classes = useStyles();

    const handleTextChange = (e) => {
        setTextValue(e.target.value);
    }
    const handleTextColorChange = (e) => {
        setTextColor(e.target.value);
    }
    const handleColorChange = (e) => {
        var c = e.target.value.match(/[0-9a-f]{6}$/i);
        console.log(c);
        if (c == null && e.target.value.length > 0){
            setBgColorError(true);
        } else{
            setBgColorError(false);
        }
        setColorValue(e.target.value);
    }
    const validateHexColor = (color) => {
        if (bgColorError){
            console.log('not valid');
            return '';
        }
        if (color[0] === '#'){
            return color.slice(1);
        }
        return color;
    }
    const submitForm = (e) => {
        e.preventDefault();
        var bgColor = validateHexColor(colorValue);
        setImageProps({text: textValue, color: bgColor, textColor: textColorValue});
    }
    return (
        <div>
            <Paper className={classes.root}>
                <Typography>Imgix Generator</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <form className="imgix-form" noValidate autoComplete="off"
                            onSubmit={submitForm}
                        >
                        <TextField
                            id="text"
                            label="Text"
                            className={classes.textField}
                            value={textValue}
                            onChange={handleTextChange}
                            margin="normal"
                        />
                        <FormControl className={classes.formControl} margin="normal">
                        <InputLabel htmlFor="text-color">Text Color</InputLabel>
                            <Select
                                value={textColorValue}
                                onChange={handleTextColorChange}
                                inputProps={{
                                    name: 'text-color',
                                    id: 'text-color',
                                }}
                            >
                            <MenuItem value={'000000'}>Black</MenuItem>
                            <MenuItem value={'FFFFFF'}>White</MenuItem>
                        </Select>
                        </FormControl>
                        <TextField
                            error={bgColorError}
                            id="color"
                            label="Color"
                            className={classes.textField}
                            value={colorValue}
                            onChange={handleColorChange}
                            margin="normal"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">#</InputAdornment>,
                            }}
                        />
                        <Button variant="contained" color="primary" onClick={submitForm}>Submit</Button>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Imgix imageSettings={imageProps} />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default ImageGenerator;
