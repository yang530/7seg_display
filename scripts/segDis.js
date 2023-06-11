//class of rendering 7-segment displays on canvas
//this class utilizes only javascript without any frameworks or libraries
export class SegDis {

    #segDisH = 0;
    #segDisW = 0;
    #segLen = 0;
    #segWth = 0;
    #disGap = 0;
    #segMarg = 0;
    #segPosX = 0;
    #segPosY = 0;
    #context;
    #disColor = "rgb(232, 185, 35)"; //color of filled segments of display

    //pattern is a 7 digit binary control code for display segments of EACH 7 seg display 
    //pattern can be an integer from 0 to 127
    //index:   0123456
    //binary:  0000000 (zeros and ones)
    #pattern = "0000000"; //pattern initialized as all zeros (all segments off)

    //pattern code chart as following
    #segChar = [
        "0", // index: 0
        "1", // index: 1
        "2", // index: 2
        "3", // index: 3
        "4", // index: 4
        "5", // index: 5
        "6", // index: 6
        "7", // index: 7
        "8", // index: 8
        "9", // index: 9
        " ", // index: 10
        "a", // index: 11
        "b", // index: 12
        "c", // index: 13
        "d", // index: 14
        "e", // index: 15
        "f", // index: 16
        "g", // index: 17
        "h", // index: 18
        "i", // index: 19
        "j", // index: 20
        "k", // index: 21
        "l", // index: 22
        "m", // index: 23
        "n", // index: 24
        "o", // index: 25
        "p", // index: 26
        "q", // index: 27
        "r", // index: 28
        "s", // index: 29
        "t", // index: 30
        "u", // index: 31
        "v", // index: 32
        "w", // index: 33
        "x", // index: 34
        "y", // index: 35
        "z", // index: 36
    ];
    //seg code is a 7 digit binary control code for display segments of EACH 7 seg display 
    #segCode = [
        "1111110", // index: 0  | Char: 0
        "0110000", // index: 1  | Char: 1
        "1101101", // index: 2  | Char: 2
        "1111001", // index: 3  | Char: 3
        "0110011", // index: 4  | Char: 4
        "1011011", // index: 5  | Char: 5
        "1011111", // index: 6  | Char: 6
        "1110000", // index: 7  | Char: 7
        "1111111", // index: 8  | Char: 8
        "1111011", // index: 9  | Char: 9
        "0000000", // index: 10 | Char: space
        "1110111", // index: 11 | Char: a
        "0011111", // index: 12 | Char: b
        "1001110", // index: 13 | Char: c
        "1111100", // index: 14 | Char: d
        "1001111", // index: 15 | Char: e
        "1000111", // index: 16 | Char: f
        "1011110", // index: 17 | Char: g
        "0110111", // index: 18 | Char: h
        "0000110", // index: 19 | Char: i
        "0111000", // index: 20 | Char: j
        "1010111", // index: 21 | Char: k
        "0001110", // index: 22 | Char: l
        "1101010", // index: 23 | Char: m
        "1110110", // index: 24 | Char: n
        "0011101", // index: 25 | Char: o
        "1100111", // index: 26 | Char: p
        "1110011", // index: 27 | Char: q
        "0000101", // index: 28 | Char: r
        "0010011", // index: 29 | Char: s
        "1000110", // index: 30 | Char: t
        "0111110", // index: 31 | Char: u
        "0011000", // index: 32 | Char: v
        "1011100", // index: 33 | Char: w
        "1001001", // index: 34 | Char: x
        "0111011", // index: 35 | Char: y
        "0001001", // index: 36 | Char: z
    ];

    //constructor of the class
    constructor(sl, sw, dh, dw, g, c, m, x, y){

        this.#segDisH = dh;
        this.#segDisW = dw;
        this.#segLen = sl;
        this.#segWth = sw;
        this.#disGap = g;
        this.#context = c;
        this.#segMarg = m;
        this.#segPosX = x;
        this.#segPosY = y;

    }

    //draw the 7 segment display, drawMargin is either ture or false
    //character is the character in string
    drawDis(character, drawMargin){

        //save default settings of context
        this.#context.save();
        //set up draw settings
        this.#context.strokeStyle = "silver";
        this.#context.fillStyle = this.#disColor;

        this.setPattern(parseInt(this.char2Code(character), 2));
        //console.log(this.char2Code(character));

        //draw the outter frame of the display
        if(drawMargin == true){
            this.#context.strokeRect(this.#segPosX, this.#segPosY, this.#segDisW, this.#segDisH);
        }
        
        //draw the segments one by one
        for (let i = 0; i < 7 ; i++){

            this.drawSeg(i, this.getPPos(i));

        }
        //reset context draw settings
        this.#context.restore();
        
    }

    //draw a specific segment of the display
    //segVal is an indication of whether the segment is on (displayed as filled)
    drawSeg(segNum, segVal){

        let segX = this.#segPosX + this.#disGap + this.#segWth + this.#segMarg;
        let segY = this.#segPosY + this.#segMarg;
        let rectW = this.#segLen;
        let rectH = this.#segWth;

        //need to set up draw location based on which segment it drawing
        switch(segNum){

            case 1:
                segX += this.#segLen + this.#disGap;
                segY += this.#segWth + this.#disGap;
                rectW = this.#segWth;
                rectH = this.#segLen;
                break;
            case 2:
                segX += this.#segLen + this.#disGap;
                segY += 2 * this.#segWth + 3 * this.#disGap + this.#segLen;
                rectW = this.#segWth;
                rectH = this.#segLen;
                break;
            case 3:
                segY += 2 * this.#segWth + 4 * this.#disGap + 2 * this.#segLen;
                break;
            case 4:
                segX -= this.#disGap + this.#segWth;
                segY += 2 * this.#segWth + 3 * this.#disGap + this.#segLen;
                rectW = this.#segWth;
                rectH = this.#segLen;
                break;
            case 5:
                segX -= this.#disGap + this.#segWth;
                segY += this.#segWth + this.#disGap;
                rectW = this.#segWth;
                rectH = this.#segLen;
                break;
            case 6:
                segY += this.#segWth + 2 * this.#disGap + this.#segLen;
                break;
            default:
                break;

        }

        //draw the segment
        if(segVal > 0){
            this.#context.fillRect(segX, segY, rectW, rectH);
        }else{
            this.#context.strokeRect(segX, segY, rectW, rectH);
        }


    }

    //set the value of pattern
    //value must be from 0 to 127
    setPattern(p){

        if(p > 0 && p < 128){
            this.#pattern = p.toString(2);
        }else{
            this.#pattern = 0;
        }

        return this.#pattern;

    }

    //get the value of pattern code at positon of t
    //t must be from 0 to 6, select digit from pattern code such as below:
    //index:   0123456
    //binary:  0000000 
    getPPos(t){

        let target = 0;
        if(t > 0 && t < 7){
            target = parseInt(t);
        }
        
        let result = this.#pattern;
        result = parseInt(result / Math.pow(10, 6 - target) % 10);

        return result;

    }

    //convert a character to segCode
    char2Code(character){

        let index = this.#segChar.indexOf(character);
        if(index >= 0){
            return this.#segCode[index];
        }
        return this.#segCode[10];

    }

}