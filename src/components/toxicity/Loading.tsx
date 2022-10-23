import { FC } from "react";
import ReactLoading from "react-loading";

export const Loading: FC = () => {
  return <ReactLoading type={"spin"} color="#fff" className="loading" />;
};
