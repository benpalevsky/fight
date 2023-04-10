/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var excalibur__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! excalibur */ "./node_modules/excalibur/build/esm/excalibur.js");

//make a new instance of game
const game = new excalibur__WEBPACK_IMPORTED_MODULE_0__.Engine({
    width: 600,
    height: 600,
    backgroundColor: excalibur__WEBPACK_IMPORTED_MODULE_0__.Color.fromHex('#555555')
});
//start the game
game.start();
//add a player to the game
const player = new excalibur__WEBPACK_IMPORTED_MODULE_0__.Actor({
    pos: (0,excalibur__WEBPACK_IMPORTED_MODULE_0__.vec)(300, 300),
    width: 20,
    height: 20,
    color: excalibur__WEBPACK_IMPORTED_MODULE_0__.Color.Blue,
    collisionType: excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionType.Passive,
});
var hydraSpeed = 1;
var hydraSpeedFactor = 1.1;
const builtInBox = player.collider.get();
//add the player to the game
game.add(player);
const PLAYER_SPEED = 150;
//make the player controlable with the arrow keys
game.input.keyboard.on('press', (evt) => {
    if (evt.key === 'ArrowLeft' || evt.key === 'KeyA') {
        player.vel.x = -PLAYER_SPEED;
    }
    if (evt.key === 'ArrowRight' || evt.key === 'KeyD') {
        player.vel.x = PLAYER_SPEED;
    }
    if (evt.key === 'ArrowUp' || evt.key === 'KeyW') {
        player.vel.y = -PLAYER_SPEED;
    }
    if (evt.key === 'ArrowDown' || evt.key === 'KeyS') {
        player.vel.y = PLAYER_SPEED;
    }
});
//stop the player when the arrow keys are released
game.input.keyboard.on('release', (evt) => {
    if (evt.key === 'ArrowLeft' || evt.key === 'KeyA') {
        player.vel.x = 0;
    }
    if (evt.key === 'ArrowRight' || evt.key === 'KeyD') {
        player.vel.x = 0;
    }
    if (evt.key === 'ArrowUp' || evt.key === 'KeyW') {
        player.vel.y = 0;
    }
    if (evt.key === 'ArrowDown' || evt.key === 'KeyS') {
        player.vel.y = 0;
    }
});
//move the player to the right if the left arrow key is held down
player.on('preupdate', () => {
    if (game.input.keyboard.isHeld(excalibur__WEBPACK_IMPORTED_MODULE_0__.Input.Keys.Left) || game.input.keyboard.isHeld(excalibur__WEBPACK_IMPORTED_MODULE_0__.Input.Keys.A)) {
        player.vel.x = -PLAYER_SPEED;
    }
    if (game.input.keyboard.isHeld(excalibur__WEBPACK_IMPORTED_MODULE_0__.Input.Keys.Right) || game.input.keyboard.isHeld(excalibur__WEBPACK_IMPORTED_MODULE_0__.Input.Keys.D)) {
        player.vel.x = PLAYER_SPEED;
    }
    if (game.input.keyboard.isHeld(excalibur__WEBPACK_IMPORTED_MODULE_0__.Input.Keys.Up) || game.input.keyboard.isHeld(excalibur__WEBPACK_IMPORTED_MODULE_0__.Input.Keys.W)) {
        player.vel.y = -PLAYER_SPEED;
    }
    if (game.input.keyboard.isHeld(excalibur__WEBPACK_IMPORTED_MODULE_0__.Input.Keys.Down) || game.input.keyboard.isHeld(excalibur__WEBPACK_IMPORTED_MODULE_0__.Input.Keys.S)) {
        player.vel.y = PLAYER_SPEED;
    }
});
// make a circle follow the mouse pointer
const mouse = new excalibur__WEBPACK_IMPORTED_MODULE_0__.Actor({
    pos: (0,excalibur__WEBPACK_IMPORTED_MODULE_0__.vec)(300, 300),
    width: 20,
    height: 20,
    color: excalibur__WEBPACK_IMPORTED_MODULE_0__.Color.Transparent
});
game.add(mouse);
game.input.pointers.primary.on('move', (evt) => {
    mouse.pos = evt.worldPos;
});
//make a box which moves towards the player
var hydra = new excalibur__WEBPACK_IMPORTED_MODULE_0__.Actor({
    pos: (0,excalibur__WEBPACK_IMPORTED_MODULE_0__.vec)(0, 0),
    width: 100,
    height: 100,
    color: excalibur__WEBPACK_IMPORTED_MODULE_0__.Color.Green,
    collisionType: excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionType.Passive,
});
game.add(hydra);
var hydraBeingHit = false;
hydra.on('preupdate', () => {
    //if the hydra is not being hit, make it move towards the player
    //otherwise, knock it back a lot
    if (!hydraBeingHit) {
        hydra.vel = player.pos.sub(hydra.pos).normalize().scale(100);
    }
    else {
        hydra.vel = hydra.pos.sub(player.pos).normalize().scale(500);
    }
    if (hydra.pos.x < 0 || hydra.pos.x > game.drawWidth || hydra.pos.y < 0 || hydra.pos.y > game.drawHeight) {
        hydra.pos = (0,excalibur__WEBPACK_IMPORTED_MODULE_0__.vec)(300, 300);
        hydraBeingHit = false;
        hydra.vel = player.pos.sub(hydra.pos).normalize().scale(100);
    }
});
//when the playyer clicks the mouse, make a box appear at the player, facing the mouse pointer, and then gradually fade out
game.input.pointers.primary.on('down', (evt) => {
    const hitbox = new excalibur__WEBPACK_IMPORTED_MODULE_0__.Actor({
        pos: mouse.pos.sub(player.pos).normalize().scale(20).add(player.pos),
        width: 20,
        height: 20,
        color: excalibur__WEBPACK_IMPORTED_MODULE_0__.Color.Yellow,
        collisionType: excalibur__WEBPACK_IMPORTED_MODULE_0__.CollisionType.Passive,
        name: 'hitbox'
    });
    game.add(hitbox);
    hitbox.on('preupdate', () => {
        hitbox.color.a -= 0.1;
        if (hitbox.color.a <= 0) {
            hitbox.kill();
        }
    });
});
hydra.on('precollision', (ev) => {
    if (ev.other.name === 'hitbox') {
        //knock the hydra back a lot over 0.5 seconds
        hydra.color = excalibur__WEBPACK_IMPORTED_MODULE_0__.Color.Red;
        hydraBeingHit = true;
        hydraSpeed *= hydraSpeedFactor;
    }
    else {
        hydraBeingHit = false;
    }
});
hydra.on('collisionend', (ev) => {
    hydra.color = excalibur__WEBPACK_IMPORTED_MODULE_0__.Color.Green;
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkexcalibur_webpack"] = self["webpackChunkexcalibur_webpack"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_excalibur_build_esm_excalibur_js"], () => (__webpack_require__("./src/index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9leGNhbGlidXItd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9leGNhbGlidXItd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4Y2FsaWJ1ci13ZWJwYWNrL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2V4Y2FsaWJ1ci13ZWJwYWNrL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZXhjYWxpYnVyLXdlYnBhY2svd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2V4Y2FsaWJ1ci13ZWJwYWNrL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXgsIHsgSW5wdXQsIEFjdG9yLCBDb2xsaXNpb25UeXBlLCBDb2xvciwgRW5naW5lLCB2ZWMgfSBmcm9tICdleGNhbGlidXInXG5cbi8vbWFrZSBhIG5ldyBpbnN0YW5jZSBvZiBnYW1lXG5jb25zdCBnYW1lID0gbmV3IEVuZ2luZSh7XG4gICAgd2lkdGg6IDYwMCxcbiAgICBoZWlnaHQ6IDYwMCxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IENvbG9yLmZyb21IZXgoJyM1NTU1NTUnKVxufSk7XG5cbi8vc3RhcnQgdGhlIGdhbWVcbmdhbWUuc3RhcnQoKTtcblxuLy9hZGQgYSBwbGF5ZXIgdG8gdGhlIGdhbWVcbmNvbnN0IHBsYXllciA9IG5ldyBBY3Rvcih7XG4gICAgcG9zOiB2ZWMoMzAwLCAzMDApLFxuICAgIHdpZHRoOiAyMCxcbiAgICBoZWlnaHQ6IDIwLFxuICAgIGNvbG9yOiBDb2xvci5CbHVlLFxuICAgIGNvbGxpc2lvblR5cGU6IENvbGxpc2lvblR5cGUuUGFzc2l2ZSxcbn0pO1xuXG52YXIgaHlkcmFTcGVlZCA9IDE7XG52YXIgaHlkcmFTcGVlZEZhY3RvciA9IDEuMTtcblxuY29uc3QgYnVpbHRJbkJveCA9IHBsYXllci5jb2xsaWRlci5nZXQoKVxuXG4vL2FkZCB0aGUgcGxheWVyIHRvIHRoZSBnYW1lXG5nYW1lLmFkZChwbGF5ZXIpO1xuXG5jb25zdCBQTEFZRVJfU1BFRUQgPSAxNTA7XG5cbi8vbWFrZSB0aGUgcGxheWVyIGNvbnRyb2xhYmxlIHdpdGggdGhlIGFycm93IGtleXNcbmdhbWUuaW5wdXQua2V5Ym9hcmQub24oJ3ByZXNzJywgKGV2dCkgPT4ge1xuICAgIGlmIChldnQua2V5ID09PSAnQXJyb3dMZWZ0JyB8fCBldnQua2V5ID09PSAnS2V5QScpIHtcbiAgICAgICAgcGxheWVyLnZlbC54ID0gLVBMQVlFUl9TUEVFRDtcbiAgICB9XG4gICAgaWYgKGV2dC5rZXkgPT09ICdBcnJvd1JpZ2h0JyB8fCBldnQua2V5ID09PSAnS2V5RCcpIHtcbiAgICAgICAgcGxheWVyLnZlbC54ID0gUExBWUVSX1NQRUVEO1xuICAgIH1cbiAgICBpZiAoZXZ0LmtleSA9PT0gJ0Fycm93VXAnIHx8IGV2dC5rZXkgPT09ICdLZXlXJykge1xuICAgICAgICBwbGF5ZXIudmVsLnkgPSAtUExBWUVSX1NQRUVEO1xuICAgIH1cbiAgICBpZiAoZXZ0LmtleSA9PT0gJ0Fycm93RG93bicgfHwgZXZ0LmtleSA9PT0gJ0tleVMnKSB7XG4gICAgICAgIHBsYXllci52ZWwueSA9IFBMQVlFUl9TUEVFRDtcbiAgICB9XG59KTtcblxuLy9zdG9wIHRoZSBwbGF5ZXIgd2hlbiB0aGUgYXJyb3cga2V5cyBhcmUgcmVsZWFzZWRcbmdhbWUuaW5wdXQua2V5Ym9hcmQub24oJ3JlbGVhc2UnLCAoZXZ0KSA9PiB7XG4gICAgaWYgKGV2dC5rZXkgPT09ICdBcnJvd0xlZnQnIHx8IGV2dC5rZXkgPT09ICdLZXlBJykge1xuICAgICAgICBwbGF5ZXIudmVsLnggPSAwO1xuICAgIH1cbiAgICBpZiAoZXZ0LmtleSA9PT0gJ0Fycm93UmlnaHQnIHx8IGV2dC5rZXkgPT09ICdLZXlEJykge1xuICAgICAgICBwbGF5ZXIudmVsLnggPSAwO1xuICAgIH1cbiAgICBpZiAoZXZ0LmtleSA9PT0gJ0Fycm93VXAnIHx8IGV2dC5rZXkgPT09ICdLZXlXJykge1xuICAgICAgICBwbGF5ZXIudmVsLnkgPSAwO1xuICAgIH1cbiAgICBpZiAoZXZ0LmtleSA9PT0gJ0Fycm93RG93bicgfHwgZXZ0LmtleSA9PT0gJ0tleVMnKSB7XG4gICAgICAgIHBsYXllci52ZWwueSA9IDA7XG4gICAgfVxufSk7XG5cbi8vbW92ZSB0aGUgcGxheWVyIHRvIHRoZSByaWdodCBpZiB0aGUgbGVmdCBhcnJvdyBrZXkgaXMgaGVsZCBkb3duXG5wbGF5ZXIub24oJ3ByZXVwZGF0ZScsICgpID0+IHtcbiAgICBpZiAoZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0hlbGQoSW5wdXQuS2V5cy5MZWZ0KSB8fCBnYW1lLmlucHV0LmtleWJvYXJkLmlzSGVsZChJbnB1dC5LZXlzLkEpKSB7XG4gICAgICAgIHBsYXllci52ZWwueCA9IC1QTEFZRVJfU1BFRUQ7XG4gICAgfVxuICAgIGlmIChnYW1lLmlucHV0LmtleWJvYXJkLmlzSGVsZChJbnB1dC5LZXlzLlJpZ2h0KSB8fCBnYW1lLmlucHV0LmtleWJvYXJkLmlzSGVsZChJbnB1dC5LZXlzLkQpKSB7XG4gICAgICAgIHBsYXllci52ZWwueCA9IFBMQVlFUl9TUEVFRDtcbiAgICB9XG4gICAgaWYgKGdhbWUuaW5wdXQua2V5Ym9hcmQuaXNIZWxkKElucHV0LktleXMuVXApIHx8IGdhbWUuaW5wdXQua2V5Ym9hcmQuaXNIZWxkKElucHV0LktleXMuVykpIHtcbiAgICAgICAgcGxheWVyLnZlbC55ID0gLVBMQVlFUl9TUEVFRDtcbiAgICB9XG4gICAgaWYgKGdhbWUuaW5wdXQua2V5Ym9hcmQuaXNIZWxkKElucHV0LktleXMuRG93bikgfHwgZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0hlbGQoSW5wdXQuS2V5cy5TKSkge1xuICAgICAgICBwbGF5ZXIudmVsLnkgPSBQTEFZRVJfU1BFRUQ7XG4gICAgfVxufSk7XG5cblxuLy8gbWFrZSBhIGNpcmNsZSBmb2xsb3cgdGhlIG1vdXNlIHBvaW50ZXJcbmNvbnN0IG1vdXNlID0gbmV3IEFjdG9yKHtcbiAgICBwb3M6IHZlYygzMDAsIDMwMCksXG4gICAgd2lkdGg6IDIwLFxuICAgIGhlaWdodDogMjAsXG4gICAgY29sb3I6IENvbG9yLlRyYW5zcGFyZW50XG59KTtcblxuZ2FtZS5hZGQobW91c2UpO1xuXG5nYW1lLmlucHV0LnBvaW50ZXJzLnByaW1hcnkub24oJ21vdmUnLCAoZXZ0KSA9PiB7XG4gICAgbW91c2UucG9zID0gZXZ0LndvcmxkUG9zO1xufSk7XG5cbi8vbWFrZSBhIGJveCB3aGljaCBtb3ZlcyB0b3dhcmRzIHRoZSBwbGF5ZXJcblxudmFyIGh5ZHJhID0gbmV3IEFjdG9yKHtcbiAgICBwb3M6IHZlYygwLCAwKSxcbiAgICB3aWR0aDogMTAwLFxuICAgIGhlaWdodDogMTAwLFxuICAgIGNvbG9yOiBDb2xvci5HcmVlbixcbiAgICBjb2xsaXNpb25UeXBlOiBDb2xsaXNpb25UeXBlLlBhc3NpdmUsXG59KTtcblxuZ2FtZS5hZGQoaHlkcmEpO1xuXG52YXIgaHlkcmFCZWluZ0hpdCA9IGZhbHNlO1xuXG5oeWRyYS5vbigncHJldXBkYXRlJywgKCkgPT4ge1xuXG4gICAgLy9pZiB0aGUgaHlkcmEgaXMgbm90IGJlaW5nIGhpdCwgbWFrZSBpdCBtb3ZlIHRvd2FyZHMgdGhlIHBsYXllclxuICAgIC8vb3RoZXJ3aXNlLCBrbm9jayBpdCBiYWNrIGEgbG90XG4gICAgaWYgKCFoeWRyYUJlaW5nSGl0KSB7XG4gICAgICAgIGh5ZHJhLnZlbCA9IHBsYXllci5wb3Muc3ViKGh5ZHJhLnBvcykubm9ybWFsaXplKCkuc2NhbGUoMTAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBoeWRyYS52ZWwgPSBoeWRyYS5wb3Muc3ViKHBsYXllci5wb3MpLm5vcm1hbGl6ZSgpLnNjYWxlKDUwMCk7XG4gICAgfVxuXG4gICAgaWYgKGh5ZHJhLnBvcy54IDwgMCB8fCBoeWRyYS5wb3MueCA+IGdhbWUuZHJhd1dpZHRoIHx8IGh5ZHJhLnBvcy55IDwgMCB8fCBoeWRyYS5wb3MueSA+IGdhbWUuZHJhd0hlaWdodCkge1xuICAgICAgICBoeWRyYS5wb3MgPSB2ZWMoMzAwLCAzMDApO1xuICAgICAgICBoeWRyYUJlaW5nSGl0ID0gZmFsc2U7XG4gICAgICAgIGh5ZHJhLnZlbCA9IHBsYXllci5wb3Muc3ViKGh5ZHJhLnBvcykubm9ybWFsaXplKCkuc2NhbGUoMTAwKTtcblxuICAgIH1cbn0pO1xuXG5cblxuLy93aGVuIHRoZSBwbGF5eWVyIGNsaWNrcyB0aGUgbW91c2UsIG1ha2UgYSBib3ggYXBwZWFyIGF0IHRoZSBwbGF5ZXIsIGZhY2luZyB0aGUgbW91c2UgcG9pbnRlciwgYW5kIHRoZW4gZ3JhZHVhbGx5IGZhZGUgb3V0XG5nYW1lLmlucHV0LnBvaW50ZXJzLnByaW1hcnkub24oJ2Rvd24nLCAoZXZ0KSA9PiB7XG4gICAgY29uc3QgaGl0Ym94ID0gbmV3IEFjdG9yKHtcbiAgICAgICAgcG9zOiBtb3VzZS5wb3Muc3ViKHBsYXllci5wb3MpLm5vcm1hbGl6ZSgpLnNjYWxlKDIwKS5hZGQocGxheWVyLnBvcyksXG4gICAgICAgIHdpZHRoOiAyMCxcbiAgICAgICAgaGVpZ2h0OiAyMCxcbiAgICAgICAgY29sb3I6IENvbG9yLlllbGxvdyxcbiAgICAgICAgY29sbGlzaW9uVHlwZTogQ29sbGlzaW9uVHlwZS5QYXNzaXZlLFxuICAgICAgICBuYW1lOiAnaGl0Ym94J1xuICAgIH0pO1xuICAgIGdhbWUuYWRkKGhpdGJveCk7XG5cbiAgICBoaXRib3gub24oJ3ByZXVwZGF0ZScsICgpID0+IHtcbiAgICAgICAgaGl0Ym94LmNvbG9yLmEgLT0gMC4xO1xuICAgICAgICBpZiAoaGl0Ym94LmNvbG9yLmEgPD0gMCkge1xuICAgICAgICAgICAgaGl0Ym94LmtpbGwoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cbmh5ZHJhLm9uKCdwcmVjb2xsaXNpb24nLCAoZXYpID0+IHtcbiAgICBpZiAoZXYub3RoZXIubmFtZSA9PT0gJ2hpdGJveCcpIHtcbiAgICAgICAgLy9rbm9jayB0aGUgaHlkcmEgYmFjayBhIGxvdCBvdmVyIDAuNSBzZWNvbmRzXG4gICAgICAgIGh5ZHJhLmNvbG9yID0gQ29sb3IuUmVkO1xuICAgICAgICBoeWRyYUJlaW5nSGl0ID0gdHJ1ZTtcbiAgICAgICAgaHlkcmFTcGVlZCAqPSBoeWRyYVNwZWVkRmFjdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGh5ZHJhQmVpbmdIaXQgPSBmYWxzZTtcbiAgICB9XG59KTtcblxuaHlkcmEub24oJ2NvbGxpc2lvbmVuZCcsIChldikgPT4ge1xuICAgIGh5ZHJhLmNvbG9yID0gQ29sb3IuR3JlZW47XG59KTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2V4Y2FsaWJ1cl93ZWJwYWNrXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2V4Y2FsaWJ1cl93ZWJwYWNrXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19leGNhbGlidXJfYnVpbGRfZXNtX2V4Y2FsaWJ1cl9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9