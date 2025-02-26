import React, { ComponentType } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// Define the type for the wrapped component props
export interface WithRouterProps {
  navigate: NavigateFunction;
}

// TypeScript version of withRouter
export const withRouter = <P extends object>(
  Component: ComponentType<P & WithRouterProps>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const navigate = useNavigate();
    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};