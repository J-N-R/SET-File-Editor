interface IntroNote {
    readonly icon: string;
    readonly text: string;
}

/** Content for the 'Intro' page. */
export const NOTES: IntroNote[] = [
    {
        icon: 'lock',
        text: 'Each level\'s enemy types are restricted by level.',
    },
    {
        icon: 'pin',
        text: 'Blender coordinates are different from game coordinates.',
    },
    {
        icon: 'info',
        text: 'Keep an eye out for "help" menus to explain object types and variables!',
    },
];
