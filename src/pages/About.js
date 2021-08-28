import React from 'react'
import Footer from '../components/footer/footer.component'
import Navigation from '../components/nav/nav.component'
import {Image, Container, Row, Col} from 'react-bootstrap';

const About = () => {
    return (
        <>
            <Navigation/>
                <Container>
                    <Row>
                        <Col md={5} className="mx-auto" style={{textAlign:"center", color:"white",fontFamily:"ibmmono"}}>

                 
                            <Image src="https://avatars.githubusercontent.com/u/24825299?s=400&u=68a71768d8d58217532315142dde0649ec342fe5&v=4" 
                                    roundedCircle
                                    width={200}
                                    height={200}
                                     />
                            <h1>Kaung Myat Thu</h1>
                            <p>A computer scientist, and a software engineer with a wide range of interests.</p>
                            <br/>
                            <h1>About The Project</h1>
                            <p>This site aim to allow astronomy lovers be able to browse NASA astronomy picture of the day feed like main stream social media apps (facebook, twitter etc..). This project consume NASA's open api.</p>
                            <br/>
                            <h1>Contributions</h1>
                            <p>Contribution are really welcome and you can make pull requests, report issue, and make suggestions <a href="https://github.com/kmt29/syance">here</a></p>
                        </Col>
                    </Row>
                </Container>
            <Footer/>
        </>
    )
}
export default About;