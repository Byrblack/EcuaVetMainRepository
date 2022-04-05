import {useState, useEffect} from 'react'


export const useFetch = (url)=>{
    const [data, setData] =  useState(null);
    const [isPending, setIsPending] =  useState(true);
    const [error, setError] =  useState(null);

   /* useEffect(()=>{
        
    },[url]);*/
    const getData = async (url)=>{
        try{
            let res =  await fetch(url);

            if(!res.ok){
                throw{
                    err:true,
                    status:res.status,
                    ststusText:!res.ststusText?"Ocurrio un erro en la consulta":res.ststusText
                }
            }

            setIsPending(false);
            setError({err:false});
            let data =  await res.json();

           
            setData(data);
            

        }catch(err){
    
            setIsPending(true);
            setError(err);

        }
    }
    
    getData(url);
   

    return {data, isPending, error}
};

