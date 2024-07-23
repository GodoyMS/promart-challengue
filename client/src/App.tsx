import {useRoutes } from "react-router-dom";

import routes from "./routes";

function App() {
  return useRoutes(routes); // Generate the routing elements based on routes configuration
}

export default App;
