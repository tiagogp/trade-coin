import { createContext, FC, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface ICurrencyContext {
  atualCurrency: string;
  setAtualCurrency(value: string): void;
}

interface CurrencyProviderProps {
  children: React.ReactNode;
}

const CurrencyContext = createContext<ICurrencyContext | null>(null);

export const CurrencyProvider: FC<CurrencyProviderProps> = ({ children }) => {
  const [atualCurrency, setAtualCurrency] = useState("usd");

  const SetValue = (value: string) => {
    Cookies.set("currency-cookie", value);
    setAtualCurrency(value);
  };

  useEffect(() => {
    const currency = Cookies.get("currency-cookie");

    if (currency) {
      setAtualCurrency(currency);
      return;
    }

    Cookies.set("currency-cookie", "usd");
  }, []);

  return (
    <CurrencyContext.Provider
      value={{ atualCurrency, setAtualCurrency: SetValue }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): ICurrencyContext => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used with CurrencyProvider");
  }

  return context;
};
