import React, {useEffect, useState} from "react";
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

const [sentence, setSentence] = useState(null);
const [sentiment, setSentiment] = useState(null);

function handleSubmit(e) {
  e.preventDefault();
  setSentence(e.currentTarget.sentence.value);

  const api = "https://eglsgolhn6.execute-api.us-east-1.amazonaws.com/dev/sentiment_analysis";

  React.useEffect(() => {
    $.get(api, {
      sentence: sentence
    },
    function (sentiment, status) {
      setSentiment = sentiment;
      console.log(status+" "+sentiment);
    });
    }, []);
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
