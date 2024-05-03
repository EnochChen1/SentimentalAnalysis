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
const api = "https://eglsgolhn6.execute-api.us-east-1.amazonaws.com/dev/sentiment_analysis";


function handleSubmit(e) {
  e.preventDefault();
  setSentence(e.currentTarget.sentence.value);

  fetchSentiment(sentence);



  
}
  

export function fetchSentiment(sentence) {
  var request = fetch(api, {
    method:'GET',
    headers: {
      'Content-Type':'application/json',
      'sentence':sentence
    }
  })
  .then(response => response.json())
  .then((data) => {return data;})
  .catch(error => console.log("Error while fetching", error));
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
