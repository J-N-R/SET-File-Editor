import { SA2Object } from "./objects";
import { ObjectGroup } from "./interfaces";

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
    SA2Object.E_AI,
    SA2Object.E_KUMI,
    SA2Object.E_PATH,
    SA2Object.E_GOLD,
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
    SA2Object.KDDRINGL,
    SA2Object.KDDRINGC,
    SA2Object.KDSPRING,
    SA2Object.KDSPRINGB,
];

export const ACTORS: SA2Object[] = [
    SA2Object.MSGER,
    SA2Object.CARMAN,
    SA2Object.CARKAZ,
    SA2Object.CARMANC,
    SA2Object.CARKAZ_S,
    SA2Object.BIG_THE_CAT,
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
    SA2Object.LIGHT_SW,
    SA2Object.BOARDCOL,
    SA2Object.TRUCK,
];

export const CATEGORIZED_OBJECTS: ObjectGroup[] = [
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