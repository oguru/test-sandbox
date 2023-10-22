import {useRef} from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import {Link, Route} from "react-router-dom";

type RouteData = {
   path: string;
   name: PageCap;
}

type JSXElementsObject = {
   [key in PageCap]: JSX.Element;
}

type PageLower = "about" | "info" | "articles" | "home" | "admin";

type PageCap = "About" | "Info" | "Articles" | "Home" | "Admin";

type PageRefs = {
   [key in PageLower]: HTMLDivElement | null;
}

const TestComp = ({route}: {route: string}) => {
   return (
      <div>{route}</div>
   )
}

export default function App() {

  const pageRefs = useRef<PageRefs>({
   about: null,
   articles: null,
   admin: null,
   home: null,
   info: null
});

  const routes: RouteData[] = [
   {
      path: "/",
      name: "Home"
   },
   {
      path: "/about",
      name: "About"
   },
   {
      path: "/info",
      name: "Info"
   },
   {
      path: "/admin",
      name: "Admin"
   },
   {
      path: "/articles",
      name: "Articles"
   }
];

const components: JSXElementsObject = {
   "About":
      <TestComp route="about"/>,
   "Admin":
      <TestComp route="admin"/>,
   "Articles":
      <TestComp route="articles"/>,
   "Home":
      <TestComp route="home"/>,
   "Info":
      <TestComp route="info"/>
};

  return (
   <>
      {routes.map((route) => (
         <Link style={{padding: "10px"}} to={route.path}>{route.name}</Link>
      ))}
      {routes.map((route) => (
         <Route
            key={route.path}
            exact path={route.path}
         >
            {({match}) => (
               <CSSTransition
                  in={match != null}
                  nodeRef={pageRefs.current[route.name.toLowerCase() as PageLower]}
                  timeout={400}
                  unmountOnExit
               >
                  <div
                     ref={pageRefs.current[route.name.toLowerCase() as PageLower] as HTMLDivElement}
                  >
                     {route.name === "Articles" ?
                        components[route.name] :
                        (
                           <div>{components[route.name]}</div>
                        )}
                  </div>
               </CSSTransition>
            )}
         </Route>
      )) as JSX.Element[]}
   </>
  );
}
