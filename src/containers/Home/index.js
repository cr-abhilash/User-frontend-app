import React from 'react';
import Layout from '../../components/Layout';
import { Jumbotron, Row, Col, Container } from 'react-bootstrap';
import './style.css';
import { NavLink } from 'react-router-dom';

/**
* @author
* @function Home
**/

const Home = (props) => {
 console.log(props)
  return (
    <Layout sidebar {...props}>

      
      
  

      <Jumbotron style={{margin: '5rem', background: '#fff'}} className="text-center">
            <h1> Hi, {props?.userData?.name}, Welcome to User App.</h1>
        </Jumbotron>
    </Layout>
  )

}

export default Home