// import { useState, useEffect } from "react";
// import { useQuery } from "@apollo/client";
// import { QUERY_PROFILES } from "../utils/queries";

// // getting all profiles from query to use in components
// const useMyInfoHook = () => {
//   const [profiles, setProfiles] = useState("");

//   const { data: profilesData } = useQuery(QUERY_PROFILES);

//   useEffect(() => {
//     if (profilesData) {
//       const profiles = profilesData?.profiles || [];

//       setProfiles(profiles);
//     }
//   }, [profilesData]);

//   return { profiles };
// };
// export default useMyInfoHook;
