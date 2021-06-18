import React from 'react';
import './SignInandSignUpTabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SignIn from '../LoginPage/SignIn';


export default class SignInandSignUpTabs extends React.Component {

  render(){
  return (
      <Tabs 
      forceRenderTabPanel={true}
      defaultIndex={0} 
      onSelect={index => console.log(index)}>
        <TabList className={'firstTab'}>
          <Tab className={'tabName'} tabIndex="0">Se connecter</Tab>
          
        </TabList>
        <TabPanel>
          <h2 className="titleAuth" >Identifiez-vous pour accéder à Evanescence</h2>
          <SignIn log={this.props.login}/>
        </TabPanel>
       
      </Tabs>
  )
  }
} 
