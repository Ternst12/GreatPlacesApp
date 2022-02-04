import React, {useEffect} from "react"
import { StyleSheet, Text, View } from 'react-native'; 
import { init } from './helpers/db';
import RootNavigation from "./navigation/index"
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from "redux-thunk"
import placesReducer from './store/reducers/PlacesReducer';
import authReducer from "./store/reducers/AuthReducers";


init().then(() => {
  console.log("Initialized database");
}).catch(err => {
  console.log("Initializing database failed. = ", err)
})


export default function App() {
  const rootReducer = combineReducers({
    places: placesReducer,
    auth: authReducer
  })
  
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
