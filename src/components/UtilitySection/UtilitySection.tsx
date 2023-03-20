import { Button } from 'ui';
import { styles } from './UtilitySection.styles';
import { useClasses } from 'hooks';
import { Container, Grid, Paper, Stack } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const UtilitySection = () => {
    const {
        container,
        leftContainer,
        subTitleText,
        titleText,
        mainText,
        leftTextWrapper
    } = useClasses(styles);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }

    return (
        <div className={container}>
            <p className={titleText}>UTILITY</p>
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
                <div style={{ width: "100%" }}>
                    <Grid container spacing={0}>
                        <Grid item lg={6} sm={12} className={leftContainer} >
                            <div className={leftTextWrapper}>
                                <p className={subTitleText}>Into the Buddieverse</p>
                                <p className={mainText}>Our own 3D metaverse full of fun and utility.</p>
                                <p className={mainText}>Walk into Buddieverse, play games, buy composable NFTs, learn in the University, read our official comic in the kiosk, bet in the Casino, promote your business on the billboards or even order your own building. You can do everything in Buddies St.</p>
                            </div>
                        </Grid>
                        <Grid item lg={6} sm={12} style={{textAlign: "center"}}>
                            <img
                                src="./utility (1).png"
                                style={{ width: "100%"}}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div style={{ width: "100%" }}>
                    <Grid container spacing={0}>
                        <Grid item lg={6} sm={12} className={leftContainer} >
                            <div className={leftTextWrapper}>
                                <p className={subTitleText}>Alpha trading</p>
                                <p className={mainText}>BUDDIES have access to professional trading calls provided for free. With an 80% success rate, BAT users can recoup their investment and continue to profit</p>
                            </div>
                        </Grid>
                        <Grid item lg={6} sm={12} style={{textAlign: "center"}}>
                            <img
                                src="./utility (2).png"
                                style={{ width: "100%"}}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div style={{ width: "100%" }}>
                    <Grid container spacing={0}>
                        <Grid item lg={6} sm={12} className={leftContainer} >
                            <div className={leftTextWrapper}>
                                <p className={subTitleText}>Buddies capital</p>
                                <p className={mainText}>BUDDIES can share investment ideas with fellow holders. If the idea passes with a governance vote, the proposing BUDDIE will get 20% of the profits with the rest going to the community bank</p>
                            </div>
                        </Grid>
                        <Grid item lg={6} sm={12} style={{textAlign: "center"}}>
                            <img
                                src="./utility (3).png"
                                style={{ width: "100%"}}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div style={{ width: "100%" }}>
                    <Grid container spacing={0}>
                        <Grid item lg={6} sm={12} className={leftContainer} >
                            <div className={leftTextWrapper}>
                                <p className={subTitleText}>Public library</p>
                                <p className={mainText}>BUDDIES love to learn, and we share knowledge pertaining to blockchain technology, trading, coding, and so much more within a dedicated channel</p>
                            </div>
                        </Grid>
                        <Grid item lg={6} sm={12} style={{textAlign: "center"}}>
                            <img
                                src="./utility (4).png"
                                style={{ width: "100%"}}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div style={{ width: "100%" }}>
                    <Grid container spacing={0}>
                        <Grid item lg={6} sm={12} className={leftContainer} >
                            <div className={leftTextWrapper}>
                                <p className={subTitleText}>NFT staking</p>
                                <p className={mainText}>Stake your BUDDIE NFT to receive Buddieverse resources. These can be used to purchase merchandise, join raffles, and more!</p>
                            </div>
                        </Grid>
                        <Grid item lg={6} sm={12} style={{textAlign: "center"}}>
                            <img
                                src="./utility (5).png"
                                style={{ width: "100%"}}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Carousel>
        </div>
    );
};
