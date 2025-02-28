'use client'
import {usePathname} from 'next/navigation';
import {useEffect} from 'react';    
export default function Where() {
    const path = usePathname();

    useEffect(()=>{
        console.log('useEffect')
        document.querySelectorAll('.nav-link').forEach((link)=>{
            if(path===link.getAttribute('href')){
                link.classList.add('active');
            }else{
                link.classList.remove('active');
            }
        })

      
    })

    return (<></>)
    
}