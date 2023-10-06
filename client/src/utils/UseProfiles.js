import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PROFILES } from "./queries";

const useMyInfoHook = () => {
  const [profiles, setProfiles] = useState("");
  // console.log("profiles", profiles);

  const { data: profilesData } = useQuery(QUERY_PROFILES);

  useEffect(() => {
    if (profilesData) {
      const profiles = profilesData?.profiles || [];

      setProfiles(profiles);
    }
  }, [profilesData]);

  return { profiles };
};
export default useMyInfoHook;
