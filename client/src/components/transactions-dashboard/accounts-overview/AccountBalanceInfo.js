import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Button, Typography, Collapse } from '@material-ui/core';

const AccountBalanceInfo = props => {
  const { classes, accountInfo } = props;
  const { prefix, accountNumber, bankCode, user, color, accountBalance } = accountInfo;
  const balance = accountBalance || 0;
  const account = `${prefix}${prefix ? '-' : ''}${accountNumber}/${bankCode}`;
  const [isHoveredOver, handleHover] = React.useState(false);
  return (
    <div>
      <Card
        className={classes.card}
        style={{ borderLeft: `6px solid ${color}` }}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <CardContent className={classes.content}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Account info:
          </Typography>
          <Typography className={classes.pos} component="p">
            {account}
            <br />
            {user}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Account balance:
          </Typography>
          <Typography variant="h5" component="h2">
            {balance.toLocaleString('cs-cz', { style: 'currency', currency: 'CZK' })}
          </Typography>
        </CardContent>
        <Collapse in={isHoveredOver}>
          <CardActions className={classes.actions}>
            <Button size="small" color="primary">
              Edit
            </Button>
            <Button size="small" color="secondary">
              Delete
            </Button>
          </CardActions>
        </Collapse>
      </Card>
    </div>
  );
};

const styles = {
  card: {
    minWidth: 220,
    maxWidth: 275
  },
  actions: {
    paddingTop: 0,
    marginTop: -5
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

export default withStyles(styles)(AccountBalanceInfo);
