/** Sonic Adventure 2 Objects */
export enum SA2Objects {
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

/** A Map from an SA2Object to CityEscapeObjectID. */
export const CITY_ESCAPE_OBJECTS: Map<SA2Objects, number> = new Map([
    [SA2Objects.RING, 0],
    [SA2Objects.RING_LINEAR, 1],
    [SA2Objects.RING_CIRCLE, 2],
    [SA2Objects.SPRA, 3],
    [SA2Objects.SPRB, 4],
    [SA2Objects.TRIPLESPRING, 5],
    [SA2Objects.BIGJUMP, 6],
    [SA2Objects.KASOKU, 7],
    [SA2Objects.SAVEPOINT, 8],
    [SA2Objects.SWITCH, 9],
    [SA2Objects.ITEMBOX, 10],
    [SA2Objects.ITEMBOXAIR, 11],
    [SA2Objects.ITEMBOXBALLOON, 12],
    [SA2Objects.LEVUPDAI, 13],
    [SA2Objects.GOALRING, 14],
    [SA2Objects.EMERALD, 15],
    [SA2Objects.UDREEL, 16],
    [SA2Objects.ORI, 17],
    [SA2Objects.DYNAMITE, 18],
    [SA2Objects.CONTWOOD, 19],
    [SA2Objects.CONTIRON, 20],
    [SA2Objects.ROCKET, 21],
    [SA2Objects.ROCKETMISSSILE, 22],
    [SA2Objects.SCHBOX, 23],
    [SA2Objects.HINTBOX, 24],
    [SA2Objects.MSGER, 25],
    [SA2Objects.SSS, 26],
    [SA2Objects.SOLIDBOX, 27],
    [SA2Objects.DMYOBJ, 28],
    [SA2Objects.SOAPSW, 29],
    [SA2Objects.SKULL, 30],
    [SA2Objects.PSKULL, 31],
    [SA2Objects.CHAOPIPE, 32],
    [SA2Objects.MINIMAL, 33],
    [SA2Objects.WSMMLS, 34],
    [SA2Objects.CONTCHAO, 35],
    [SA2Objects.STOPLSD, 36],
    [SA2Objects.KNUDAI, 37],
    [SA2Objects.KDASIBA, 38],
    [SA2Objects.KDWARPHOLE, 39],
    [SA2Objects.KDDOOR, 40],
    [SA2Objects.KDITEMBOX, 41],
    [SA2Objects.KDDRNGL, 42],
    [SA2Objects.KDDRNGC, 43],
    [SA2Objects.KDSPRING, 44],
    [SA2Objects.KDSPRINGB, 45],
    [SA2Objects.SPHERE, 46],
    [SA2Objects.CCYL, 47],
    [SA2Objects.CCUBE, 48],
    [SA2Objects.CWALL, 49],
    [SA2Objects.CCIRCLE, 50],
    [SA2Objects.MODMOD, 51],
    [SA2Objects.EFFOBJ0, 52],
    [SA2Objects.EFFLENSF, 53],
    [SA2Objects.BUNCHIN, 54],
    [SA2Objects.IRONBALL2, 55],
    [SA2Objects.EKUMI, 56],
    [SA2Objects.EAI, 57],
    [SA2Objects.LIGHTSW, 58],
    [SA2Objects.BOARDCOL, 59],
    [SA2Objects.CARMAN, 60],
    [SA2Objects.CARKAZ, 61],
    [SA2Objects.TJUMPDAI, 62],
    [SA2Objects.HAMMER, 63],
    [SA2Objects.TRUCK, 64],
    [SA2Objects.IRONBAR, 65],
    [SA2Objects.TREEST, 66],
    [SA2Objects.SWDRNGL, 67],
    [SA2Objects.SWDRNGC, 68],
    [SA2Objects.TREESHADOWS, 69],
    [SA2Objects.LAMP, 70],
    [SA2Objects.CARMANC, 71],
    [SA2Objects.SIGNS, 72],
    [SA2Objects.SIGNS_F, 73],
    [SA2Objects.SBLG, 74],
    [SA2Objects.ROADOBJ, 75],
    [SA2Objects.PALM, 76],
    [SA2Objects.BOARD, 77],
    [SA2Objects.CARKAZ_S, 78],
    [SA2Objects.SLIDER, 79],
    [SA2Objects.GREEN_B, 80],
    [SA2Objects.ADXCHG, 81],
    [SA2Objects.BAR, 82],
    [SA2Objects.FENCES, 83],
    [SA2Objects.FENCEL, 84],
    [SA2Objects.BIGTHECAT, 85],
    [SA2Objects.SIGNBOARD, 86],
    [SA2Objects.POSTER, 87],
    [SA2Objects.TREESTNB, 88],
    [SA2Objects.POSTER3, 89],
    [SA2Objects.LINKLINK, 90],
    [SA2Objects.EPATH, 91],
    [SA2Objects.GUIDANCE, 92],
    [SA2Objects.EGOLD, 93],
    [SA2Objects.SARROW, 94],
    [SA2Objects.TRBACK, 95],
    [SA2Objects.CARMAN_NEAR, 96],
    [SA2Objects.SE_PATCAR, 97],
    [SA2Objects.SE_KAZE, 98],
    [SA2Objects.POSTERM, 99],
    [SA2Objects.NOINPCOL, 100],
    [SA2Objects.PIC, 101],
]);
