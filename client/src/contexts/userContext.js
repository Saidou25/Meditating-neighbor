import { createContext, useContext } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const UserContext = createContext();

function UserProvider({ children }) {
  const { data } = useQuery(QUERY_ME);
  const me = data?.me || [];

  return <UserContext.Provider value={{ me }}>{children}</UserContext.Provider>;
}
// Creating context Api hook
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error ("UserContext was used outside of the UserProvider");
  return context;
}
export { UserProvider, useUser };
