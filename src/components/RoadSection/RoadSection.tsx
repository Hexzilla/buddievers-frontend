import { Button } from 'ui';
import { styles } from './RoadSection.styles';
import { useClasses } from 'hooks';
import { Container, Grid, Paper, Stack } from '@mui/material';
import Carousel from 'react-multi-carousel';

export const RoadSection = () => {
    const {
        container,
        stepContainer,
        title,
        roadNumbers,
        roadExp,
        roadEnd,
        carouselItems,
        roadImg,
        roadCarousel
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
            <p className={title}>ROADMAP</p>
            <div className={stepContainer}>
                {/* <img src="./Section6.png" style={{width: "100%"}}/> */}
                <Carousel
                    arrows={true}
                    swipeable={true}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={5000}
                    keyBoardControl={true}
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    className={ roadCarousel }
                >
                    <div>
                        <Grid container spacing={4}  className={ carouselItems }>
                            <Grid item lg={2} sm={12}>
                                <img src="./charactor (1).png" className={ roadImg } />
                            </Grid>
                            <Grid item lg={3} sm={12} style={{ display : "flex", flexDirection : "column", }}>
                                <div className={roadNumbers}>
                                    <h1>01</h1>
                                    <p>LAUNCH</p>
                                </div>
                            </Grid>
                            <Grid item lg={4} sm={12} style={{ display : "flex", alignItems : "center", }} >
                                <ul className={ roadExp }>
                                    <li>Launch Twitter and Discord</li>
                                    <li>BUDDIES NFTs listing start</li>
                                    <li>Announcement: weekly CBD raffle</li>
                                    <li>Announcement: Crazy Games</li>
                                </ul>
                            </Grid>
                        </Grid>
                    </div>

                    <div>
                        <Grid container spacing={4} className={ carouselItems }>
                            <Grid item lg={2} sm={12}>
                                <img src="./charactor (2).png" className={ roadImg } />
                            </Grid>
                            <Grid item lg={3} sm={12} style={{ display : "flex", flexDirection : "column", }}>
                                <div className={roadNumbers}>
                                    <h1>02</h1>
                                    <p>MID COLLECTION</p>
                                </div>
                            </Grid>
                            <Grid item lg={4} sm={12} style={{ display : "flex", alignItems : "center", }} >
                                <ul className={ roadExp }>
                                    <li>Free merchandise for holders</li>
                                    <li>New tool: Buddies Alpha Trading</li>
                                    <li>Free banner airdrop</li>
                                    <li>BUDDIES Bank creation</li>
                                </ul>
                            </Grid>
                        </Grid>
                    </div>

                    <div>
                        <Grid container spacing={4} className={ carouselItems }>
                            <Grid item lg={2} sm={12}>
                                <img src="./charactor (3).png" className={ roadImg } />
                            </Grid>
                            <Grid item lg={3} sm={12} style={{ display : "flex", flexDirection : "column", }}>
                                <div className={roadNumbers}>
                                    <h1>03</h1>
                                    <p>LAUNCH</p>
                                </div>
                            </Grid>
                            <Grid item lg={4} sm={12} style={{ display : "flex", alignItems : "center", }} >
                                <ul className={ roadExp }>
                                    <li>BUDDIES Bank starts working</li>
                                    <li>Free BONG NFT airdrop</li>
                                    <li>Free banner airdrop</li>
                                    <li>Statue raffle</li>
                                    <li>Skybreach & Bit.Country plots acquisition</li>
                                </ul>
                            </Grid>
                        </Grid>
                    </div>

                    <div>
                        <Grid container spacing={4} className={ carouselItems }>
                            <Grid item lg={2} sm={12}>
                                <img src="./charactor (4).png" className={ roadImg } />
                            </Grid>
                            <Grid item lg={3} sm={12} style={{ display : "flex", flexDirection : "column", }}>
                                <div className={roadNumbers}>
                                    <h1>04</h1>
                                    <p>DEVELOPMENT PHASE</p>
                                </div>
                            </Grid>
                            <Grid item lg={4} sm={12} style={{ display : "flex", alignItems : "center", }} >
                                <ul className={ roadExp }>
                                    <li>New BUDDIES brand</li>
                                    <li>BUDDIES Economy Bible creation</li>
                                    <li>BUDDIES lore / comic</li>
                                    <li>Free banner airdrop</li>
                                    <li>New tools: alpha, APY hunters, Public Library</li>
                                </ul>
                            </Grid>
                        </Grid>
                    </div>

                    <div>
                        <Grid container spacing={4} className={ carouselItems }>
                            <Grid item lg={2} sm={12}>
                                <img src="./charactor (5).png" className={ roadImg } />
                            </Grid>
                            <Grid item lg={3} sm={12} style={{ display : "flex", flexDirection : "column", }}>
                                <div className={roadNumbers}>
                                    <h1>05</h1>
                                    <p>MOONBUDDIES</p>
                                </div>
                            </Grid>
                            <Grid item lg={4} sm={12} style={{ display : "flex", alignItems : "center", }} >
                                <ul className={ roadExp }>
                                    <li>Collection launch in Exosama Network</li>
                                    <li>Launching Buddies web3</li>
                                    <li>Introducing resources system / circular economy</li>
                                    <li>Moonbank creation</li>
                                    <li>Launching 'The Buddieverse'</li>
                                </ul>
                            </Grid>
                        </Grid>
                    </div>

                    <div>
                        <Grid container spacing={4} className={ carouselItems }>
                            <Grid item lg={2} sm={12}>
                                <img src="./charactor (6).png" className={ roadImg } />
                            </Grid>
                            <Grid item lg={3} sm={12} style={{ display : "flex", flexDirection : "column", }}>
                                <div className={roadNumbers}>
                                    <h1>06</h1>
                                    <p>MOON AND BEYOND</p>
                                </div>
                            </Grid>
                            <Grid item lg={3} sm={12} style={{ display : "flex", alignItems : "center", }} >
                                <ul className={ roadExp }>
                                    <li>BUDDIES labs</li>
                                    <li>High Buddies</li>
                                    <li>New utilities inside The Buddieverse</li>
                                </ul>
                            </Grid>
                            <Grid item lg={3} sm={12} style={{ display : "flex", alignItems : "center", }}>
                                <div></div>
                                <div className={ roadEnd }>
                                    <p>THERE IS NO END OF THE ROAD</p>
                                    <h1>JOIN BUDDIES ST.</h1>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};
