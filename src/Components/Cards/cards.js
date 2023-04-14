import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard({data}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      
        <CardMedia
          component="img"
          alt="Imagem"
          image=""
          title="Imagem"
        />
        <CardContent>
     
          <Typography variant="body2" color="textSecondary" component="p">
            {data}
          </Typography>
          </CardContent>
     
    
    </Card>
  );
}