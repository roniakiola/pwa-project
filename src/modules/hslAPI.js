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

/**
 * Get busdata from hsl api 
 * 
 * @param {String} location - campus from campus object
 * @returns busses from diffirent stops in the radius
 */
const getQueryForStopsByLocation = (location) => {
    return `{
      stopsByRadius(lat: ${location.lat}, lon: ${location.lon}, radius: 500, first: 10) {
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