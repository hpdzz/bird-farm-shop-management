import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
export default function Step3() {

    const getCategoryName = (value) => {
        switch (value) {
            case '51d334ad9f0a48a59fa4c7a20f70dcfd':
                return 'Đại bàng';
            case '6a2aab32b3574510a434136b31cec3df':
                return 'Vẹt';
            case '6bc3f28de70c4982b67d3bd1f0011cf2':
                return 'Chào mào';
            default:
                return '';
        }
    };
    const getSexName = (value) => {
        switch (value) {
            case 'true':
                return 'Male';
            case 'false':
                return 'Female';
            default:
                return '';
        }
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Mix summary
            </Typography>
            <List disablePadding>
                <div>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText
                            primary={`Name of your bird: ${localStorage.getItem('name')}`}
                            secondary={`Category: ${getCategoryName(localStorage.getItem('category_id'))}`}
                        />
                        <Typography variant="body2">{`Gender: ${getSexName(localStorage.getItem('sex'))}`}</Typography>
                    </ListItem>
                    <img src={localStorage.getItem('imageFiles')} alt={localStorage.getItem('name')}
                        style={{
                            maxWidth: '461px',
                            height: '261px',
                            borderRadius: '5px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                            transition: '0.3s',
                            marginBottom: '10px'
                        }} />
                </div>
                <div>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText
                            primary={`Name of Bird Farm: ${localStorage.getItem('nameShop')}`}
                            secondary={`Category: ${getCategoryName(localStorage.getItem('category_id'))} | Price: $${localStorage.getItem('priceShop')}`}
                        />
                        <Typography variant="body2">{`Gender: ${(localStorage.getItem('sex') === 'true' ? 'Female' : 'Male')}`}</Typography>
                    </ListItem>
                    <img src={'http://birdsellingapi-001-site1.ctempurl.com/' + localStorage.getItem('imageShop')} alt={localStorage.getItem('nameShop')}
                        style={{
                            maxWidth: '461px',
                            height: '250px',
                            borderRadius: '5px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                            transition: '0.3s',
                            marginBottom: '10px'
                        }} />
                </div>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Cost to mix birds:" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        $29.99
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>

                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>

                </Grid>
            </Grid>
        </React.Fragment>
    );
}