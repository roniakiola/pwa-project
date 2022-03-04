const apiUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

/**
* @param {number} id - id number of the hsl stop
*/
const getQueryForNextRidesByStopId = (id) => {
 return `{
   stop(id: "HSL:${id}") {
     name
     stoptimesWithoutPatterns {
       scheduledArrival
       realtimeArrival
       arrivalDelay
       scheduledDeparture
       realtimeDeparture
       departureDelay
       realtime
       realtimeState
       serviceDay
       headsign
       trip {
         routeShortName
         tripHeadsign
       }
     }
   }
 }`;
};


const getQueryForStopsByLocation = (location) => {
    return `{
      stopsByRadius(lat: ${location.lat}, lon: ${location.lon}, radius: 600, first: 10) {
        edges {
          node {
            stop {
              gtfsId
              name
              lat
              lon
              stoptimesWithoutPatterns {
                scheduledArrival
                realtimeArrival
                arrivalDelay
                scheduledDeparture
                realtimeDeparture
                departureDelay
                realtime
                realtimeState
                serviceDay
                headsign
                trip {
                  tripHeadsign
                  routeShortName
                }
              }
            }
            distance
          }
          cursor
        }
        pageInfo {
            hasNextPage
            endCursor
        }
      }
    }`;
  };

const HSLData =  {apiUrl, getQueryForNextRidesByStopId, getQueryForStopsByLocation};
export default HSLData;