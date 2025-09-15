import React, { ReactNode } from 'react';

interface WidgetCardProps {
    title: string;
    icon: string;
    children: ReactNode;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ title, icon, children }) => {
    return (
        <div className="card-bevel flex flex-col">
            <header className="px-4 py-3 border-b border-black/50">
                <h3 className="font-header text-lg font-bold text-[color:var(--color-gold)]">
                    <i className={`${icon} text-[color:var(--color-blood-red)] mr-3`}></i>
                    {title}
                </h3>
            </header>
            <div className="p-4 flex-grow">
                {children}
            </div>
        </div>
    );
};

export default WidgetCard;
