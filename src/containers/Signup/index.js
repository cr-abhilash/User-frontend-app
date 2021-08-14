import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";

/**
 * @author
 * @function Signup
 **/

const Signup = (props) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const auth = "";
  const user = "";


  useEffect(() => {
      setPassword("");
      setEmail("");
      setGender("")
      setAddress("")
      setContact("")
      setName("")
  }, []);

  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      name,
      contact,
      email,
      password,
      address,
      gender
    };
    console.log(user,props);
    props.handleSignUp(user);
  };

  if (props.login) {
    return <Redirect to={`/`} />;
  }



  return (
    <Layout>
      <Container>
        {user.message}
        <Row style={{ marginTop: "100px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Input
                label="User Name"
                placeholder="Enter your name"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required={true}

                minlength={6}
              />

              <Input
                label="Contact"
                placeholder="Enter your contact number"
                value={contact}
                type="tel"
                onChange={(e) => setContact(e.target.value)}
                pattern="[0-9]{10}"
              />

              <Input
                label="Address"
                placeholder="Enter your address"
                value={address}
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                label="Gender"
                placeholder="Select your Gender"
                value={gender}
                type="select"
                onChange={(e) => setGender(e.target.value)}
                options={["Male", "Female", "Others", "Not to disclose"]}
              />

              <Button variant="primary" type="submit">
                SignUp
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
