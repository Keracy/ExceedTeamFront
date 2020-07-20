import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, CardMedia } from "@material-ui/core";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import SimpleMenu from "./Menu/Menu";

const useStyles = makeStyles({
  username: {
    color: "black",
  },
  add_icon: {
    width: "40px",
    cursor: "pointer",
  },
  media: {
    height: 400,
    width: "100%",
  },
  root: {
    border: "1px solid black",
  },
  card_actions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default function User(props) {
  const s = useStyles();
  return (
    <div>
      <div className={s.user}>
        <Card className={s.root}>
          <Link to={"/" + props.id}>
            <CardActionArea>
              <CardMedia
                className={s.media}
                image={`https://robohash.org/${props.id}`}
                title={props.name}
              />
              <CardContent>
                <Typography
                  className={s.username}
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  {props.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <Typography>{props.phone}</Typography>
                  <Typography>{props.email}</Typography>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions className={s.card_actions}>
            <SimpleMenu id={props.id} />
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
