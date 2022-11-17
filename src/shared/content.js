"use strict";
exports.__esModule = true;
exports.CITY_ESCAPE_OBJECTS = exports.ALL_OBJECTS = exports.ZONES = exports.COLLISIONS = exports.STAGE = exports.ACTORS = exports.MYSTIC_SHRINE = exports.BALL_SWITCH = exports.STAGE_INTERACTIVE = exports.ENEMIES = exports.COLLECTIBLES = exports.SA2Object = void 0;
/** Sonic Adventure 2 Objects */
var SA2Object;
(function (SA2Object) {
    SA2Object["RING"] = "Ring";
    SA2Object["RING_LINEAR"] = "Line of Rings";
    SA2Object["RING_CIRCLE"] = "Circle of Rings";
    SA2Object["SPRA"] = "Spring";
    SA2Object["SPRB"] = "Air Spring";
    SA2Object["TRIPLESPRING"] = "Triple Spring";
    SA2Object["BIGJUMP"] = "Big Jump";
    SA2Object["KASOKU"] = "Dash Panel";
    SA2Object["SAVEPOINT"] = "Save Point";
    SA2Object["SWITCH"] = "Ball Switch";
    SA2Object["ITEMBOX"] = "Item Box";
    SA2Object["ITEMBOXAIR"] = "Floating Item Box";
    SA2Object["ITEMBOXBALLOON"] = "Item Balloon";
    SA2Object["LEVUPDAI"] = "Upgrade Item";
    SA2Object["GOALRING"] = "Goal Ring";
    SA2Object["EMERALD"] = "Emerald";
    SA2Object["UDREEL"] = "Pulley";
    SA2Object["ORI"] = "Cage";
    SA2Object["DYNAMITE"] = "Dynamite";
    SA2Object["CONTWOOD"] = "Metal Box";
    SA2Object["CONTIRON"] = "Wood Box";
    SA2Object["ROCKET"] = "Rocket";
    SA2Object["ROCKETMISSSILE"] = "Rocket Launch Pad";
    SA2Object["SCHBOX"] = "Hint Monitor";
    SA2Object["HINTBOX"] = "Hint Box (Unused)";
    SA2Object["MSGER"] = "Omochao";
    SA2Object["SSS"] = "Push/Pull Object (Unused)";
    SA2Object["SOLIDBOX"] = "Black Box";
    SA2Object["DMYOBJ"] = "Blank Object";
    SA2Object["SOAPSW"] = "Trigger Zone (Unused)";
    SA2Object["SKULL"] = "Skull";
    SA2Object["PSKULL"] = "Skull (Immobile)";
    SA2Object["CHAOPIPE"] = "Animal Pipe";
    SA2Object["MINIMAL"] = "Small Animal";
    SA2Object["WSMMLS"] = "Whistle Area";
    SA2Object["CONTCHAO"] = "Chao Box";
    SA2Object["STOPLSD"] = "No Somersault Zone";
    SA2Object["KNUDAI"] = "Mystic Shrine";
    SA2Object["KDASIBA"] = "Shrine-activated Platform";
    SA2Object["KDWARPHOLE"] = "Shrine-activated Warp";
    SA2Object["KDDOOR"] = "Shrine-activated Door";
    SA2Object["KDITEMBOX"] = "Shrine-activated Item Box";
    SA2Object["KDDRNGL"] = "Shrine-activated Line of Rings";
    SA2Object["KDDRNGC"] = "Shrine-activated Circle of Rings";
    SA2Object["KDSPRING"] = "Shrine-activated Spring";
    SA2Object["KDSPRINGB"] = "Shrine-activated Air Spring";
    SA2Object["SPHERE"] = "Sphere Collision";
    SA2Object["CCYL"] = "Cylinder Collision";
    SA2Object["CCUBE"] = "Cube Collision";
    SA2Object["CWALL"] = "Polygonal Collision";
    SA2Object["CCIRCLE"] = "Circular Collision";
    SA2Object["MODMOD"] = "Shadows";
    SA2Object["EFFOBJ0"] = "Particle Generator";
    SA2Object["EFFLENSF"] = "Lens Flare";
    SA2Object["BUNCHIN"] = "Moving Weight";
    SA2Object["IRONBALL2"] = "Rotating Spike Balls";
    SA2Object["EKUMI"] = "Beetle";
    SA2Object["EAI"] = "Hunter";
    SA2Object["LIGHTSW"] = "General Shade for Character Area";
    SA2Object["BOARDCOL"] = "Snowboard Trigger Area";
    SA2Object["CARMAN"] = "Moving Car 1";
    SA2Object["CARKAZ"] = "Stationary Car";
    SA2Object["TJUMPDAI"] = "Trick Ramp";
    SA2Object["HAMMER"] = "Bobbing Hexagon Pillar";
    SA2Object["TRUCK"] = "Truck Appearance Trigger";
    SA2Object["IRONBAR"] = "Swinging Pole";
    SA2Object["TREEST"] = "Tree";
    SA2Object["SWDRNGL"] = "Switch-activated Line of Rings";
    SA2Object["SWDRNGC"] = "Switch-activated Circle of Rings";
    SA2Object["TREESHADOWS"] = "Tree Shade for Character Area";
    SA2Object["LAMP"] = "Decorative Lamp";
    SA2Object["CARMANC"] = "Moving Car 2";
    SA2Object["SIGNS"] = "Decorative Street Signs";
    SA2Object["SIGNS_F"] = "Decorative Street Signs (No Collision)";
    SA2Object["SBLG"] = "Big Billboard";
    SA2Object["ROADOBJ"] = "Decorative Object";
    SA2Object["PALM"] = "Palm Tree";
    SA2Object["BOARD"] = "Snowboard Initial Position";
    SA2Object["CARKAZ_S"] = "Stationary Car Small";
    SA2Object["SLIDER"] = "Somersault Entrance";
    SA2Object["GREEN_B"] = "Green Bush";
    SA2Object["ADXCHG"] = "Music Change Trigger";
    SA2Object["BAR"] = "Swinging Bar Generator";
    SA2Object["FENCES"] = "Small Fence";
    SA2Object["FENCEL"] = "Large Fence";
    SA2Object["BIGTHECAT"] = "Big The Cat";
    SA2Object["SIGNBOARD"] = "Billboard";
    SA2Object["POSTER"] = "Poster 1";
    SA2Object["TREESTNB"] = "Tree Alternate";
    SA2Object["POSTER3"] = "Poster 2";
    SA2Object["LINKLINK"] = "Trick Points Trigger";
    SA2Object["EPATH"] = "Moving Beetle";
    SA2Object["GUIDANCE"] = "Arrow Guidance Barrier";
    SA2Object["EGOLD"] = "Gold Beetle";
    SA2Object["SARROW"] = "Arrow Guidance";
    SA2Object["TRBACK"] = "Tree Tops";
    SA2Object["CARMAN_NEAR"] = "Moving Car 3";
    SA2Object["SE_PATCAR"] = "Police Siren Sound Effect";
    SA2Object["SE_KAZE"] = "Wind Sound Effect";
    SA2Object["POSTERM"] = "Poster 3";
    SA2Object["NOINPCOL"] = "No Input Area";
    SA2Object["PIC"] = "Tire";
})(SA2Object = exports.SA2Object || (exports.SA2Object = {}));
;
exports.COLLECTIBLES = [
    SA2Object.RING,
    SA2Object.RING_LINEAR,
    SA2Object.RING_CIRCLE,
    SA2Object.ITEMBOX,
    SA2Object.ITEMBOXAIR,
    SA2Object.ITEMBOXBALLOON,
    SA2Object.LEVUPDAI,
    SA2Object.GOALRING,
    SA2Object.EMERALD,
    SA2Object.MINIMAL,
];
exports.ENEMIES = [
    SA2Object.EAI,
    SA2Object.EKUMI,
    SA2Object.EPATH,
    SA2Object.EGOLD,
    SA2Object.BUNCHIN,
    SA2Object.IRONBALL2,
];
exports.STAGE_INTERACTIVE = [
    SA2Object.SPRA,
    SA2Object.SPRB,
    SA2Object.TRIPLESPRING,
    SA2Object.BIGJUMP,
    SA2Object.KASOKU,
    SA2Object.SAVEPOINT,
    SA2Object.UDREEL,
    SA2Object.ORI,
    SA2Object.DYNAMITE,
    SA2Object.CONTWOOD,
    SA2Object.CONTIRON,
    SA2Object.ROCKET,
    SA2Object.ROCKETMISSSILE,
    SA2Object.SCHBOX,
    SA2Object.SOLIDBOX,
    SA2Object.SKULL,
    SA2Object.CHAOPIPE,
    SA2Object.CONTCHAO,
    SA2Object.TJUMPDAI,
    SA2Object.HAMMER,
    SA2Object.IRONBAR,
    SA2Object.PIC,
];
exports.BALL_SWITCH = [
    SA2Object.SWITCH,
    SA2Object.SWDRNGL,
    SA2Object.SWDRNGC,
];
exports.MYSTIC_SHRINE = [
    SA2Object.KNUDAI,
    SA2Object.KDASIBA,
    SA2Object.KDWARPHOLE,
    SA2Object.KDDOOR,
    SA2Object.KDITEMBOX,
    SA2Object.KDDRNGL,
    SA2Object.KDDRNGC,
    SA2Object.KDSPRING,
    SA2Object.KDSPRINGB,
];
exports.ACTORS = [
    SA2Object.MSGER,
    SA2Object.CARMAN,
    SA2Object.CARKAZ,
    SA2Object.CARMANC,
    SA2Object.CARKAZ_S,
    SA2Object.BIGTHECAT,
    SA2Object.CARMAN_NEAR,
    SA2Object.SE_PATCAR,
    SA2Object.SE_KAZE,
];
exports.STAGE = [
    SA2Object.DMYOBJ,
    SA2Object.PSKULL,
    SA2Object.MODMOD,
    SA2Object.EFFOBJ0,
    SA2Object.EFFLENSF,
    SA2Object.TREEST,
    SA2Object.TREESHADOWS,
    SA2Object.LAMP,
    SA2Object.SIGNS,
    SA2Object.SIGNS_F,
    SA2Object.SBLG,
    SA2Object.ROADOBJ,
    SA2Object.PALM,
    SA2Object.SLIDER,
    SA2Object.GREEN_B,
    SA2Object.BAR,
    SA2Object.FENCES,
    SA2Object.FENCEL,
    SA2Object.SIGNBOARD,
    SA2Object.POSTER,
    SA2Object.TREESTNB,
    SA2Object.POSTER3,
    SA2Object.GUIDANCE,
    SA2Object.SARROW,
    SA2Object.TRBACK,
    SA2Object.POSTERM,
];
exports.COLLISIONS = [
    SA2Object.SPHERE,
    SA2Object.CCYL,
    SA2Object.CCUBE,
    SA2Object.CWALL,
    SA2Object.CCIRCLE,
];
exports.ZONES = [
    SA2Object.BOARD,
    SA2Object.ADXCHG,
    SA2Object.LINKLINK,
    SA2Object.NOINPCOL,
    SA2Object.STOPLSD,
    SA2Object.WSMMLS,
    SA2Object.LIGHTSW,
    SA2Object.BOARDCOL,
    SA2Object.TRUCK,
];
exports.ALL_OBJECTS = [
    {
        name: 'Collectibles',
        objects: exports.COLLECTIBLES
    },
    {
        name: 'Enemies',
        objects: exports.ENEMIES
    },
    {
        name: 'Stage Interactables',
        objects: exports.STAGE_INTERACTIVE
    },
    {
        name: 'Ball Switch',
        objects: exports.BALL_SWITCH
    },
    {
        name: 'Mystic Shrine',
        objects: exports.MYSTIC_SHRINE
    },
    {
        name: 'Actors',
        objects: exports.ACTORS
    },
    {
        name: 'Stage',
        objects: exports.STAGE
    },
    {
        name: 'Collision',
        objects: exports.COLLISIONS
    },
    {
        name: 'Zones',
        objects: exports.ZONES
    },
];
/** A Map from an SA2Object to CityEscapeObjectID. */
exports.CITY_ESCAPE_OBJECTS = new Map([
    [SA2Object.RING, 0],
    [SA2Object.RING_LINEAR, 1],
    [SA2Object.RING_CIRCLE, 2],
    [SA2Object.SPRA, 3],
    [SA2Object.SPRB, 4],
    [SA2Object.TRIPLESPRING, 5],
    [SA2Object.BIGJUMP, 6],
    [SA2Object.KASOKU, 7],
    [SA2Object.SAVEPOINT, 8],
    [SA2Object.SWITCH, 9],
    [SA2Object.ITEMBOX, 10],
    [SA2Object.ITEMBOXAIR, 11],
    [SA2Object.ITEMBOXBALLOON, 12],
    [SA2Object.LEVUPDAI, 13],
    [SA2Object.GOALRING, 14],
    [SA2Object.EMERALD, 15],
    [SA2Object.UDREEL, 16],
    [SA2Object.ORI, 17],
    [SA2Object.DYNAMITE, 18],
    [SA2Object.CONTWOOD, 19],
    [SA2Object.CONTIRON, 20],
    [SA2Object.ROCKET, 21],
    [SA2Object.ROCKETMISSSILE, 22],
    [SA2Object.SCHBOX, 23],
    [SA2Object.HINTBOX, 24],
    [SA2Object.MSGER, 25],
    [SA2Object.SSS, 26],
    [SA2Object.SOLIDBOX, 27],
    [SA2Object.DMYOBJ, 28],
    [SA2Object.SOAPSW, 29],
    [SA2Object.SKULL, 30],
    [SA2Object.PSKULL, 31],
    [SA2Object.CHAOPIPE, 32],
    [SA2Object.MINIMAL, 33],
    [SA2Object.WSMMLS, 34],
    [SA2Object.CONTCHAO, 35],
    [SA2Object.STOPLSD, 36],
    [SA2Object.KNUDAI, 37],
    [SA2Object.KDASIBA, 38],
    [SA2Object.KDWARPHOLE, 39],
    [SA2Object.KDDOOR, 40],
    [SA2Object.KDITEMBOX, 41],
    [SA2Object.KDDRNGL, 42],
    [SA2Object.KDDRNGC, 43],
    [SA2Object.KDSPRING, 44],
    [SA2Object.KDSPRINGB, 45],
    [SA2Object.SPHERE, 46],
    [SA2Object.CCYL, 47],
    [SA2Object.CCUBE, 48],
    [SA2Object.CWALL, 49],
    [SA2Object.CCIRCLE, 50],
    [SA2Object.MODMOD, 51],
    [SA2Object.EFFOBJ0, 52],
    [SA2Object.EFFLENSF, 53],
    [SA2Object.BUNCHIN, 54],
    [SA2Object.IRONBALL2, 55],
    [SA2Object.EKUMI, 56],
    [SA2Object.EAI, 57],
    [SA2Object.LIGHTSW, 58],
    [SA2Object.BOARDCOL, 59],
    [SA2Object.CARMAN, 60],
    [SA2Object.CARKAZ, 61],
    [SA2Object.TJUMPDAI, 62],
    [SA2Object.HAMMER, 63],
    [SA2Object.TRUCK, 64],
    [SA2Object.IRONBAR, 65],
    [SA2Object.TREEST, 66],
    [SA2Object.SWDRNGL, 67],
    [SA2Object.SWDRNGC, 68],
    [SA2Object.TREESHADOWS, 69],
    [SA2Object.LAMP, 70],
    [SA2Object.CARMANC, 71],
    [SA2Object.SIGNS, 72],
    [SA2Object.SIGNS_F, 73],
    [SA2Object.SBLG, 74],
    [SA2Object.ROADOBJ, 75],
    [SA2Object.PALM, 76],
    [SA2Object.BOARD, 77],
    [SA2Object.CARKAZ_S, 78],
    [SA2Object.SLIDER, 79],
    [SA2Object.GREEN_B, 80],
    [SA2Object.ADXCHG, 81],
    [SA2Object.BAR, 82],
    [SA2Object.FENCES, 83],
    [SA2Object.FENCEL, 84],
    [SA2Object.BIGTHECAT, 85],
    [SA2Object.SIGNBOARD, 86],
    [SA2Object.POSTER, 87],
    [SA2Object.TREESTNB, 88],
    [SA2Object.POSTER3, 89],
    [SA2Object.LINKLINK, 90],
    [SA2Object.EPATH, 91],
    [SA2Object.GUIDANCE, 92],
    [SA2Object.EGOLD, 93],
    [SA2Object.SARROW, 94],
    [SA2Object.TRBACK, 95],
    [SA2Object.CARMAN_NEAR, 96],
    [SA2Object.SE_PATCAR, 97],
    [SA2Object.SE_KAZE, 98],
    [SA2Object.POSTERM, 99],
    [SA2Object.NOINPCOL, 100],
    [SA2Object.PIC, 101],
]);
