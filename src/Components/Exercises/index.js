import React, { Fragment } from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  withStyles
} from "@material-ui/core";
import {Delete, Edit} from '@material-ui/icons'
import Form from './Form'
import {withContext} from '../../context'

// styling theme for views
const styles = theme => ({
  paper: {
    padding: theme.spacing(3),
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginTop: 5,
      height: 'calc(100% - 10px)'
    },
    [theme.breakpoints.down('xs')]: {
      height: '100%'
    }
  },
  '@global': {
    'html, body, #root': {
      height: '100%'
    }
  },
  container: {
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px - 48px)'
    },
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100% - 56px - 48px)'
    }
  },
  item: {
    [theme.breakpoints.down('xs')]: {
      height: '50%'
    }
  }
})

const Exercises = function ({ 
  classes,
  muscles,
  exercisesByMuscle, 
  category, 
  editMode,
  onSelect, 
  exercise,
  exercise: {
    id, 
    title = 'Welcome', 
    description = 'Please select an excercise from the list on the left'
  },
  onDelete,
  onSelectEdit,
  onEdit 
}) 
{
  return (
    <Grid container className={classes.container}>
      {/* Left pane */}
      <Grid item className={classes.item} xs={12} sm={6}>
        <Paper className={classes.paper}>
          {exercisesByMuscle.map(([group, exercises]) =>
            !category || category === group ? (
              <Fragment key={group}>
                <Typography
                  color='secondary'
                  variant="subtitle1"
                  key={group}
                  style={{ textTransform: "capitalize" }}
                >
                  {group}
                </Typography>
                <List component="ul">
                  {exercises.map(({ id, title }) => (
                    <ListItem button key={id} onClick={() => onSelect(id)}>
                      <ListItemText primary={title} />
                      <ListItemSecondaryAction>
                        <IconButton color='secondary' onClick={() => onSelectEdit(id)}>
                          <Edit />
                        </IconButton>
                        <IconButton color='primary' onClick={() => onDelete(id)}>
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Fragment>
            ) : null
          )}
        </Paper>
      </Grid>
      {/* Right pane */}
      <Grid item className={classes.item} xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography 
              variant="h6"
              color='secondary'
              gutterBottom
              >
              {title}
          </Typography>
          {editMode ? (
            <Form 
            key={id}
            exercise={exercise}
            muscles={muscles}
            onSubmit={onEdit}
            />
          ) : (
            <Fragment>
              <Typography 
              variant="subtitle2" 
              >
                {description}
              </Typography>
            </Fragment>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withContext(withStyles(styles)(Exercises))