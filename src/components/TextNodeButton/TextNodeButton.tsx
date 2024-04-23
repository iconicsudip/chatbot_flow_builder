import React, { forwardRef } from 'react'
import { TbMessage } from 'react-icons/tb';

interface TextNodeButtonProps extends React.HTMLAttributes<HTMLDivElement>{
    className?: string
}

export const TextNodeButton = forwardRef<HTMLDivElement, TextNodeButtonProps>(({ className, ...props }, ref) => {
    return (
        <div className={`${className}`} ref={ref} {...props}>
            
            <TbMessage />
            <p>Message</p>
        </div>
    );
})
