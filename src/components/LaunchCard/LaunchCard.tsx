import React from 'react';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import Typography from '@material-ui/core/Typography/Typography';

import './LaunchCard.css';

function LaunchCardImage({ name, imageSrc }: { name: string, imageSrc: string | null }) {
  if (!imageSrc) return null;

  return (
    <CardMedia>
      <img src={imageSrc} alt={name} className="card-image" />
    </CardMedia>
  );
}

function LaunchCard({ name, details, imageSrc, date_utc }: { name: string, details: string, imageSrc: string | null, date_utc: string }) {
  return (
    <Card>
      <LaunchCardImage
        name={name}
        imageSrc={imageSrc}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {details}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {date_utc}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default LaunchCard;
