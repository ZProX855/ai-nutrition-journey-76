
import { ArrowRight, Target, Users, ChartBar, Check } from 'lucide-react';

const journeyCards = [
  {
    id: 'set-goals',
    title: 'Set Clear Goals',
    description: 'Define specific, measurable, achievable, relevant, and time-bound wellness objectives.',
    icon: Target,
    color: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'find-support',
    title: 'Find Support',
    description: 'Connect with like-minded individuals to share your journey and maintain accountability.',
    icon: Users,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'track-progress',
    title: 'Track Progress',
    description: 'Monitor your wellness journey with AI insights and celebrate your achievements.',
    icon: ChartBar,
    color: 'from-purple-500 to-indigo-400',
  },
  {
    id: 'stay-consistent',
    title: 'Stay Consistent',
    description: 'Build healthy habits through daily practice and incremental improvements.',
    icon: Check,
    color: 'from-orange-500 to-amber-400',
  },
];

const WellnessJourney = () => {
  return (
    <section className="section-container">
      <h2 className="section-title">Your Wellness Journey</h2>
      <p className="section-subtitle">
        Follow these steps to achieve your health and wellness goals
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {journeyCards.map((card, index) => (
          <div 
            key={card.id}
            className="feature-card h-full group hover:scale-105 transition-transform"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
              <card.icon className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-sm font-bold mr-2">
                {index + 1}
              </span>
              {card.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4">
              {card.description}
            </p>
            
            <div className="mt-auto pt-2">
              <button className="text-sm text-primary font-medium flex items-center group-hover:underline">
                Learn more
                <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WellnessJourney;
