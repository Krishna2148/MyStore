import {Provider} from "react-redux"
import MyRoutes from "./MyRoutes";
import './mystyles.css'
import { store } from "./reducers/store";

function App() {
  return (
    <>
    <Provider store ={store}>
      <MyRoutes/>

    </Provider>
    </>
  );
}

export default App;

/*
Features: 
  Component based
  Component name must start with block letter(uppercase alphabet)
  return can have only one child element
  <> </>  - react fragment


  language: javascript
  script/syntax : JSX (javascript + xml)
    every tag has its closing tag
    eg: <div></div>, <br></br> , <hr /> , <input /> , <img />
    class -> className
    label for -> label htmlFor



*/