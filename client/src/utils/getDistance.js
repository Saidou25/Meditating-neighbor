import { v4 } from "uuid";

// Calculates distance between user's geolocation and other users

export function getDistance (me, users) {
     const seventyFiveMiles = { title: "within", data: [] };
     const overSeventyFiveMiles = { title: "over", data: [] };

    // // getting user's coordinates(longitutde and latitude)
    const myLat = me.location?.latitude;
    const myLon = me.location?.longitude;

    const distance = (myLat, myLon, user) => {
        const r = 6371; // km
        const p = Math.PI / 180;
        const userLat = user?.location?.latitude;
        const userLon = user?.location?.longitude;
     
        const a =
          0.5 -
          Math.cos((userLat - myLat) * p) / 2 +
          (Math.cos(myLat * p) *
            Math.cos(userLat * p) *
            (1 - Math.cos((userLon - myLon) * p))) /
            2;
     
        const distance2 = 2 * r * Math.asin(Math.sqrt(a)) * 0.62;
     
        // building a distance object to push users data and pass data around in components
        const distanceObj = {
          id: v4(),
          distance2: distance2,
          user: user,
          me: me,
          username: user.username,
          city: user.location?.city,
          state: user.location?.state,
          country: user.location?.country,
          avatarUrl: user.avatar?.avatarUrl,
        };
        // conditionally pushing the object distance to arrays for "within a radius display"
        distance2 <= 50
          ? seventyFiveMiles.data.push(distanceObj)
          : overSeventyFiveMiles.data.push(distanceObj);
     
        // return 2 * r * Math.asin(Math.sqrt(a));
    };
     
     
      // gathering each user info (exept loggedin user) and send data to distance()
      const allUsersButMe = users.filter((user) => user.username !== me.username);
     
      for (let user of allUsersButMe) {
        if (user.location && user.profile && user.avatar) {
          distance(myLat, myLon, user);
        }
      }
    
    return { seventyFiveMiles, overSeventyFiveMiles };
};
 