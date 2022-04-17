//https://next--material-ui.netlify.app/components/modal/

import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';

import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import { API, Auth } from 'aws-amplify';
import { createSkypeCheckoutSession, updateUserId } from '../../../../graphql/mutations';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51KgUI2IN86oz83ND67uenHLH9hVZdPWc43Uiy5FvEmtIySUJn5sEcia5OpPZFxga9x2apqfgIiGweXc7Mw5O0uJO00EvrwdJVZ');

const useStyles = makeStyles({
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Moneycard(props) {
    const { title, point, money, content, URL } = props;
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const [formData, set] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = async (event) => {
        // When the customer clicks on the button, redirect them to Checkout.
        let user1 = await Auth.currentAuthenticatedUser();
        const uId = user1.attributes.sub;

        const r = await API.graphql({ query: createSkypeCheckoutSession, variables: { input: { userId: uId } } });
        console.log(r);
        const clientReferenceId = r.data.createSkypeCheckoutSession.id;

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{
                price: URL, // Replace with the ID of your price
                quantity: 1,
            }],
            mode: 'payment',
            clientReferenceId: clientReferenceId,
            successUrl: 'http://localhost:3000/PointPurchase/',
            cancelUrl: 'http://localhost:3000/PointPurchase/',
        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
    };
    const onClickEvent = () => {
        window.addEventListener('load', function () {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/serviceWorker.js')
                    .then(function (registration) {
                        return registration.pushManager.getSubscription().then(function (subscription) {
                            console.log("subscription", subscription)
                            if (subscription) {
                                console.log("aaa")
                                return subscription
                            }
                            return registration.pushManager.subscribe({
                                userVisibleOnly: true
                            })
                        })
                    }).then(function (subscription) {
                        var endpoint = subscription.endpoint
                        console.log("pushManager endpoint:", endpoint)
                    }).catch(function (error) {
                        console.log("serviceWorker error:", error)
                    })
            }
        })
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {title}
                </Typography>

                <Typography variant="h5" component="h2">
                    ¥{money}/{point}p
                </Typography>

                <Container maxWidth="sm">
                    <Typography className={classes.pos} color="textSecondary" sx={{ bgcolor: '#cfe8fc' }}>
                        {content}
                    </Typography>
                </Container>
            </CardContent>

            <CardActions>
                <Button size="small"
                    variant="contained"
                    color="success"
                    onClick={() => {
                        handleClick();
                        onClickEvent();
                    }}
                >購入
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <button role="link" onClick={handleClick}>
                            Checkout
                        </button>
                        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography> */}
                    </Box>
                </Modal>
            </CardActions>
        </Card>
    );
}