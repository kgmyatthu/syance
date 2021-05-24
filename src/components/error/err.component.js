import React from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import Footer from '../footer/footer.component';
import Navigation from '../nav/nav.component';
import styles from './err.module.css';

class ErrBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
        console.log(error);
        console.log(errorInfo);
    }
  
    render() {
        if(this.state.hasError){
            return (
                <>
                    <Navigation/>
                        <Container>
                            <Row>
                                <Col>
                                    <Jumbotron className={styles.jumbo}>
                                        <h3>Oops Somthing Went Wrong</h3>
                                        <p>This is unexpected, if this error still persist after multiple attempt to resolve, contact the developer</p>
                                        <Footer/>           
                                    </Jumbotron>
                                </Col>
                            </Row>
                        </Container>
                </>
            )
        }
        return this.props.children;
    }
  }
export default ErrBoundary;



export const NotFound = () => {
    return (
        <>
                    <Navigation/>
                        <Container>
                            <Row>
                                <Col>
                                    <Jumbotron className={styles.jumbo}>
                                        <h1>404</h1>
                                        <p>Page Does Not Exist</p>
                                    </Jumbotron>
                                </Col>
                            </Row>
                        </Container>
                    <Footer/>           
        </>
    )
}
