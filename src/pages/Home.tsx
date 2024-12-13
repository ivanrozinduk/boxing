import { motion } from 'framer-motion';
import { Activity, Brain, BookHeart, Sparkles, ArrowRight, CheckCircle2, Users, Trophy, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/marketing/Header';

const features = [
  {
    icon: Activity,
    title: 'Fitness Journey',
    description: 'Personalized workout plans that adapt to your progress and fitness level',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: Brain,
    title: 'Mindfulness',
    description: 'Guided meditation sessions with ambient sounds for mental clarity',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: BookHeart,
    title: 'Daily Journal',
    description: 'AI-powered prompts for meaningful self-reflection and growth',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Sparkles,
    title: 'Achievement System',
    description: 'Earn rewards and track your progress with gamified challenges',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
];

const benefits = [
  'Personalized wellness journey',
  'Progress tracking and insights',
  'Community support and challenges',
  'Expert-guided content',
  'Daily motivation and rewards',
  'Seamless cross-device sync',
];

const stats = [
  { label: 'Active Users', value: '10+', icon: Users },
  { label: 'Meditation Minutes', value: '1K+', icon: Brain },
  { label: 'Achievements Earned', value: '500+', icon: Trophy },
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with wellness',
    features: [
      'Basic meditation timer',
      'Simple journal entries',
      '3 workout videos per month',
      'Progress tracking',
      'Basic achievement system',
      'Community access',
    ],
    buttonText: 'Get Started',
    buttonLink: '/signup',
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: 'per month',
    description: 'Everything you need for your wellness journey',
    features: [
      'Advanced meditation features',
      'AI-powered journal prompts',
      'Unlimited workout videos',
      'Advanced analytics',
      'Premium soundscapes',
      'Priority support',
      'Early access to new features',
      'Custom wellness plans',
    ],
    buttonText: 'Start Free Trial',
    buttonLink: '/signup',
    highlighted: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 lg:max-w-xl"
            >
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                Fitness app with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  gamified experiences
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Join tens of users who have discovered a more engaging way to build healthy habits.
                Meditation, fitness, and journaling - all in one beautifully designed platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity text-center"
                >
                  Start Free Trial
                </Link>
                <a
                  href="#features"
                  className="px-8 py-3 rounded-full bg-white text-gray-900 font-medium border border-gray-200 hover:border-gray-300 transition-colors text-center"
                >
                  Learn More
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 lg:max-w-xl order-first lg:order-last"
            >
              <img
                src="/hero.svg"
                alt="Wellness Journey"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <stat.icon className="w-8 h-8 text-purple-600 mb-4" />
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines the best practices in wellness with engaging gamification
              to help you build lasting habits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <div className="relative p-8 bg-white rounded-lg border border-gray-200">
                  <div className={`${feature.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start for free and upgrade when you need more features. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl shadow-sm ${
                  plan.highlighted ? 'ring-2 ring-purple-600' : 'border border-gray-200'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-4 text-gray-600">{plan.description}</p>
                  
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>

                  <Link
                    to={plan.buttonLink}
                    className={`mt-8 block w-full py-3 px-4 rounded-lg text-center font-medium ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.buttonText}
                  </Link>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Star className="h-5 w-5 text-purple-500 mt-0.5 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-purple-50 rounded-xl p-6 flex items-start space-x-4">
              <Shield className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <h4 className="font-semibold text-purple-900">100% Satisfaction Guarantee</h4>
                <p className="mt-2 text-purple-700">
                  Try our premium features risk-free. If you're not satisfied within the first 30 days,
                  we'll give you a full refund. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why choose Rozin?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span className="text-gray-600">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-20" />
              <img
                src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Meditation"
                className="rounded-xl shadow-lg relative"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Join our community and transform your approach to wellness through engaging,
              gamified experiences. Start your free trial today.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}