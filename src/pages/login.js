import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.loginAndSignup
});

class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/login', userData)
           .then(res => {
               console.log(res.data);
               localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
               this.setState({
                   loading: false
               });
               this.props.history.push('/');
           })
           .catch(err => {
               this.setState({
                   errors: err.response.data,
                   loading: false
               })
           })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
           <Grid container className={classes.form}>
               <Grid item sm/>
               <Grid item sm>
                   <img src={AppIcon} alt="monkey" className={classes.image} />
                   <Typography variant="h2" className={classes.pageTitle}>Login</Typography>
                   <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="email" 
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            className={classes.textField}
                            value={this.state.email} 
                            onChange={this.handleChange} fullWidth />
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="password" 
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            className={classes.textField}
                            value={this.state.password} onChange={this.handleChange} fullWidth />

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}    
                        <Button 
                            type="submit" 
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            className={classes.button}>
                                Login
                                {loading &&(
                                    <CircularProgress className={classes.progress} />
                                )}
                        </Button>
                        <br />
                        <small>Don't have an account? Sign Up <Link to='/signup'>Sign Up</Link></small>    
                   </form>
               </Grid>
               <Grid item sm/>
           </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login);
