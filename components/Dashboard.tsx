import React from 'react';
import SOTWLeaderboard from './dashboard_widgets/SOTWLeaderboard';
import BingoBoard from './dashboard_widgets/BingoBoard';
import WidgetCard from './dashboard_widgets/WidgetCard';
import EventCalendar from './dashboard_widgets/EventCalendar';
import ActiveRaffle from './dashboard_widgets/ActiveRaffle';
import ClanPointShop from './dashboard_widgets/ClanPointShop';
import ClanSpotlight from './dashboard_widgets/ClanSpotlight';

const Dashboard: React.FC = () => {
    return (
        <div className="font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {/* Main Content Column */}
                <div className="lg:col-span-2 xl:col-span-3 space-y-6">
                    {/* Skill of the Week Leaderboard */}
                    <SOTWLeaderboard />
                    
                    {/* Clan Bingo Board */}
                    <BingoBoard />
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-1 xl:col-span-1 space-y-6">
                    {/* Upcoming Events */}
                    <WidgetCard title="Upcoming Events" icon="fa-solid fa-calendar-days">
                        <EventCalendar />
                    </WidgetCard>
                    
                    {/* Active Raffle */}
                    <WidgetCard title="Active Raffle" icon="fa-solid fa-ticket">
                        <ActiveRaffle />
                    </WidgetCard>

                    {/* Clan Spotlight */}
                    <WidgetCard title="Clan Spotlight" icon="fa-solid fa-star">
                        <ClanSpotlight />
                    </WidgetCard>
                    
                    {/* Clan Point Shop */}
                    <WidgetCard title="Clan Point Shop" icon="fa-solid fa-store">
                        <ClanPointShop />
                    </WidgetCard>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
