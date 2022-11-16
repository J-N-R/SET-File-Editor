import { ObjectGroup } from './interfaces';

/** Sonic Adventure 2 Objects */
export enum SA2Object {
    RING = 'Ring',
    RING_LINEAR = 'Line of Rings',
    RING_CIRCLE = 'Circle of Rings',
    SPRA = 'Spring',
    SPRB = 'Air Spring',
    TRIPLESPRING = 'Triple Spring',
    BIGJUMP = 'Big Jump',
    KASOKU = 'Dash Panel',
    SAVEPOINT = 'Save Point',
    SWITCH = 'Ball Switch',
    ITEMBOX = 'Item Box',
    ITEMBOXAIR = 'Floating Item Box',
    ITEMBOXBALLOON = 'Item Balloon',
    LEVUPDAI = 'Upgrade Item',
    GOALRING = 'Goal Ring',
    EMERALD = 'Emerald',
    UDREEL = 'Pulley',
    ORI = 'Cage',
    DYNAMITE = 'Dynamite',
    CONTWOOD = 'Metal Box',
    CONTIRON = 'Wood Box',
    ROCKET = 'Rocket',
    ROCKETMISSSILE = 'Rocket Launch Pad',
    SCHBOX = 'Hint Monitor',
    HINTBOX = 'Hint Box (Unused)',
    MSGER = 'Omochao',
    SSS = 'Push/Pull Object (Unused)',
    SOLIDBOX = 'Black Box',
    DMYOBJ = 'Blank Object',
    SOAPSW = 'Trigger Zone (Unused)',
    SKULL = 'Skull',
    PSKULL = 'Skull (Immobile)',
    CHAOPIPE = 'Animal Pipe',
    MINIMAL = 'Small Animal',
    WSMMLS = 'Whistle Area',
    CONTCHAO = 'Chao Box',
    STOPLSD = 'No Somersault Zone',
    KNUDAI = 'Mystic Shrine',
    KDASIBA = 'Shrine-activated Platform',
    KDWARPHOLE = 'Shrine-activated Warp',
    KDDOOR = 'Shrine-activated Door',
    KDITEMBOX = 'Shrine-activated Item Box',
    KDDRNGL = 'Shrine-activated Line of Rings',
    KDDRNGC = 'Shrine-activated Circle of Rings',
    KDSPRING = 'Shrine-activated Spring',
    KDSPRINGB = 'Shrine-activated Air Spring',
    SPHERE = 'Sphere Collision',
    CCYL = 'Cylinder Collision',
    CCUBE = 'Cube Collision',
    CWALL = 'Polygonal Collision',
    CCIRCLE = 'Circular Collision',
    MODMOD = 'Shadows',
    EFFOBJ0 = 'Particle Generator',
    EFFLENSF = 'Lens Flare',
    BUNCHIN = 'Moving Weight',
    IRONBALL2 = 'Rotating Spike Balls',
    EKUMI = 'Beetle',
    EAI = 'Hunter',
    LIGHTSW = 'General Shade for Character Area',
    BOARDCOL = 'Snowboard Trigger Area',
    CARMAN = 'Moving Car 1',
    CARKAZ = 'Stationary Car',
    TJUMPDAI = 'Trick Ramp',
    HAMMER = 'Bobbing Hexagon Pillar',
    TRUCK = 'Truck Appearance Trigger',
    IRONBAR = 'Swinging Pole',
    TREEST = 'Tree',
    SWDRNGL = 'Switch-activated Line of Rings',
    SWDRNGC = 'Switch-activated Circle of Rings',
    TREESHADOWS = 'Tree Shade for Character Area',
    LAMP = 'Decorative Lamp',
    CARMANC = 'Moving Car 2',
    SIGNS = 'Decorative Street Signs',
    SIGNS_F = 'Decorative Street Signs (No Collision)',
    SBLG = 'Big Billboard',
    ROADOBJ = 'Decorative Object',
    PALM = 'Palm Tree',
    BOARD = 'Snowboard Initial Position',
    CARKAZ_S = 'Stationary Car Small',
    SLIDER = 'Somersault Entrance',
    GREEN_B = 'Green Bush',
    ADXCHG = 'Music Change Trigger',
    BAR = 'Swinging Bar Generator',
    FENCES = 'Small Fence',
    FENCEL = 'Large Fence',
    BIGTHECAT = 'Big The Cat',
    SIGNBOARD = 'Billboard',
    POSTER = 'Poster 1',
    TREESTNB = 'Tree Alternate',
    POSTER3 = 'Poster 2',
    LINKLINK = 'Trick Points Trigger',
    EPATH = 'Moving Beetle',
    GUIDANCE = 'Arrow Guidance Barrier',
    EGOLD = 'Gold Beetle',
    SARROW = 'Arrow Guidance',
    TRBACK = 'Tree Tops',
    CARMAN_NEAR = 'Moving Car 3',
    SE_PATCAR = 'Police Siren Sound Effect',
    SE_KAZE = 'Wind Sound Effect',
    POSTERM = 'Poster 3',
    NOINPCOL = 'No Input Area',
    PIC = 'Tire',
};

export const COLLECTIBLES: SA2Object[] = [
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

export const ENEMIES: SA2Object[] = [
    SA2Object.EAI,
    SA2Object.EKUMI,
    SA2Object.EPATH,
    SA2Object.EGOLD,
    SA2Object.BUNCHIN,
    SA2Object.IRONBALL2,
];

export const STAGE_INTERACTIVE: SA2Object[] = [
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

export const BALL_SWITCH: SA2Object[] = [
    SA2Object.SWITCH,
    SA2Object.SWDRNGL,
    SA2Object.SWDRNGC,
];

export const MYSTIC_SHRINE: SA2Object[] = [
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

export const ACTORS: SA2Object[] = [
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

export const STAGE: SA2Object[] = [
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

export const COLLISIONS: SA2Object[] = [
    SA2Object.SPHERE,
    SA2Object.CCYL,
    SA2Object.CCUBE,
    SA2Object.CWALL,
    SA2Object.CCIRCLE,
]

export const ZONES: SA2Object[] = [
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

export const ALL_OBJECTS: ObjectGroup[] = [
    {
        name: 'Collectibles',
        objects: COLLECTIBLES,
    },
    {
        name: 'Enemies',
        objects: ENEMIES,
    },
    {
        name: 'Stage Interactables',
        objects: STAGE_INTERACTIVE,
    },
    {
        name: 'Ball Switch',
        objects: BALL_SWITCH,
    },
    {
        name: 'Mystic Shrine',
        objects: MYSTIC_SHRINE,
    },
    {
        name: 'Actors',
        objects: ACTORS,
    },
    {
        name: 'Stage',
        objects: STAGE,
    },
    {
        name: 'Collision',
        objects: COLLISIONS,
    },
    {
        name: 'Zones',
        objects: ZONES,
    },
];

/** A Map from an SA2Object to CityEscapeObjectID. */
export const CITY_ESCAPE_OBJECTS: Map<SA2Object, number> = new Map([
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