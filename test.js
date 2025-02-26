function Modified_Bubble_Sort(Arr)
{
    let N = Arr.length;
    let Scan = 1;
    
    while (Scan < N)
    {
        let i = 0;
        let Flag = 1;

        while (i < (N - Scan ))
        {
            if (Arr[i] > Arr[i + 1])
            {
                let H = Arr[i];
                Arr[i] = Arr[i + 1];
                Arr[i + 1] = H;
                Flag = 0;
            }    
            i = (i + 1);
        }    
        if (Flag === 1)
        {
            console.log(Arr);
            return Arr;
        }
        else
        {
            Scan = (Scan + 1);
        }
    }
    console.log(Arr);
    return Arr;
}

Modified_Bubble_Sort([56, 44, 59, 12, 99, 33, 55, 92, 34, 11]);



