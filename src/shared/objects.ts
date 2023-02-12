// Object information found at:
// https://docs.google.com/spreadsheets/d/1rrh1khlqAtQrgu0Q4MKqSlfj8P5AiDjDUpHeoKRFvII/edit#gid=0

/** Every object in Sonic Adventure 2. */
export enum SA2Object {
    TRIPLESPRING = 'Triple Spring',
    ADXCHG = 'Music change trigger',
    AIRCONT = 'Big storage box',
    AIRSHIP = 'Blimp',
    ARROW = 'Floor arrow',
    ARROWH3 = 'Horizontal 3-axis arrow sign',
    ASHIBA = 'Yellow platform',
    AWNING = 'Door Torch',
    BANGIETUTA = 'Bungie vine',
    BALOON = 'Kart balloon',
    BAR = 'Swinging bar',
    BAT = 'Bat',
    BCOL = 'Background rocket',
    BIG_THE_CAT = 'Big the Cat',
    BIGJUMP = 'Launch panel',
    BIGSHUTTER = 'Giant tower shutter',
    BIRIBIRI = 'Electricity effect',
    BLINE = 'Game-crashing object (?)',
    BLOCK = 'Breakable block',
    BLOCK2 = 'Block ports',
    BOAB = 'Snowboard obstacle',
    BOARD = 'Snowboard Initial Position',
    BOARD2 = 'Priest painting',
    BOARDCOL = 'Snowboard trigger',
    BOMBE = 'Gas canister',
    BONE = 'Cow skull',
    BORING = 'Drilling tower',
    BOX = 'Chest',
    BOXSHOUKOU = 'Big floating platform',
    BRIDGE = 'Bridge',
    BRIDGE_DYNA = 'Explodable bridge',
    BUBBLE = 'Air bubble spawner',
    BUBBLES = 'Bubble stream',
    BUFFER = 'Recycling bin',
    BUG = 'Stone beetle',
    BUNCHIN = 'Crushing weight',
    BURST = 'End-of-level bursting effect',
    BUTTERFLIES = 'Butterflies',
    CAGE = 'Enemy-triggered gates',
    CAGEB = 'Enemy-triggered gates',
    CAGEC = 'Enemy-triggered gates',
    CAGED = 'Enemy-triggered gates',
    CAM = 'Camera',
    CAMH = 'Horizontally-moving camera',
    CAMV = 'Vertically-moving camera',
    CANOE = 'Canoe',
    CAPSULE = 'Metal capsule',
    CAPSULEBOMB = 'Exploding capsule',
    CAPSULEBOMB_FAR = 'Exploding capsure long draw distance',
    CARKAZ = 'Car',
    CARKAZ_S = 'Car short draw distance',
    CARMAN = 'Moving car',
    CARMAN_NEAR = 'Moving car short draw distance',
    CARMANC = 'Moving car',
    CASHBOX = 'Safe door',
    CART_RING = 'Cart ring',
    CBRI = 'Small construction fence',
    CC_SWITCH = 'Timestop switch',
    CCIRCLE = 'Circular collision',
    CCUBE = 'Cube collision',
    CCYL = 'Cylinder collision',
    CGIRON = 'Gravity-changing steel box',
    CGWOOD = 'Gravity-changing wooden box',
    CHAOPIPE = 'Small animal pipe',
    CHIMNEY = 'Eggman smokestack',
    CHIN = 'Striped pillar',
    CHIN2 = 'Striped rubble',
    CHIN3 = 'Spotted rubble',
    CLEAR_SW = 'Unused trigger',
    CMDOOR = 'Spiked fence door',
    COFFIN = 'Golden goddess box',
    CONT = 'Big moving platform',
    CONTA = 'Moving box platform',
    CONTB = 'Moving platform',
    CONTC = 'Moving double platform',
    CONTCHAO = 'Chao box',
    CONTIRON = 'Steel box',
    CONTWOOD = 'Wooden box',
    conwood = 'Duplicate wooden box',
    CORNER = 'Corner fence',
    COVER = 'Rocket cover',
    CWALL = 'Plane collision',
    DAI = 'Giant stackable canister',
    DAMMY = 'Prop missile',
    DASH_PANEL = 'Kart dash panel',
    DITCH = 'Light strip texture',
    DFLY = 'Dragonfly',
    DLCONT = 'Striped box',
    DMARK = 'Sun/Moon rings',
    DMK = 'Sun/Moon rings',
    DMYOBJ = 'Blank object',
    DOBJF = 'Box with destroyed Hawk',
    DOOR = 'Hourglass door',
    DOORT = 'Shrine-activated door',
    DOOR_LIGHT = 'Door outline light',
    DORYOKURO = 'Power supply',
    DRILLCOL = 'Drill trigger',
    DRMCN = 'Barrel',
    drmcun = 'Duplicate barrel',
    DUMMY = 'Floor arrow',
    DYNAMITE = 'Dynamite',
    E_1000 = 'E-1000s',
    E_AI = 'Hunter',
    E_AI_F = 'Hunter large draw distance',
    E_AI_N = 'Hunter short draw distance',
    E_AKAHIGE = 'Phoenix',
    E_BATABATA = 'Chomper',
    E_BEETON = 'Buzzbomber',
    E_CHAOS = 'Artificial Chaos',
    E_EMI = 'Rhino',
    E_EMI_F = 'Rhino large draw distance',
    E_EMI_N = 'Rhino short draw distance',
    E_GHOST = 'Ghosts',
    E_GOLD = 'Gold Beetle',
    E_KUMI = 'Beetle',
    E_KUMI_F = 'Beetle large draw distance',
    E_KUMI_N = 'Beetle short draw distance',
    E_KYOKO = 'Hawk',
    E_KYOKO_F = 'Hawk large draw distance',
    E_KYOKO_N = 'Hawk short draw distance',
    E_NAMIE = 'Hornet',
    E_NAMIE_F = 'Hornet large draw distance',
    E_NAMIE_N = 'Hornet short draw distance',
    E_PATH = 'Moving enemies',
    E_PATHCHAOS = 'Moving Artificial Chaos',
    E_SARU = 'Ukikis',
    E_SHOUKO = 'Airplane',
    E_SW_SHOUKO = 'Airplane trigger',
    E_UNI = 'Unidus',
    EECONT = 'Flying box',
    EFLENSF0 = 'Lens flare',
    EFFLENSF = 'Duplicate lens flare',
    EFFOBJ0 = 'Particle generator',
    ELEPIL = 'Electric pillar',
    ELEPIL2 = 'Yellow goo pillar',
    ELV = 'Elevator',
    EMERALD = 'Hunting items',
    EMERALD_F = 'Emerald large draw distance',
    EYE = 'Wall eye',
    FALLASHIBA = 'Breaking ledge',
    FAN = 'Fan',
    FB2 = 'Moving meteor',
    FCG_CYL0 = 'Gravity tube without cap',
    FCG_CYL1 = 'Gravity tube with cap',
    FCG_CYL_PARTS = 'Gravity tube stopper',
    FCG_CYL_SPARK = 'Gravity tube electricity',
    FENCE = 'Fence',
    FENCE_S = 'Fence short draw distance',
    FENCEL = 'Large fence',
    FENCES = 'Small fence',
    FENCES_S = 'Small fence short draw distance',
    FIG_AI = 'Dreamcast inactive Hunter',
    FIG_AI2 = 'Battle inactive Hunter',
    FIG_ENE = 'Landed jet',
    FIRE2 = 'Big suspended fire',
    FIRE3 = 'Torch',
    FIRE4 = 'Bowl fire',
    FIREBALL = 'Still meteor',
    FIREPOT = 'Big fire pot',
    FIRZIZ = 'Fire-breathing skull',
    FISH = 'School of fish',
    FLAG = 'Red flag',
    FLAGLOW = 'Purple flag',
    FLOWER = 'Red flowers',
    FLUO = 'Fluorescent light',
    FOGCOL = 'Fog collision (?)',
    FOGSW = 'Fog spawner (?)',
    FORKED = 'Path split signs',
    FRSTAGE = 'Square platform',
    FRSTAGE_FAR = 'Square platform large draw distance',
    FUN = 'Ceiling fan',
    G_LIGHT_SW = 'Player shadow trigger',
    GAKE = 'Collapsing end platform',
    GATE = 'Autoscroller laser gate',
    GATE2 = 'Kart checkpoint',
    GLIGHT = 'Light blur',
    GLIGHT2 = 'Light effect',
    GLIND = 'Grind rail',
    GLIND_B = 'Upward rail platform with stopper',
    GLINDRB = 'Blue grind rails',
    GOAL_DOOR = 'Goal button',
    GOALDOOR = 'Goal door',
    GOALRING = 'Goal Ring',
    GRAV_SW = 'Gravity sphere',
    GRAVE = 'Stone coffin with pillars',
    GREEN_B = 'Green bush',
    G_RING = 'Kart line of rings',
    GRVSTONE = 'Gravestone',
    GSGATE = 'Ghost train gate',
    GSTRAIN = 'Ghost train spawner',
    GSWITCH2 = 'Gravity switch',
    GUIDANCE = 'Collision for glowing arrows',
    HAKO = 'Breakable stone monument',
    HANA = 'Yellow flower',
    HANA2 = 'Purple flower',
    HAMMER = 'Moving hexagon pillar',
    HAMMER2 = 'Game-crashing object',
    HAMMER3 = 'Explodable pillar',
    HANGRING = 'Hoop on a stick',
    HASHIRA = 'Explodable platform',
    HATA = 'Upright flag',
    HATA2 = 'Protruding flag',
    HATADAI = 'Hexagonal pillar',
    HATCH_A = 'Explodable hatches',
    HATCH_B = 'Explodable hatches',
    HIDECOLI = 'Hiding-from-beetle trigger',
    HIDELIGHT = 'Green beetle light (?)',
    HINTBOX = 'Unused hint box',
    INDCTR = 'Up arrow wall',
    IRON3 = 'Floating steel box',
    IRONBALL2 = 'Spinning spike balls',
    IRONBAR = 'Swinging iron bar',
    ISLAND = 'Background island',
    ITEMBOX = 'Item box',
    ITEMBOX2_B = '2P Battle item box (?)',
    ITEMBOXAIR = 'Floating item box',
    ITEMBOXBALLOON = 'Item balloon',
    JO = 'Object',
    JO_F = 'Object large draw distance',
    JO_FAR = 'Object larger draw distance',
    JO2 = 'Object alternative',
    JO2_FAR = 'Object alternative large draw distance',
    JP = 'Plant',
    JP_F = 'Plant large draw distance',
    JP_FAR = 'Plant larger draw distance',
    JUMP_PANEL = 'Kart jump panel',
    KAGE = 'Palm shadow',
    KAITEN = 'Hieroglyphics block',
    KAKASI = 'Scarecrow',
    KAKUSI = 'Yellow road strip',
    KANBAN = 'Kart billboard',
    KAME = 'Turtle',
    KAMOME = 'Seagull flock',
    KARAMI = 'Game-crashing object (?)',
    KASOKU = 'Dash Panel',
    KAZ3 = 'Background object',
    KAZANI = 'Swarming dragonflies',
    KAZOBJ = 'Light panels',
    KDASIBA = 'Shrine-activated platform',
    KDDOOR = 'Shrine-activated door',
    KDDRNGC = 'Shrine-activated circle of rings',
    KDDRNGL = 'Shrine-activated line of rings',
    KDITEMBOX = 'Shrine-activated item box',
    KD_SPRA = 'Shrine-activated spring',
    KD_SPRB = 'Shrine-activated spring',
    KDSPRING = 'Shrine-activated spring',
    KDSPRINGB = 'Shrine-activated control-locking spring',
    KDWARPHOLE = 'Shrine-activated warp',
    KEY = 'Key',
    KEYDOOR = 'Key door',
    KEYHOLE = 'Key hole',
    HIKOUSEN = 'Blimp',
    KNUDAI = 'Mystic Shrine',
    KOTEIDAI = 'Sunken pillar',
    KSKULL = 'Kickable skull',
    KUSA = 'Grass',
    L_BLUE = 'Blue hallway lights',
    L_ORANGE = 'Orange light texture',
    LAMP = 'Decorative lamp',
    LASTSTEP = 'Mech-locking platform',
    LAZER = 'Laser',
    LEAF = 'Short green plant',
    LEVUPDAI = 'Upgrade',
    LIGHT = 'Cave lighting',
    LIGHT_A = 'Orange light strip',
    LIGHT_BCDE = 'Orange light rectangle partial perimeter',
    LIGHT_SW = 'Shaded area',
    LIGHT_SW_F = 'Shaded area area large draw distance',
    LIGHTBAR = 'Glowing orange light row',
    LIGHTEFF = 'Pixel lighting effect',
    LIGHTW = 'Quadruple runway lights',
    LINE = 'Yellow perimeter thing',
    LINKLINK = 'Trick points trigger',
    LIONHEAD = 'Holdable gold lion head',
    LOCKON = 'Target',
    LOCKON_FAR = 'Target large draw distance',
    LSHELTH = 'Final missile door',
    LSHELTV = 'Final missile door (vertical)',
    MACHINE = 'Moving treads',
    MAP = 'Map',
    MAT = 'Carpet',
    MDCONTBOX = 'Destroyable box',
    MDCONTWOOD = 'Floating wooden box',
    MECHA = 'Hallway texture effect',
    METEO = 'Meteor',
    METEO_MOVE = 'Spinning meteor',
    METEO_MOVE_F = 'Spinning meteor large draw distance',
    METEO_MOVE_FAR = 'Spinning meteor larger draw distance',
    METEO_SET = 'Still meteor',
    METEO_SET_FAR = 'Still meteor large draw distance',
    METEOBIG = 'Punchable meteor',
    METEOBULLET = 'Fire meteor',
    METEOBULLET2 = 'Regular meteor',
    METEOSHUT = 'Destroyable door',
    MHCONT = 'Moving platform',
    MHCONT_F = 'Moving platform large draw distance',
    MHCONT0 = 'Moving double platform',
    MHCONT0_F = 'Moving double platform large draw distance',
    MHCONTB = 'Moving platform 2',
    MHMISSILE = 'Giant grabbable missile',
    MHSLIDER = 'Somersault barrier',
    MIBAR = 'Hallway wooden bar',
    MIFENCE = 'Broken wooden fence',
    MIFRAME = 'Diggable wooden frame',
    MIINFO = 'Water level sign',
    MIKLIN = 'Oven',
    MIKOSHI = 'Golden goddess box',
    MIKUSA = 'Grass',
    MILATTI = 'Spiked wooden frame',
    MILIFT = 'Water level lift',
    MILUMP = 'Lantern',
    MIMOCL = 'Giant fan',
    MINIMAL = 'Small animal',
    MINITSUBO = 'Holdable jar',
    MIRAIL = 'Minecart rails',
    MIRING = 'Hexagonal ring',
    MISSILE = 'Final door missile',
    MITOOL = 'Ghost pulley',
    MITRUCK = 'Minecart',
    MITRUCKP = 'Destroyed minecart',
    MIWOOD = 'Stacked wood',
    MIWOODY = 'Wooden beam',
    MIZUKUSA = 'Swaying grass',
    MLIFT = 'Square lift',
    MOASIBA = '(?)',
    MOASIBAF = '(?) large draw distance',
    MODMOD = 'Protruding metal platform',
    MONEY = 'Blowing money',
    MOTOOL = 'Wheel pulley',
    MOTOOLF = 'Wheel pulley large draw distance',
    MOUTH = 'Mouth torch',
    MOVENT = 'Fan',
    MOVENTF = 'Fan large draw distance',
    MSBRILONG = 'Long yellow walkway',
    MSBRIMINI = 'Mini yellow walkway',
    MSBRISHORT = 'Short yellow walkway',
    MSBRISLOPE = 'Sloped walkway',
    MSGER = 'Omochao',
    MSGER_F = 'Omochao large draw distance',
    MUJINGUN = 'Invincible gun',
    NIGHTS = 'NiGHTS head',
    NEON = 'Neon Eggman sign',
    NET = 'Fence panel',
    NOCOLSKULL = 'Collisionless skull',
    NOINPCOL = 'Input-disabling trigger',
    NOREN = 'Wall condor',
    O_HAZ_BOMB = 'Kickable bomb',
    OIL = 'Oil pump',
    ORE = 'Crystal',
    ORI = 'Cage',
    PAINTING = 'Non-warp wall paintings',
    PALM = 'Palm tree',
    PANEL = 'Floor panel',
    PANELAREA = 'Floor/block indicator',
    PIC = 'Holdable stage objects',
    PICPUM1 = 'Holdable pumpkin',
    PILLAR = 'Big pillar',
    PILLAR2 = 'Topless hexagonal pillar',
    PILLAR3 = 'Three-pillar arch',
    PILLAR4 = 'Lopsided three-pillar arch',
    PLANT = 'Dry Lagoon Dreamcast sideways seaweed',
    PLANT2 = 'Small red plant',
    PLANT3 = 'Small brown plant',
    PLANT4 = 'Dry Lagoon Dreamcast sideways seaweed',
    PLANTER = 'Three-legged machine fan',
    PNP = 'Propellor spring',
    POISON = 'Acid wall',
    POLE = 'Square pillar',
    POLEOBJ = 'Over-the-road signs',
    POOL = 'Square pool',
    POSTER = 'Posters',
    POSTER3 = 'Translucent poster shadow',
    POSTERM = 'Opaque poster shadow',
    PPK_BG = 'Big pumpkin',
    PPK_SM = 'Small pumpkin',
    PPSHED = 'House',
    PROPELLER = 'Spinning fan on pole',
    PROPELLER2 = 'Wall flower',
    PSKULL = 'Immovable skull',
    PUMSASI = 'Platform with connector',
    PUMWALL = 'Metal wall',
    PUMWALL_S = 'Metal wall short draw distance',
    PYRAMID = 'Pyramid pickup',
    RADER = 'Radar dish',
    RADERS = 'Circular satellite dish',
    RAILOBJA = 'Broken railroad track with caution rails',
    RAILOBJBL = 'Left-protruding sign with spinning X\'s',
    RAILOBJBR = 'Right-protruding sign with spinning X\'s',
    RAILOBJCL = 'Left-protruding sign with swinging X panel',
    RAILOBJCR = 'Right-protruding sign with swinging X panel',
    RBLK = 'Roadblock with lights',
    RBR = 'Roadblock without lights',
    RCROSS = 'Broken railroad crossing sign',
    REDLA = 'Four flashing red lights',
    REDLAMP = 'Red light (?)',
    REDLB = 'Two flashing red lights',
    RESTART_OBJ = 'Kart ??',
    RING = 'Ring',
    RING_CIRCLE = 'Circle of rings',
    RING_LINEAR = 'Line of rings',
    RINGKAZ = 'Rail hoop',
    RLIGHT = 'Small beacon',
    RMISSILE = 'Duplicate missile',
    ROADOBJ = 'Prop',
    ROBJ = 'Road objects',
    ROBJ_M = 'Road objects medium draw distance',
    ROBJ_S = 'Road objects short draw distance',
    ROCK = 'Floating rock',
    ROCKET = 'Player-activated rocket',
    ROCKETK = 'Duplicate rocket',
    ROCKETMISSSILE = 'Player-activated rocket launchpad',
    ROLL = 'Rotating gear',
    ROLTUTA = 'Horizontal swinging vine',
    ROLTUTAT = 'Vertical swinging vine',
    SAKU = 'Log fence',
    SANDGLASS = 'Hourglass',
    SARROW = 'Glowing arrow',
    SASA = 'Tall green plant',
    SAVEPOINT = 'Checkpoint',
    SB_L = 'Billboard large',
    SB_S = 'Billboard small',
    SBLG = 'Billboard larger',
    SCHBOX = 'Hint monitor',
    SCOL = 'Road break trigger',
    SCORPION = 'Scorpion tile',
    SE = 'Sound effect',
    SE_KAZE = 'Sound effect: Whoosh',
    SE_PATCAR = 'Sound effect: Police siren',
    SE_TOPPU = 'Sound effect: Blowing wind',
    SE_TUNNEL = 'Sound effect: Final Rush tunnels',
    searchbox = 'Duplicate searchbox',
    SEARCHLIGHT = 'Searchlight',
    SG_ITEMBOX = 'Sunglasses-activated item box',
    SG_RING = 'Sunglasses-activated ring',
    SG_SEARCHBOX = 'Sunglasses-activated hint monitor',
    SG_SPRA = 'Sunglasses-activated Scope spring',
    SG_SPRB = 'Sunglasses-activated Scope air spring',
    SGOAL = 'Post-Goal Ring door',
    SGOLID = 'Gravity-changing black box',
    SGITEMBOX = 'Sunglasses-activated item box',
    SGRING = 'Sunglasses-activated ring',
    SGSCHBOX = 'Sunglasses-activated hint monitor',
    SGSPRING = 'Sunglasses-activated spring',
    SGSPRINGB = 'Sunglasses-activated air spring',
    SHADOW = 'Circular shadow',
    SHAFT = 'Piston shaft',
    SHELF = 'Alcove',
    SHELTH = 'Horizontal shootable door',
    SHELTV = 'Vertical shootable door',
    SHIP = 'Swinging ship',
    SHOUKOU = 'Square floating platform',
    SHOUKOUK = 'Wide floating platform',
    SHUT = 'Destroyable door',
    SHUTS = 'Small explodable shutter',
    SHUTTER = 'Sliding doors',
    SHUTTER_FAR = 'Sliding doors large draw distance',
    SIDEWIND = 'Horizontal wind',
    SIGN = 'Flashing floor arrow',
    SIGNA = 'Arrow signal',
    SIGNAL = 'Flashing light',
    SIGNAL_F = 'Flashing light large draw distance',
    SIGNBOARD = 'Sign billboard',
    SIGNEND = 'Floating signs',
    SIGNENDE = 'End lights',
    SIGNL = 'Overhanging sign',
    SIGNS = 'Signage',
    SIGNS_F = 'Signage large draw distance',
    SIGNSHIP = 'Big arrow sign',
    SIGNTRICK = 'Rail trick light',
    SIREN = 'Flashing red light',
    SKULL = 'Skull',
    SL = 'Glowing light',
    SLANE = 'Breakable road',
    SLANE2 = 'Breakable road',
    SLGATE = 'Somersault gate',
    SLIDER = 'Somersault barrier',
    SNAKEDISH = 'Big fire pot held by snakes',
    SNAKEDISH2 = 'Fire pot held by snakes',
    SNAKEPOT = 'Snake altar',
    SNAKESTATUE = 'Snake statue',
    SNEAKHEAD = 'Snake head torch',
    SNEAKRAIL = 'Snake rail head',
    SOAP_SW = 'Trigger zone (unused)',
    SOLID3 = 'Spinning black box',
    SOLIDBOX = 'Black box',
    SPARK = 'Spark effect (?)',
    SPHERE = 'Spherical collision entity',
    SPIDERWEB = 'Pyramid Cave spider web',
    SPINNER = 'Spinning part',
    SPRA = 'Spring',
    SPRB = 'Air Spring',
    SSS = 'Push/Pull object (unused)',
    STAFF = 'Pole',
    STAGE = 'Platform',
    STAGE_F = 'Platform large draw distance',
    STAKE = 'Stake',
    STEP = 'Small floating platform',
    STEP_FAR = 'Small floating platform large draw distance',
    STEPB = 'Large floating platform',
    STEPB_FAR = 'Large floating platform large draw distance',
    STONEHEAD = 'Pushable stone head',
    STOPLOCKON = 'Mech lock-on blocking trigger',
    STOPLSD = 'No somersault zone',
    STOPPER = 'Stopper bump',
    STORE = 'Shoe box',
    STREAM = 'Water current',
    STROCKET = 'Stage-beginning rocket',
    SWDRNGC = 'Switch-activated circle of rings',
    SWDRNGL = 'Switch-activated line of rings',
    SWITCH = 'Ball switch',
    TAIMATSU = 'Torch lighting effect (?)',
    TAIMATU = 'Torch',
    TAKI = 'Waterfall',
    TANK = 'Metal tank',
    TATETUTA = 'Slinging vines',
    TERMINAL = 'Ghost train turntable',
    TEST = '3D space test object',
    TESTWOOD = 'Mossy branch',
    TIM = 'Chimney',
    TIMF = 'Chimney large draw distance',
    TJUMPDAI = 'Trick ramp',
    TOBOKU = 'Mossy log',
    TOBOKU_F = 'Mossy log large draw distance',
    TOBOKU_FAR = 'Mossy log larger draw distance',
    TOGE = 'Spikes',
    TOLLGATE = 'Tool booth',
    TORCH = 'Covered torch',
    TORCH2 = 'Wall torch',
    TORCHCUP = 'Tall torch',
    TP1 = 'Big totem',
    TP2 = 'Small totem',
    TRBACK = 'Bush collision',
    TREASURE = 'Chest',
    TREESHADOWS = 'Tree shadow',
    TREEST = 'Tree sprite',
    TREESTNB = 'Tree Alternate',
    TRUCK = 'GUN truck trigger',
    TSUBO = 'Jar',
    UDREEL = 'Pulley',
    UGOKIDAI = 'Sunken block',
    UKIASIBA = 'Metal platform',
    UPSTREAM = 'Vertical stream',
    VASE = 'Holdable vase',
    VULCAN = 'Pyramid',
    WALL = 'Somersault barrier',
    WALL_FIRE = 'Wall fire',
    WARP = 'Warp pit',
    WARP_N = 'Warp pit short draw distance',
    WARP2 = 'Warp pit alternate',
    WARPCOLI = 'Warp trigger',
    WEED = 'Weeds',
    WIND = 'Wind',
    WIND2 = 'Wind',
    WINDMILL = 'Windmill',
    WOODEAD = 'Dead tree',
    WSMMLS = 'Whistle area',
    YAJI = 'Arrow thing',
    YAJI2 = 'Arrow thing',
    YASI = 'Palm tree',
    YOKOTUTA = 'Slinging vines',
};
