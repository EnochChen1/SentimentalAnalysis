import React from "react";
import logo from './logo.svg';
import './App.css';
import "@aws-amplify/ui-react/styles.css"

import {Amplify} from 'aws-amplify'

import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  
}


function App({signOut}) {
  return (
    <View className = "App">
      <Card>
        <Heading level={1}> Please enter a sentence for sentiment analysis:  </Heading>
        <form method="post" onSubmit={handleSubmit}>
          <label>
            Text input: <input sentence = "sentence" />
          </label>
          <button type="submit">Submit sentence</button>
        </form>
        
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);
