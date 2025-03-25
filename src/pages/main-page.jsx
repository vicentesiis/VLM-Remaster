import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";
import routes from "@/routes";

export const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Outlet /> {/* Ensures child components render properly */}
      </div>
    </div>
  );
};

// Define routes separately outside of Main component
export const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />}> {/* Ensures Navbar stays */}
      {routes.map(({ path, element, childrens }) => (
        <Route key={path} path={path} element={element}>
          {childrens &&
            childrens.map(({ path: childPath, element: childElement }) => (
              <Route key={childPath} path={childPath} element={childElement} />
            ))}
        </Route>
      ))}
    </Route>
  </Routes>
);

export default Main;