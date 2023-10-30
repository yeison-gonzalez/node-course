"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findHeroById = void 0;
const heroes_1 = require("../data/heroes");
const findHeroById = (id) => heroes_1.heroes === null || heroes_1.heroes === void 0 ? void 0 : heroes_1.heroes.find(hero => hero.id === id);
exports.findHeroById = findHeroById;
