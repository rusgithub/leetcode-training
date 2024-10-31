/**
 * @param {number[][]} rooms
 * @return {boolean}
 */


// keys: []
// keys: {
//   1: true,
//   2: true
// }

// 3: [1,2]
// 2
// 1: [3]
// 0 

var canVisitAllRooms = function(rooms) {
    const inspectRoom = (room, visited, keys) => {
      if (visited.has(room)) return;
      if (keys.has(room)) {
        visited.add(room);
        const collectedKeys = rooms[room];
        collectedKeys.forEach(collectedKey => {
          keys.add(collectedKey);
          inspectRoom(collectedKey, visited, keys);
        });
      }
    }

    const keys = new Set();
    const visited = new Set();
    keys.add(0);

    for (let i = 0; i < rooms.length; i++) {
      for (const room in rooms) {
        inspectRoom(Number(room), visited, keys);
      }
    }
    // console.log('keys.size', keys.size);
    // console.log('keys', [...keys]);
    return keys.size === rooms.length;
};

console.log('result', canVisitAllRooms([[1],[2],[3],[]]));
console.log('result', canVisitAllRooms([[1],[2],[3],[]]));