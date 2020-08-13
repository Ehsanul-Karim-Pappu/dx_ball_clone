/************************************************************************************
*************************************************************************************
This array represents the game levels. Here I have used ' '/blank space to track,
where there will be no bricks. I have also used some other characters to represent
extra features and color like - paddle expansion or increase ball velocity
(absent in this version), etc.

******Which symbol indicates What:******
////features//// (This will be added in the future version.)
'blank space' = no brick
'P'           = paddle expansion
'p'           = paddle contraction
'S'           = increase velocity of ball
's'           = decrease velocity of ball
'X'           = skull/lose one life
'l'           = increase life by one
'L'           = level up

////color////
'r' = red
'g' = green
'b' = blue
'y' = yellow
'm' = magenta
'c' = cyan

*************************************************************************************
************************************************************************************/



let levels = [
    {   //level 0
        extra: [
            ". . S . . . . . . .",
            " . . . . . . . . X ",
            ". p . . L . . . . .",
            " . . . . . . . P . ",
            ". . S . s . . l . ."
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
            " ................. ",
            " .   .........   . ",
            " . .  .......  . . ",
            " . .   .....   . . ",
            " ...    ...    ... ",
            "         .         "
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
            "       .....       ",
            "      .......      ",
            "     .........     ",
            "    ...........    ",
            "   .............   ",
            " ................. "
        ],
        color: [
            "       rbgbr       ",
            "      rbmgmbr      ",
            "     rbmcgcmbr     ",
            "    rbmcrgrcmbr    ",
            "   rbmcrbgbrcmbr   ",
            " rrbmcrbmgmbrcmbrr "
        ]
    },

    {   //level 3
        extra: [
            "... ... ... ... . .",
            ". . . . . . . . . .",
            "... ... ... ... . .",
            ".   . . .   .   . .",
            ".   . . .   .   ..."
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
