
import { ArrowRight, Target, Users, ChartBar, Check } from 'lucide-react';

const journeySteps = [
  {
    id: 'set-goals',
    title: 'Set Goals',
    description: '• Pick 1-2 achievable health goals\n• Set realistic timeframes\n• Start small, grow gradually',
    icon: Target,
    color: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'find-support',
    title: 'Get Support',
    description: '• Share goals with friends/family\n• Join wellness communities\n• Schedule check-ins',
    icon: Users,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'track-progress',
    title: 'Track Progress',
    description: '• Log daily activities\n• Take progress photos\n• Celebrate small wins',
    icon: ChartBar,
    color: 'from-purple-500 to-indigo-400',
  },
  {
    id: 'stay-consistent',
    title: 'Build Habits',
    description: '• Follow daily routines\n• Focus on consistency\n• Adjust as needed',
    icon: Check,
    color: 'from-orange-500 to-amber-400',
  },
];

const WellnessJourney = () => {
  return (
    <section className="section-container">
      <h2 className="section-title">Your Wellness Roadmap</h2>
      <p className="section-subtitle mb-12">
        Follow these steps to achieve your health goals
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-wellness-500" />
          
          {/* Journey steps */}
          <div className="space-y-12">
            {journeySteps.map((step, index) => (
              <div 
                key={step.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } gap-8`}
              >
                {/* Step content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="feature-card p-6 hover:scale-105 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 ${
                      index % 2 === 0 ? 'ml-auto' : ''
                    }`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <div className="text-muted-foreground text-sm whitespace-pre-line">
                      {step.description}
                    </div>
                  </div>
                </div>
                
                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-white shadow-lg" />
                
                {/* Empty space for alignment */}
                <div className="w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WellnessJourney;
