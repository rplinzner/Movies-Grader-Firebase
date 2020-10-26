import React, { ReactElement, useContext, useEffect, useState } from "react";
import { fetchConfiguration } from "../utils/tmdb-fetchers";

interface ITmdbConfigContextType {
  baseUrl: string | undefined;
}

export const ImdbConfigContext = React.createContext<ITmdbConfigContextType>(
  {} as ITmdbConfigContextType
);

interface Props {
  children?: ReactElement;
}

export const TmdbConfigProvider = (props: Props) => {
  const { children } = props;
  const [baseUrl, setBaseUrl] = useState<string | undefined>();

  useEffect(() => {
    async function inner() {
      const url = await fetchConfiguration();
      setBaseUrl(url);
    }
    inner();
  }, []);

  return (
    <ImdbConfigContext.Provider value={{ baseUrl }}>
      {children}
    </ImdbConfigContext.Provider>
  );
};

export const useTmdbConfig = () => useContext(ImdbConfigContext);
