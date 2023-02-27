import { Button } from 'ui';
import { styles } from './CharactorSection.styles';
import { useClasses } from 'hooks';
import { Container, Grid, Paper, Stack } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const CharactorSection = () => {
    const {
    } = useClasses(styles);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
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

    return (
        <div style={{ width: "100%" }}>
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
        </div>
    );
};
