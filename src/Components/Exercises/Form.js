import React, { Component } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button
} from "@material-ui/core";


export default class extends Component {
    state = this.getInitialState()

    getInitialState() {
      const {exercise} = this.props

      return exercise ? exercise : {
        title: "",
        description: "",
        muscles: ""
      }
    }

    handleChange = name => ({ target: { value } }) => {
      this.setState({
          [name]: value
      });
    };

    handleSubmit = () => {
      //TODO validation

      this.props.onSubmit({
        id: this.state.title.toLocaleLowerCase().replace(/ /g, "-"),
        ...this.state 
      });
    };

    render() {
      const {title, description, muscles} = this.state
      const { exercise, muscles: categories } = this.props;

      return (
        <form>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={this.handleChange("title")}
            margin="normal"
          />
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="muscles">Muscles</InputLabel>
            <Select value={muscles} onChange={this.handleChange("muscles")}>
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <TextField
            fullWidth
            multiline
            rows="4"
            label="Description"
            value={description}
            onChange={this.handleChange("description")}
            margin="normal"
          />
          <br/>
          <Button 
            onClick={this.handleSubmit}
            color="primary" 
            variant="contained"
            disabled={!title || !muscles}
            >
              {exercise ? 'Edit' : 'Create'}
            </Button>
        </form>
      );
    }
  }
