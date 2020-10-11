import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const About = lazy(() => import('./About'));
const Home = lazy(() => import('./Home'));

/*
 A good way to improve loading times for PWAs is to ensure that the code is not built into big files. 

 This (above About & Home variables) is the syntax to lazily load components in React. You’ll note that it internally uses the 
 dynamic import() syntax, which webpack uses as a “split point.”

 The <Suspense> component will render the <div>Loading...</div> while it waits for a route’s code to be dynamically loaded. 
 This ensures that users load files as they need to and that those files should not be too large — great performance that 
 will scale.

 Before code split:
    47.42 KB  build\static\js\2.b0d049fb.chunk.js     
    1.07 KB   build\static\js\main.9d920572.chunk.js  
    784 B     build\static\js\runtime-main.f4c23f94.js
    278 B     build\static\css\main.5ecd60fb.chunk.css


 After code split"
    47.42 KB          build\static\js\2.b0d049fb.chunk.js
    1.18 KB (+429 B)  build\static\js\runtime-main.b1fa35d4.js
    1.11 KB (+40 B)   build\static\js\main.ace14394.chunk.js
    278 B             build\static\css\main.5ecd60fb.chunk.css
    233 B             build\static\js\4.b341bc01.chunk.js
    229 B             build\static\js\3.b8b1d755.chunk.js

*/
const App: React.FC = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    </Suspense>
  </Router>
);

export default App;