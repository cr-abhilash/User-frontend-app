import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table ,Button} from "react-bootstrap";

import "./style.css";
import Input from "../../components/UI/Input";

/**
 * @author
 * @function Products
 **/

const Users = (props) => {
  
  const [searchText,setSerchText]=useState(props.searchText)
  
  const users= searchText && props?.searchUsers.length?props?.searchUsers:props.users;
  const renderUsers = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0
            ? users.map((user,index) => (
                <tr key={user._id}>
                  <td>{index}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.contact}</td>
                  <td>{user?.address}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  return (
    <Layout sidebar {...props}>
      <Container style={{marginTop:"20px"}}>
      <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Users Info</h3>
              <div style={{flex:1,padding:"0px 15px 0px 30px"}}>
              <Input 
                  label=""
                  placeholder="Search by user name or contact"
                  value={searchText}
                  type="email"
                  onChange={(e) => setSerchText(e.target.value)}
                  onKeyPress={(e)=> {
                   
                    if(e.key==="Enter"){
                      e.preventDefault();
                      props.handleSearchUsers(searchText)
                    }
                  }}
              />
              </div>
              <Button variant="primary" style={{height:"35px"}} onClick={()=>props.handleSearchUsers(searchText)}>
                    Search
              </Button>
            </div>
          </Col>        
        </Row>
        <Row>
          <Col>{renderUsers()}</Col>
        </Row>
      </Container>
      
    </Layout>
  );
};

export default Users;
