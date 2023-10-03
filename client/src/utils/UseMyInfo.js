import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "./queries";

const useMyInfoHook = () => {
  const [me, setMeData] = useState("");
  // console.log("me from my info", me);

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
