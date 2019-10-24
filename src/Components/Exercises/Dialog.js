import React, { Fragment, Component } from 'react'
import {
  Dialog,
  DialogContent, 
  DialogTitle, 
  DialogContentText,
  Fab
} from '@material-ui/core'
import {Add} from '@material-ui/icons'; 
import Form from './Form'
import { withContext } from '../../context'

//a modal to add new exercises to the db
class CreateDialog extends Component {
  
  state = {
    open: false
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleFormSubmit = (exercise) => {
    this.handleToggle()
    this.props.onCreate(exercise)
  }

  render(){
    const {open} = this.state
    const {muscles} = this.props

    return (
          <Fragment>
            <Fab 
            size="small" 
            onClick={this.handleToggle} 
            color="secondary"
            padding="20"
            >
              <Add />
            </Fab>
            <Dialog
              open={open}
              onClose={this.handleToggle}
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle>Create a New Exercise</DialogTitle>
              <DialogContent>
                <DialogContentText>Enter data in form below</DialogContentText>
                <Form muscles={muscles} onSubmit={this.handleFormSubmit} />
              </DialogContent>
            </Dialog>
          </Fragment>
        )
  }
}

export default  withContext(CreateDialog)