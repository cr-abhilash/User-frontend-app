import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import axiosInstance from './helpers/axios';
import { api } from './urlConfig';
import Users from './containers/Products';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  




function App() {

   const [login,setLogin] = useState(false);
   const [userData,setUserData] = useState({});
   const [users, setUsers]=useState([]);
   const [searchUsers,setSearchUsers]=useState([]);
   const [searchText, setSearchText]=useState([]);

  //componentDidMount or componentDidUpdate
  useEffect(() => {
  const  token=localStorage.getItem('token');
  const name =localStorage.getItem('name');
  
  if(token){
   setLogin(true);
   setUserData({name})
   getUsers()
  }
  }, []);
  
  const handleSignIn =(data)=>{
    axiosInstance.post(api+"/signin",data).then(res=>{
      localStorage.setItem('token',res?.data?.token);
      setLogin(true);
      setUserData(res.data.userData);
      localStorage.setItem('name',res?.data?.userData?.name);
      getUsers();
    }).catch((err)=>{
      toast(err?.response?.data?.message ||
        "Please enter valid Username and Password.")
    })
  }

  const handleSignout = () =>{
    axiosInstance.post(api+"/signout",{}).then(res=>{
      localStorage.clear();
      setLogin(false)
      setUserData({})
    }).catch((err)=>{
      if(err?.response?.status==401){
        setLogin(false);
        setUserData({});
        localStorage.clear();
        toast("Token expired please login again");
      }
    })
  }

  const handleSignUp = (data) => {
    axiosInstance.post(api+"/signup",data).then(res=>{
      localStorage.setItem('token',res?.data?.token);
      localStorage.setItem('name',res?.data?.userData?.name);
      setLogin(true)
      setUserData(res.data.userData)
      getUsers()
    }).catch((err)=>{
      toast(err?.response?.data?.message
            || "Unable to sign up please try again"        )
    })
  }
  
  const getUsers = () => {
    axiosInstance.get(api+"/all").then(res=>{
      setUsers(res?.data?.users)
     
    }).catch((err)=>{
      if(err?.response?.status==401){
        setLogin(false);
        setUserData({});
        localStorage.clear();
        toast("Token expired please login again");
      }
    })
  }

  const handleSearchUsers = (searchText) => {
    setSearchText(searchText)
    axiosInstance.get(api+`/search?text=${searchText}`).then(res=>{
       setSearchUsers(res?.data?.data)
    }).catch((err)=>{
      if(err?.response?.status==401){
        setLogin(false);
        setUserData({});
        localStorage.clear();
        toast("Token expired please login again");
      }
    })
  }

  return (
    <div className="App">
      <ToastContainer/>
      <Switch>
        <PrivateRoute path="/" exact login={login} component={()=><Home login={login} userData={userData} handleSignout={handleSignout}/> } />
        <PrivateRoute path="/users" exact login={login} component={()=><Users login={login} userData={userData} handleSignout={handleSignout} getUsers={getUsers} searchUsers={searchUsers} users={users} handleSearchUsers={handleSearchUsers} searchText={searchText} setSearchText={setSearchText}/> } />
        <Route path="/signin" component={()=><Signin handleSignIn={handleSignIn} login={login}/>} />
        <Route path="/signup" component={()=><Signup handleSignUp={handleSignUp} login={login}/>} />
      </Switch>
    </div>
  );
}

export default App;
