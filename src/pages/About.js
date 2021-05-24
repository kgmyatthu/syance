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
                            <p>A computer scientist, and a software engineer with a wide range of interests starting from low-level programming, software development to even cyber security.</p>
                            <br/>
                            <h1>About The Project</h1>
                            <p>Syance is a reactjs application featuring NASA's astronomy picture of the day feed, Sentry earth impact risk assessments and near earth object orbital visualization along side its data all in one place.</p>
                            <p>The initial idea is to be able to browse NASA's APOD like a facebook news feed or twitter's, but i've always been secretly passionate about astronomy that i wanted to do somthing contributing to the astronomy community. And that's how this project started and later i would probably add more such as NASA's small body database with custom table generation and other features.</p>
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