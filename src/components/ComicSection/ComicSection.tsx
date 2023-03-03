import * as React from 'react';
import { Button } from 'ui';
import { styles } from './ComicSection.styles';
import { useClasses } from 'hooks';
import { Container, Grid, Paper, Stack, Dialog, DialogActions, DialogTitle, DialogContent  } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const ComicSection = () => {
    const {
        container,
        title,
        description,
        button,
        comicImage
    } = useClasses(styles);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={container}>
            <Grid container>
                <Grid item md={7} sm={12}>
                    <div style={{flex:1}}>
                        <p className={title}>BUDDIES COMIC</p>
                        <p className={description}>Incredible stories every month!</p>
                    </div>
                </Grid>
                <Grid item md={3} sm={ 0 }>
                    <img
                        className={comicImage}
                        src="./budscomics.png"
                    />
                </Grid>
                <Grid item md={2} sm={12} style={{ display : "flex", flexDirection : "column" }}>
                    <Button
                        className={button}
                        variant="contained"
                        onClick={handleClickOpen}
                    >
                        READ IT
                    </Button>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                <DialogTitle id="dialog-title">
                {"BUDDIES COMICS"}
                </DialogTitle>
                <DialogContent>
                    <Carousel
                        arrows={false}
                        swipeable={true}
                        draggable={false}
                        showDots={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={3000}
                        keyBoardControl={true}
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                    {
                        Array(15).fill(0).map((item, i) => <img
                        key={`${i}`}
                        src={`./charactor (${i + 1}).png`}
                        style={{width:"100%", height:"100%"}}
                        />)
                    }
                </Carousel>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
