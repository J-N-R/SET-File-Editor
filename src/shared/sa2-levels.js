"use strict";
// Stage information found at:];
// https://docs.google.com/spreadsheets/d/1ShP3eTRoYKhqAZhSuecLgZmwRibp96bLbN-viI7QrXU/edit#gid=0
exports.__esModule = true;
exports.SA2_LEVELS = exports.CITY_ESCAPE_OBJECTS = void 0;
var objects_1 = require("./objects");
/** A Map from an SA2Object to CityEscapeObjectID. */
exports.CITY_ESCAPE_OBJECTS = new Set([
    objects_1.SA2Object.RING,
    objects_1.SA2Object.RING_LINEAR,
    objects_1.SA2Object.RING_CIRCLE,
    objects_1.SA2Object.SPRA,
    objects_1.SA2Object.SPRB,
    objects_1.SA2Object.TRIPLESPRING,
    objects_1.SA2Object.BIGJUMP,
    objects_1.SA2Object.KASOKU,
    objects_1.SA2Object.SAVEPOINT,
    objects_1.SA2Object.SWITCH,
    objects_1.SA2Object.ITEMBOX,
    objects_1.SA2Object.ITEMBOXAIR,
    objects_1.SA2Object.ITEMBOXBALLOON,
    objects_1.SA2Object.LEVUPDAI,
    objects_1.SA2Object.GOALRING,
    objects_1.SA2Object.EMERALD,
    objects_1.SA2Object.UDREEL,
    objects_1.SA2Object.ORI,
    objects_1.SA2Object.DYNAMITE,
    objects_1.SA2Object.CONTWOOD,
    objects_1.SA2Object.CONTIRON,
    objects_1.SA2Object.ROCKET,
    objects_1.SA2Object.ROCKETMISSSILE,
    objects_1.SA2Object.SCHBOX,
    objects_1.SA2Object.HINTBOX,
    objects_1.SA2Object.MSGER,
    objects_1.SA2Object.SSS,
    objects_1.SA2Object.SOLIDBOX,
    objects_1.SA2Object.DMYOBJ,
    objects_1.SA2Object.SOAP_SW,
    objects_1.SA2Object.SKULL,
    objects_1.SA2Object.PSKULL,
    objects_1.SA2Object.CHAOPIPE,
    objects_1.SA2Object.MINIMAL,
    objects_1.SA2Object.WSMMLS,
    objects_1.SA2Object.CONTCHAO,
    objects_1.SA2Object.STOPLSD,
    objects_1.SA2Object.KNUDAI,
    objects_1.SA2Object.KDASIBA,
    objects_1.SA2Object.KDWARPHOLE,
    objects_1.SA2Object.KDDOOR,
    objects_1.SA2Object.KDITEMBOX,
    objects_1.SA2Object.KDDRINGL,
    objects_1.SA2Object.KDDRINGC,
    objects_1.SA2Object.KDSPRING,
    objects_1.SA2Object.KDSPRINGB,
    objects_1.SA2Object.SPHERE,
    objects_1.SA2Object.CCYL,
    objects_1.SA2Object.CCUBE,
    objects_1.SA2Object.CWALL,
    objects_1.SA2Object.CCIRCLE,
    objects_1.SA2Object.MODMOD,
    objects_1.SA2Object.EFFOBJ0,
    objects_1.SA2Object.EFFLENSF,
    objects_1.SA2Object.BUNCHIN,
    objects_1.SA2Object.IRONBALL2,
    objects_1.SA2Object.E_KUMI,
    objects_1.SA2Object.E_AI,
    objects_1.SA2Object.LIGHT_SW,
    objects_1.SA2Object.BOARDCOL,
    objects_1.SA2Object.CARMAN,
    objects_1.SA2Object.CARKAZ,
    objects_1.SA2Object.TJUMPDAI,
    objects_1.SA2Object.HAMMER,
    objects_1.SA2Object.TRUCK,
    objects_1.SA2Object.IRONBAR,
    objects_1.SA2Object.TREEST,
    objects_1.SA2Object.SWDRNGL,
    objects_1.SA2Object.SWDRNGC,
    objects_1.SA2Object.TREESHADOWS,
    objects_1.SA2Object.LAMP,
    objects_1.SA2Object.CARMANC,
    objects_1.SA2Object.SIGNS,
    objects_1.SA2Object.SIGNS_F,
    objects_1.SA2Object.SBLG,
    objects_1.SA2Object.ROADOBJ,
    objects_1.SA2Object.PALM,
    objects_1.SA2Object.BOARD,
    objects_1.SA2Object.CARKAZ_S,
    objects_1.SA2Object.SLIDER,
    objects_1.SA2Object.GREEN_B,
    objects_1.SA2Object.ADXCHG,
    objects_1.SA2Object.BAR,
    objects_1.SA2Object.FENCES,
    objects_1.SA2Object.FENCEL,
    objects_1.SA2Object.BIG_THE_CAT,
    objects_1.SA2Object.SIGNBOARD,
    objects_1.SA2Object.POSTER,
    objects_1.SA2Object.TREESTNB,
    objects_1.SA2Object.POSTER3,
    objects_1.SA2Object.LINKLINK,
    objects_1.SA2Object.E_PATH,
    objects_1.SA2Object.GUIDANCE,
    objects_1.SA2Object.E_GOLD,
    objects_1.SA2Object.SARROW,
    objects_1.SA2Object.TRBACK,
    objects_1.SA2Object.CARMAN_NEAR,
    objects_1.SA2Object.SE_PATCAR,
    objects_1.SA2Object.SE_KAZE,
    objects_1.SA2Object.POSTERM,
    objects_1.SA2Object.NOINPCOL,
    objects_1.SA2Object.PIC,
]);
/** Map from level id to objList. */
// (Should we revise this and the other sa2Levels variable?)
exports.SA2_LEVELS = new Map([
    [13, exports.CITY_ESCAPE_OBJECTS],
]);
