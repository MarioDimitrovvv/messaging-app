import { Container, Jumbotron } from "react-bootstrap";

const About = () => {
    return (
        <Jumbotron fluid>
            <Container>
                <h1>About Messaging App</h1>
                <hr className="my-4"></hr>
                <h5 className="mt-20">
                    Messaging App is place where you can chat with your friends and maybe make new ones. :)
                </h5>
            </Container>
        </Jumbotron>
    )
}

export default About;