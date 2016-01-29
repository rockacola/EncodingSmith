/**
*
*  Hex encode / decode
*  Source: http://www.java2s.com/Code/JavaScript/Security/AsciitoHexandHextoAsciiinJavaScript.htm
*          http://www.java2s.com/Code/JavaScriptDemo/AsciitoHexandHextoAsciiinJavaScript.htm
*
**/
 
var Hex = {
 
	// private property
	_hex : "0123456789abcdef",
    _almost_ascii : ' !"#$%&'+"'"+'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ['+'\\'+']^_`abcdefghijklmnopqrstuvwxyz{|}',
    
	// public method for encoding
	encode : function (input) {
        var output = "";
        
        for(i=0; i<input.length; i++)
        {
            var let = input.charAt(i);
            
            if(this._almost_ascii.indexOf(let) > 0)
            {// ASCII
                var pos = this._almost_ascii.indexOf(let) + 32;
                var h16 = Math.floor(pos/16);
                var h1 = pos % 16;
                output += this._hex.charAt(h16) + this._hex.charAt(h1);
            }
            else
            {// Unicode
                var foo = encodeURIComponent(let);
                var bar = foo.replace(/%/g, ""); // remove '%' character, recursively.
                output += bar;
            }
        }
        
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
        var output = "";
        
        for(i=0; i<input.length; i++)
        {
            var let1 = input.charAt(2 * i);
            var let2 = input.charAt(2 * i + 1);
            var val = this._hex.indexOf(let1) * 16 + this._hex.indexOf(let2);
            output += this._almost_ascii.charAt(val - 32);
        }
        
		return output;    
	}
    
};