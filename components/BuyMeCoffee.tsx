'use client';
import React from 'react';
import buymecoffee from './svg/buymecoffee';

const BuyMeCoffeePage = 'https://www.buymeacoffee.com/widget/page/shubhan?color=%235F7FFF';

export const BuyMeCoffee = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [animation, setAnimation] = React.useState('animate-fade-in-up');

    const onToggle = () => {
        if (isExpanded) {
            // Hide
            setAnimation('animate-fade-out-down');
            setTimeout(() => {
                setIsExpanded(false);
                setAnimation('animate-fade-in-up');
            }, 490);
        }
        else {
            // Show
            setIsExpanded(true);
        }
    };
    return <aside>
        {isExpanded && <div className="fixed z-50  flex right-0 bottom-0  h-auto w-[25rem]  overflow-hidden">
            <div className={`${animation} max-w-md relative ml-auto mt-auto h-[40rem] mr-3 mb-20  p-1 bg-white w-full rounded-lg  bottom-0 right-0 left-0`}>
                <iframe src={BuyMeCoffeePage} className='w-full h-full' />
            </div>
        </div>}
        <div className="fixed z-50 flex right-0 bottom-0 w-auto h-auto overflow-hidden">
            <div className="animate-fade-in-up max-w-md relative ml-auto mt-auto mr-3 mb-3  p-1   bottom-0 right-0 left-0">
                <button title='Support me by buying me a coffee' onClick={() => onToggle()} className="bg-gray-500 bg-opacity-10  dark:bg-opacity-40 py-1 px-1 rounded-3xl">
                    {buymecoffee}
                </button>
            </div>
        </div>
    </aside>;
};
