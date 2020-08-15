
/*************************************************************
******Which symbol indicates What:******
////features////
'blank space' = no brick
'P'           = paddle expansion
'p'           = paddle contraction
'B'           = increase ball size
'b'           = decrease ball size
'+'           = add one ball
'S'           = increase velocity of ball
's'           = decrease velocity of ball
'X'           = skull/lose one life
'L'           = increase life by one
'l'           = level up

////color////
'r' = red
'g' = green
'b' = blue
'y' = yellow
'm' = magenta
'c' = cyan
**************************************************************/


let levels = [
    // {   //demo level
    //     extra: [
    //         "PpBb+SsXLBPpBb+SsXL",
    //         "PpBb+SsXLbPpBb+SsXL",
    //         "PpBb+SsXLPPpBb+SsXL",
    //         "PpBb+SsXLpPpBb+SsXL",
    //         "PpBb+SsXLSPpBb+SsXL"
    //     ],
    //     color: [
    //         "rrrrrrrrrrrrrrrrrrr",
    //         "ggggggggggggggggggg",
    //         "bbbbbbbbbbbbbbbbbbb",
    //         "ccccccccccccccccccc",
    //         "mmmmmmmmmmmmmmmmmmm"
    //     ]
    // },
    {   //level 0
        extra: [
            ". . b . . . . l . .",
            " . . . . . X . . . ",
            ". p . . L . . . + .",
            " . . . . . S . P . ",
            ". . B . . . . L . ."
        ],
        color: [
            "r g b y m c r g b y",
            " r g b y m c r g b ",
            "c r g b y m c r g b",
            " c r g b y m c r g ",
            "m c r g b y m c r g"
        ]
    },

    {   //level 1
        extra: [
            " ...L....b...X..l. ",
            " .   ...X..L..   . ",
            " L .  p....+.  . X ",
            " . .   B.l..   . . ",
            " .s.    ...    ..S ",
            "         P         "
        ],
        color: [
            " bbbbbbbbbbbbbbbbb ",
            " b   rrrrrrrrr   b ",
            " b b  ggggggg  b b ",
            " b b   yyyyy   b b ",
            " bbb    ccc    bbb ",
            "         m         "
        ]
    },

    {   //level 2
        extra: [
            "       l..b.       ",
            "      ...L...      ",
            "     ..B....l.     ",
            "    ..X..l...S.    ",
            "   .+..s...L....   ",
            " ..X....L....X...P "
        ],
        color: [
            "      grbmbrg      ",
            "     grbmcmbrg     ",
            "    grbmcrcmbrg    ",
            "   grbmcrbrcmbrg   ",
            "  grbmcrbmbrcmbrg  ",
            " grbmcrbmgmbrcmbrg "
        ]
    },

    {   //level 3
        extra: [
            "L.+ .s. ..L .X. . p",
            ". . . . . . . . . .",
            "P.. .X. .+. .L. . X",
            ".   . . .   .   + .",
            "B   + . L   P   .s."
        ],
        color: [
            "rrr ggg bbb ccc y y",
            "r r g g b b c c y y",
            "rrr ggg bbb ccc y y",
            "r   g g b   c   y y",
            "r   g g b   c   yyy"
        ]
    }
]
