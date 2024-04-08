import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import listRouter from "routes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          {listRouter.map((item, index)=>{
           let Layout;
           const Component = item.component;
           if (item.layout) {
               Layout = item.layout;
           } else {
               Layout = Fragment;
           }
            return <Route path={item.path} element={<Layout><Component/></Layout>}/>
          })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
