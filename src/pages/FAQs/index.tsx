import * as React from 'react';
import { FAQStyles } from './faqs.styles';
import { useClasses } from 'hooks';
import { Button } from 'ui';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `none`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
    />
    ))(({ theme }) => ({
        backgroundColor: "transparent",
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
        color : "white",
        border : "none",
        "& p" : {
            fontSize : "24px",
            fontWeight : "900"
        }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    color : "white",
    background : "rgba(0,0,0,0.5)",
    "& p" : {
        fontSize : "16px",
        fontWeight : "500"
    }
}));


const FAQs = () => {
    const { container, introContainer, button, FAQWrap, mainTitle, bannerTxtContainer  } = useClasses( FAQStyles );
    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const [ FAQs, setFAQ ] = React.useState([
        {
            "id" : 1,
            "Question" : "What is BUDDIES project?",
            "Answer" : "A multi-chain NFT project in the Polkadot ecosystem with 6 core value propositions: Art | Value | Utility | Profitability | Education | Fun.BUDDIES is a project with a long-term vision with a never ending roadmap, always setting new goals and value for its holders.Owning one BUDDIES NFT grants you governance power and access to a private community."
        },
        {
            "id" : 2,
            "Question" : "What is the project vision?",
            "Answer" : "Our goal is not only to become an NFT project leader in the Polkadot ecosystem through amazing tech and developments with a sustainable economy that provide users of fun, learning and never-ending value, but also connecting the project to a real web3 company that develop advanced multi-chain solutions."
        },
        {
            "id" : 3,
            "Question" : "What is OG / Generation 1 BUDDIES?",
            "Answer" : "Genesis collection of BUDDIES project with 50 NFT supply allocated in Kusama Network. OG NFT holders are the board members of the project and have x10 governance power."
        },
        {
            "id" : 4,
            "Question" : "What is MoonBuddies",
            "Answer" : "Generation 2 of BUDDIES project, MoonBuddies is a 500 supply full 3D NFT collection allocated in Exosama Network. MoonBuddies NFT holders have x1 governance power."
        },
        {
            "id" : 5,
            "Question" : "What is the Buddieverse?",
            "Answer" : "The Buddieverse is an immersive 3D experience with multiplayer networking, Resources / economy system, composability in real time and more."
        },
        {
            "id" : 6,
            "Question" : "What is SEEDS?",
            "Answer" : "SEEDS is Buddieverse utility resource and the alpha element of BUDDIES economy."
        },
        {
            "id" : 7,
            "Question" : "What is BUDDIES Bank?",
            "Answer" : "Buddies Bank and MoonBank are the core of the BUDDIES NFT holders economy. These both take a % of every NFT sale for using the funds in different investments and for paying royalties (20% of the 'liquidity' and 'high risk' assets) to holders on 3-6 months time-frames."
        },
        {
            "id" : 8,
            "Question" : "What is BAT?",
            "Answer" : "Buddies Alpha Trading is an education tool that provide BUDDIES and MoonBuddies NFT holders of professional trading signals (No Financial Advice)."
        },
        {
            "id" : 9,
            "Question" : "What is We3kly Web3 R3cap?",
            "Answer" : "BUDDIES weekly newsletter with the most exciting news from the Polkadot ecosystem and beyond. You can subscribe for free here: https://buddies.substack.com/"
        },
        {
            "id" : 10,
            "Question" : "Where I can buy a BUDDIE NFT?",
            "Answer" : "Generation 1: Singular Marketplace - Kusama Network.\n Generation 2: Raresama Marketplace - Exosama Network"
        }
    ]);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };
    const addWhitelist = () => {
        window.open("https://discord.gg/9HSbQQ7gpw")
    }
    const FAQItems = FAQs.map((FAQ) => 
        <Accordion expanded={expanded === 'panel' + FAQ.id} onChange={handleChange('panel' + FAQ.id)}>
            <AccordionSummary aria-controls={"panel" + FAQ.id + "d-content"} id={"panel" + FAQ.id + "d-haeder"}>
                <p>{ FAQ.Question }</p>
            </AccordionSummary>
            <AccordionDetails>
                <p>
                    { FAQ.Answer }
                </p>
            </AccordionDetails>
        </Accordion>
    )
    return(
        <div className={ container }>
            <div className={introContainer}>
                <div className={ bannerTxtContainer }>
                    <p>FREQUENT ASKED QUESTIONS</p>
                </div>
            </div>

            <div className={ FAQWrap }>
                <h1 className={ mainTitle }>LEARN MORE ABOUT THE PROJECT</h1>
                { FAQItems }
            </div>
    </div>
    )
}

export default FAQs; 