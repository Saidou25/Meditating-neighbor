import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const useMyInfoHook = () => {
  const [me, setMeData] = useState("");

  const { data: meData } = useQuery(QUERY_ME);
  
  useEffect(() => {
    if (meData) {
      const myData = meData?.me || [];
      setMeData(myData);
    }
  }, [meData]);

  return { me };
};
export default useMyInfoHook;
