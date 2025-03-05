const readline = require("readline");

//Function for creating the readline Interface....

const rl = readline.createInterface
({
    input: process.stdin,
    output: process.stdout
});

function bin_to_dec(binary)
{
    let decimal = 0;
    let base = 1;
    for (let i = (binary.length - 1); i >= 0; i--)
    {
        if (binary[i] === '1')
        {
            decimal += base;
        }  
        base *= 2;
    }
    return handle_sign(binary) * decimal;
}

function dec_to_bin(decimal)
{
    let sign = handle_sign(decimal);
    let binary = '';
    while (decimal > 0)
    {
        binary = ((decimal % 2) + binary);
        decimal = Math.floor(decimal/2);
    }  
    if (sign === (-1))
    {
        binary = ('1' + binary);
    }    
    else
    {
        binary = ('0' + binary);
    }
    return binary;
}

function handle_sign(binary)
{
    if (binary[0] === '1')
    {
        return -1;
    }    
    else
    {
        return 1;
    }
}

function dec_to_bin_2sC(decimal)
{ 
    if (decimal < 0)
    {
      let binary = dec_to_bin(~Math.abs(dec));
      let onesC ='';
      for (let i = 0; i < binary.length; i++)
      {
        onesC += (binary[i] === '0') ? '1' : '0';
      }
      let twosC = addOneToBinary(onesC);
      return twosC;
    } 
    else 
    {
      return dec_to_bin(decimal);
    }
}

function bin_to_dec_2sC(binary)
{

    if (binary[0]=== '1')
    {
        let onesC = '';
        for (let i = 0; i < binary.length; i++)
        {
            onesC += (binary[i] === '0') ? '1' : '0';
        }  
        let twosC = addOneToBinary(onesC);
        return -parseInt(twosC, 2);
    }     
    else
    {
        return parseInt(binary, 2);
    }
}

function addOneToBinary(binary)
{
    let result = '';
    let carry = 1;
    for (let i = binary.length - 1; i >= 0; i--) {
      let bit = parseInt(binary[i]);
      let sum = bit + carry;
      result = (sum % 2) + result;
      carry = Math.floor(sum / 2);
    }
    if (carry > 0) {
      result = carry + result;
    }
    return result.toString();
}

rl.question ("Enter input (-B for binary to decimal), (-D for decimal to binary) using 2's Complement & and (B for binary to decimal), (D for decimal to binary):\n",(input)=> {
    if (input === "B")
    {
      rl.question ("Enter Binary Number : ",(binary)=> {
        console.log(bin_to_dec(binary));
        rl.close();
      });
    } 
    else if (input === "D")
    {
        rl.question ("Enter Decimal Number : ",(decimal)=> {
            console.log(dec_to_bin(parseInt(decimal)));
            rl.close();
        });
    }  
    else if (input === "-B")
    {
        rl.question("Enter Binary Number : ", (binary) => {
            console.log(bin_to_dec_2sC(binary));
            rl.close();
        });
    }    
    else if (input === "-D")
    {
        rl.question ("Enter Decimal Number : ", (decimal)=>{
            console.log(dec_to_bin_2sC(parseInt(decimal)));
            rl.close();
        });
    }
    else
    {
        console.log("Invalid Input....");
        rl.close();
    }
});