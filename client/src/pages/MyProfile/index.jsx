// import React from "react";
// import { useMutation } from "@apollo/client";
// import { QUERY_PROFILES } from "../../utils/queries";
// import { DELETE_PROFILE } from "../../utils/mutations";
// import { Link } from "react-router-dom";
// import Avatar from "../../components/Avatar";
// import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";
// // import "./index.css";

// const MyProfile = ({ myLocation, me, profileId, myProfile }) => {

//     const [deleteProfile] = useMutation(DELETE_PROFILE, {
//         variables: { id: profileId },
//         update(cache, { data: { deleteProfile } }) {
//           try {
//             const { profiles } = cache.readQuery({ query: QUERY_PROFILES });
//             cache.writeQuery({
//               query: QUERY_PROFILES,
//               data: {
//                 profiles: [
//                   ...profiles.filter(
//                     (profile) => profile._id !== deleteProfile._id
//                   ),
//                 ],
//               },
//             });
//             console.log("success updating cache with deleteProfile");
//           } catch (e) {
//             console.error(e);
//           }
//         },
//       });
//       const removeProfile = async () => {
//         try {
//           const { data } = await deleteProfile({
//             variables: { id: profileId },
//           });
//           if (data) {
//             console.log("success deleting profile");
//           }
//         } catch (e) {
//           console.error(e);
//         }
//         console.log("success deleting profile");
//       };

//     return (
//         <div className="footer">
//             <Navbar />
//       <div className="container-fluid profile bg-primary">
//         <div className="row">
//           <div className="col-12">
//             <div className="card profile-card">
//               <div className="card-header profile-header mt-3">
//                 <h3>{me.username}</h3>
//               </div>
//               <Avatar me={me} />
//               <div className="card-body profile-body mt-5">
//                 <p className="profile-p text-light">{me.username}</p>
//                 {myProfile ? (
//                   <>
//                     <p className="profile-p text-light">{myProfile?.teacher}</p>
//                     <p className="profile-p text-light">
//                       Meditating since {myProfile?.years}
//                     </p>
//                     <p className="profile-p text-light">
//                       Stage: {myProfile?.stage}
//                     </p>
//                   </>
//                 ) : (
//                   <></>
//                 )}
//               </div>
//               {myLocation.length && (
//                 <p className="profile-p text-light">
//                 Leaves in {myLocation[0]?.city}, {myLocation[0]?.state},{" "}
//                 {myLocation[0]?.country}
//               </p>
//               )}
//               <div className="card-footer profile-footer mt-5">
//                 <div className="row">
//                   <div className="col-12 edit-column">
//                     {profileId ? (
//                       <Link
//                         className="btn btn-edit bg-primary rounded-0 text-light"
//                         //  onClick={editProfile}
//                         to="/UpdateMyProfileForm"
//                         state={{ me: me, myProfile: myProfile }}
//                       >
//                         update
//                       </Link>
//                     ) : (
//                       <Link
//                         className="btn btn-edit bg-primary rounded-0 text-light"
//                         // onClick={createProfile}
//                         to="/ProfileForm"
//                         state={{ me: me, myProfile: myProfile }}
//                       >
//                         add profile
//                       </Link>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 bottom-text">
//             <p className="delete-text bg-primary text-light">
//               Click
//               <button
//                 className="delete-btn bg-primary text-info"
//                 onClick={removeProfile}
//               >
//                 here
//               </button>{" "}
//               if you wish to delete your account.
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="profile-footer bg-primary">
//         <Footer />
//       </div>
//         </div>
       
        
//     )
// };
// export default MyProfile;