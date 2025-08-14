import React, { useState, useEffect } from 'react';

const MethyleneBlueQuiz = () => {
  const [currentStep, setCurrentStep] = useState('hero');
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState({
    howItWorks: true,
    coverUp: false
  });
  const [showNoThanksPopup, setShowNoThanksPopup] = useState(false);
  const [showBlogBridge, setShowBlogBridge] = useState(false);

  // Reset focus when question changes to prevent buttons from appearing selected
  useEffect(() => {
    if (currentStep === 'quiz') {
      // Remove focus from any previously focused element
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }, [questionIndex, currentStep]);

  // Google Analytics 4 Tracking
  const GA_TRACKING_ID = 'G-2BBJQ12KZN';
  
  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'quiz_interaction',
        ...parameters
      });
    }
  };

  const getAllQuestions = () => {
    let questions = [
      {
        id: 'age',
        type: 'question',
        title: 'How old are you?',
        subtitle: "(2-minute brain test - get your personal plan)",
        options: ['Under 30', '30-39', '40-49', '50-59', '60+']
      },
      {
        id: 'gender',
        type: 'question',
        title: 'Are you male or female?',
        options: ['Male', 'Female', 'Prefer not to say']
      },

      {
        id: 'main_problem',
        type: 'question',
        title: 'How do you feel right now?',
        options: [
          'My brain feels broken',
          'I forget words mid-sentence',
          'I need 3+ coffees just to function',
          'I feel underwater/in a haze all day',
          "I don't feel like myself anymore",
          'I feel mentally dead most days'
        ]
      },
      {
        id: 'chronic_illness',
        type: 'question',
        title: 'Do any of these apply to you?',
        options: [
          'I have long COVID/chronic fatigue',
          'I have thyroid/autoimmune issues',
          'I had COVID and never fully recovered',
          'I have mysterious health problems doctors can\'t fix',
          'None of these apply to me'
        ]
      }
    ];

    // Add different questions based on gender (conditional logic)
    if (answers.gender === 'Female') {
      questions.push({
        id: 'menopause',
        type: 'question',
        title: 'Are you going through menopause?',
        options: [
          "Yes, I'm going through it now",
          'Yes, I think I am',
          'Yes, I went through it already',
          "No, that's not me",
          "I'm not sure"
        ]
      });

      questions.push({
        id: 'life_hard',
        type: 'question',
        title: 'Does life feel way harder than it should?',
        options: [
          'YES - Everything feels impossible now',
          'Yes - Simple things are so hard',
          'Yes - I used to handle everything easily',
          'Sometimes - I have good days and bad days',
          'No - I feel pretty normal'
        ]
      });
    }

    if (answers.gender === 'Male') {
      questions.push({
        id: 'supplements',
        type: 'question',
        title: 'Have you tried expensive brain supplements?',
        options: [
          "Yes, tried many - they don't work",
          'Yes, some helped a little',
          'Yes, but too expensive to keep buying',
          "No, but I've heard about them",
          "No, I'm new to this"
        ]
      });

      questions.push({
        id: 'tracking',
        type: 'question',
        title: 'Do you track your health data?',
        options: [
          'Yes, I track everything',
          'Yes, I use fitness watches',
          'Sometimes - basic stuff',
          'No, but I want to start',
          'No, I just go by how I feel'
        ]
      });
    }

    // Add competitor awareness question for everyone
    questions.push({
      id: 'competitor_awareness',
      type: 'question',
      title: 'Have you heard of Methylene Blue before?',
      options: [
        'Yes, I\'ve tried Troscriptions/troches',
        'Yes, but the blue tongue/staining put me off',
        'Yes, but it was too expensive',
        'I\'ve heard of it but never tried',
        'No, this is completely new to me'
      ]
    });

    // More questions for everyone
    questions.push(
      {
        id: 'work_problems',
        type: 'question',
        title:
          answers.gender === 'Female'
            ? "Are people at work noticing you're different?"
            : 'Is this hurting your work performance?',
        options: [
          'I can barely function some days',
          'People are starting to notice my mistakes',
          'I\'m scared younger people will take my job',
          'I need tons of coffee just to think',
          "I'm losing my edge",
          'I forget why I walked into rooms'
        ]
      },
      {
        type: 'info',
        title: "💪 You're Not Alone",
        content:
          'Most adults over 40 have this same problem. The ones who get better? They found what actually works and did something about it.',
        bgColor: 'bg-green-50',
        textColor: 'text-green-800'
      },
      {
        id: 'family_impact',
        type: 'question',
        title: 'How is this affecting your family?',
        options: [
          'My family has to repeat everything',
          'I have no energy left for them after work',
          'My spouse gets frustrated with me',
          "I can't focus during conversations",
          "I feel like I'm failing them",
          "They say I'm not myself anymore"
        ]
      },
      {
        id: 'how_desperate',
        type: 'question',
        title: 'How hard are you trying to fix this?',
        options: [
          "I've cried at doctors asking for help",
          "I've tried everything - nothing works",
          "I'm spending tons of money on stuff that doesn't work",
          'I had given up until I heard about this',
          "I'm thinking about prescription drugs",
          "I'm just realizing how bad this is"
        ]
      },
      {
        type: 'info',
        title: "🔬 What Doctors Don't Tell You",
        content:
          "Your brain fog isn't \"just getting old.\" Your brain's tiny power plants are broken. Fix those power plants, and everything gets better.",
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-800'
      },
      {
        id: 'how_long',
        type: 'question',
        title: 'How long has this been ruining your life?',
        options: [
          'Just started and getting worse fast',
          "About a year and I'm panicking",
          "Years - I've given up hope",
          'Forever - I forgot what normal feels like',
          'Started during menopause',
          'Since I got sick - never recovered'
        ]
      },
      {
        id: 'biggest_fear',
        type: 'question',
        title: 'What scares you most?',
        options: [
          "Getting Alzheimer's disease",
          'Losing my job',
          'Being a burden to my family',
          'Never feeling normal again',
          'Younger people taking over',
          "Forgetting my family's names"
        ]
      },
      {
        type: 'info',
        title: '⚡ Why Smart People Use This',
        content:
          'Bryan Johnson spends $2 million a year staying young - he uses this. The Bulletproof Coffee guy swears by it. It\'s not just another pill - it\'s what works when everything else fails.',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-800'
      },
      {
        id: 'what_failed',
        type: 'question',
        title: 'What have you wasted money on?',
        options: [
          'Expensive brain pills that did nothing',
          'Doctors who said "you\'re fine"',
          'Antidepressants with bad side effects',
          "Vitamins that don't work",
          "Therapy that didn't fix the real problem",
          'Nothing yet - but I need help'
        ]
      },

      {
        id: 'qualification_budget',
        type: 'question',
        title: 'How serious are you about fixing this brain fog?',
        options: [
          'I\'ll try anything that actually works',
          'I\'m ready to invest in a real solution',
          'I want to try it but I\'m on a tight budget',
          'I\'m just looking around for now'
        ]
      },
      {
        id: 'urgency',
        type: 'question',
        title: 'How badly do you need this to work?',
        options: [
          'DESPERATELY - My life depends on it',
          "Very badly - I can't live like this",
          'Pretty badly - This affects everything',
          'Somewhat - I want to fix this soon',
          'Just curious - but worried'
        ]
      }
    );

    return questions;
  };

  // Figure out what type of person they are (avatar detection)
  const figureOutAvatar = () => {
    let scores = {
      hormonal_woman: 0,
      biohacker_man: 0,
      sick_person: 0,
      work_person: 0,
      tired_parent: 0
    } as Record<string, number>;

    // Woman going through menopause
    if (
      answers.gender === 'Female' &&
      answers.menopause &&
      (answers.menopause as string).includes('Yes')
    ) {
      scores.hormonal_woman += 4;
    }
    if (answers.life_hard && (answers.life_hard as string).includes('impossible')) {
      scores.hormonal_woman += 3;
    }
    if (
      answers.main_problem &&
      (answers.main_problem as string).includes("don't feel like myself")
    ) {
      scores.hormonal_woman += 2;
    }

    // Male biohacker
    if (
      answers.gender === 'Male' &&
      answers.tracking &&
      (answers.tracking as string).includes('track everything')
    ) {
      scores.biohacker_man += 4;
    }
    if (answers.supplements && (answers.supplements as string).includes('tried many')) {
      scores.biohacker_man += 3;
    }

    // Sick person (COVID etc)
    if (answers.how_long && (answers.how_long as string).includes('Since I got sick')) {
      scores.sick_person += 4;
    }
    if (
      answers.how_desperate &&
      (answers.how_desperate as string).includes('tried everything')
    ) {
      scores.sick_person += 3;
    }

    // Work-focused person
    if (
      answers.work_problems &&
      (answers.work_problems as string).includes('losing my edge')
    ) {
      scores.work_person += 3;
    }
    if (answers.biggest_fear && (answers.biggest_fear as string).includes('Losing my job')) {
      scores.work_person += 2;
    }

    // Tired parent
    if (
      answers.family_impact &&
      (answers.family_impact as string).includes('no energy left')
    ) {
      scores.tired_parent += 3;
    }

    // Return the highest scoring avatar
    return Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
  };

  // Figure out how bad their problem is
  const figureOutSeverity = () => {
    let badness = 0;

    if (
      answers.main_problem &&
      ((answers.main_problem as string).includes('broken') ||
        (answers.main_problem as string).includes('losing my mind'))
    ) {
      badness += 4;
    }

    if (
      answers.how_desperate &&
      ((answers.how_desperate as string).includes('cried at doctors') ||
        (answers.how_desperate as string).includes('given up'))
    ) {
      badness += 4;
    }

    if (
      answers.work_problems &&
      ((answers.work_problems as string).includes('barely function') ||
        (answers.work_problems as string).includes('starting to notice'))
    ) {
      badness += 3;
    }

    if (answers.urgency && (answers.urgency as string).includes('DESPERATELY')) {
      badness += 2;
    }

    if (badness >= 10) return 'VERY BAD';
    if (badness >= 6) return 'BAD';
    if (badness >= 3) return 'NOT GOOD';
    return 'OKAY';
  };

  const handleAnswer = (questionId: string, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer } as Record<string, unknown>;
    setAnswers(newAnswers);
    
    // Track question answer
    trackEvent('question_answered', {
      question_id: questionId,
      answer: answer,
      question_number: questionIndex + 1,
      total_questions: getAllQuestions().length
    });
    
    setTimeout(() => nextStep(), 500);
  };

  const nextStep = () => {
    if (currentStep === 'hero') {
      setCurrentStep('quiz');
      return;
    }

    const questions = getAllQuestions();
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      startAnalysis();
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);

    const steps = [
      '🧠 Looking at your answers...',
      '⚡ Checking how bad your problem is...',
      '📊 Figuring out the best plan for you...',
      '🎯 Finding what will work for your situation...',
      '✅ Making your personal plan...'
    ];

    let step = 0;
    const interval = setInterval(() => {
      setAnalysisStep(step);
      step++;

      if (step >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          setShowResult(true);
          
          // Track quiz completion
          trackEvent('quiz_completed', {
            total_questions: getAllQuestions().length,
            answers_count: Object.keys(answers).length
          });
        }, 1000);
      }
    }, 1500);
  };

  if (currentStep === 'hero') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/20">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full mx-auto mb-4 overflow-hidden">
              <img 
                src="https://cdn.shopify.com/s/files/1/0965/1824/2645/files/dr_chen.jpg?v=1755129328" 
                alt="Dr. Michael Chen - Brain Wellness Specialist"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-600 text-sm mb-2">
              Get your assessment <span className="text-green-500 font-semibold">in just 2 minutes!</span>
            </p>
          </div>

          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Struggling with brain fog and mental fatigue?
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
              Get your personalized cognitive wellness assessment and discover what's really causing your symptoms - <span className="text-green-500 font-semibold">free analysis</span>.
            </h2>

            <button
              onClick={() => {
                trackEvent('quiz_started', { step: 'hero_button' });
                setCurrentStep('quiz');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-lg sm:text-xl transition-colors duration-200 shadow-lg flex items-center mx-auto"
            >
              Start Assessment
              <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-10 mb-6 sm:mb-8 shadow-2xl border border-white/20">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              Your expert for <span className="text-blue-600">cognitive wellness</span>.
            </h3>

            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full flex-shrink-0 overflow-hidden shadow-xl ring-4 ring-white">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0965/1824/2645/files/dr_chen.jpg?v=1755129328" 
                  alt="Dr. Michael Chen - Brain Wellness Specialist"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Michael Chen</h4>
                <p className="text-blue-600 font-medium mb-3 sm:mb-4">Brain Wellness Specialist</p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Helping people optimize cognitive performance for over 10 years. Whether you're struggling with brain fog, memory issues, or mental fatigue, I'm here to guide you through understanding what's really happening and find the right solution for your specific situation.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <button
              onClick={() => setCurrentStep('quiz')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-lg sm:text-xl transition-colors duration-200 shadow-lg flex items-center mx-auto"
            >
              Get Assessment
              <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    const steps = [
      '🧠 Looking at your answers...',
      '⚡ Checking how bad your problem is...',
      '📊 Figuring out the best plan for you...',
      '🎯 Finding what will work for your situation...',
      '✅ Making your personal plan...'
    ];

    const progress = ((analysisStep + 1) / steps.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-8">
              <div className="animate-pulse mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">🧠 Analyzing Your Brain Profile...</h2>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`text-left p-3 rounded-lg transition-all duration-500 ${
                      index <= analysisStep
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                        : 'text-gray-400'
                    }`}
                  >
                    <div className="flex items-center">
                      {index < analysisStep && <span className="text-green-500 mr-2">✓</span>}
                      {index === analysisStep && (
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                      )}
                      {step}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 mt-6 italic">Creating the perfect plan for your exact situation...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    console.log('Showing result page, showResult:', showResult);
    const userAvatar = figureOutAvatar();
    const severity = figureOutSeverity();

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {/* 1. SUMMARY SECTION */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Analysis Complete
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Your Personal Recovery Plan</h1>
              <p className="text-gray-600">Based on your specific situation and symptoms</p>
            </div>

            {/* Severity Indicator */}
            <div className="mb-8">
              <div className="text-center mb-4 sm:mb-6">
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-1000 ${
                      severity === 'VERY BAD'
                        ? 'bg-red-500'
                        : severity === 'BAD'
                        ? 'bg-orange-400'
                        : 'bg-yellow-400'
                    }`}
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <h2
                  className={`text-lg sm:text-xl md:text-2xl font-bold ${
                    severity === 'VERY BAD'
                      ? 'text-red-500'
                      : severity === 'BAD'
                      ? 'text-orange-500'
                      : 'text-yellow-600'
                  }`}
                >
                  {severity}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm px-2 sm:px-0">
                  {severity === 'VERY BAD'
                    ? 'Urgent intervention needed'
                    : severity === 'BAD'
                    ? 'Serious but fixable'
                    : severity === 'NOT GOOD'
                    ? 'Manageable with right approach - but can get much worse if not treated'
                    : 'Can get much worse if not treated - act now while it\'s still easy to fix'}
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              </div>
            </div>







            {/* 2. WHAT THIS MEANS SECTION */}
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Your Next Steps to Mental Clarity</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">1</div>
                  <p className="text-gray-700">Discover your custom solution below</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">2</div>
                  <p className="text-gray-700">See real people's transformation stories</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">3</div>
                  <p className="text-gray-700">Start feeling sharp again</p>
                </div>
              </div>
            </div>

            {/* 3. YOUR PLAN SECTION */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Recovery Timeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 text-center transform hover:scale-105 transition-all duration-300 border border-red-200">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {severity === 'VERY BAD' ? '14-21' : severity === 'BAD' ? '21-28' : '28-35'} days
                  </div>
                  <div className="text-sm text-gray-600">Expected recovery time</div>
                  <div className="w-full bg-red-200 rounded-full h-2 mt-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 text-center transform hover:scale-105 transition-all duration-300 border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {severity === 'VERY BAD' ? '67%' : severity === 'BAD' ? '45%' : '23%'}
                  </div>
                  <div className="text-sm text-gray-600">Risk if untreated</div>
                  <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${severity === 'VERY BAD' ? '67%' : severity === 'BAD' ? '45%' : '23%'}` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 text-center transform hover:scale-105 transition-all duration-300 border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-1">94%</div>
                  <div className="text-sm text-gray-600">Success rate with treatment</div>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </div>



            {/* 5. SOCIAL PROOF SECTION */}
            <div className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Real People, Real Results
              </h3>

              <div className="space-y-4">
                {/* Testimonial 1 - Blue gradient */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border-l-4 border-blue-400 transform hover:scale-102 transition-all duration-300">
                  <p className="text-gray-700 text-sm italic mb-2">"I feel like I'm the lead character in the movie Limitless."</p>
                  <p className="text-xs text-gray-600 font-medium">- James, 42, Tech Executive</p>
                </div>

                {/* Testimonial 2 - Green gradient */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border-l-4 border-green-400 transform hover:scale-102 transition-all duration-300">
                  <p className="text-gray-700 text-sm italic mb-2">"Brain isn't braining → Brain fog completely disappeared in 2 weeks"</p>
                  <p className="text-xs text-gray-600 font-medium">- Sarah, 47, Perimenopause</p>
                </div>

                {/* Testimonial 3 - Blue gradient */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border-l-4 border-blue-400 transform hover:scale-102 transition-all duration-300">
                  <p className="text-gray-700 text-sm italic mb-2">"Where'd my ADHD go? I can remember names and go, go, go"</p>
                  <p className="text-xs text-gray-600 font-medium">- Sales Manager, 38</p>
                </div>

                {/* Testimonial 4 - Green gradient */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border-l-4 border-green-400 transform hover:scale-102 transition-all duration-300">
                  <p className="text-gray-700 text-sm italic mb-2">"I never knew what a normal brain felt like until now"</p>
                  <p className="text-xs text-gray-600 font-medium">- Long COVID survivor</p>
                </div>

                {/* Testimonial 5 - Blue gradient */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border-l-4 border-blue-400 transform hover:scale-102 transition-all duration-300">
                  <p className="text-gray-700 text-sm italic mb-2">"Holy grail for my brain fog and energy"</p>
                  <p className="text-xs text-gray-600 font-medium">- After trying 20+ supplements</p>
                </div>
              </div>
            </div>

            {/* 5.5. URGENCY SECTION */}
            <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-300">
              <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center">
                <span className="text-2xl mr-3">⏰</span>
                YOUR WINDOW IS CLOSING - ACT NOW
              </h3>
              
              {/* Dynamic urgency messages based on quiz answers */}
              {answers.biggest_fear === 'Losing my job' && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border-l-4 border-red-400">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">💼</span>
                    <div>
                      <p className="text-red-800 font-medium">Your career is on the line RIGHT NOW.</p>
                      <p className="text-red-700 text-sm mt-1">While you're reading this, sharper colleagues are getting promotions. How many more brain fog mistakes can you afford before it's too late?</p>
                    </div>
                  </div>
                </div>
              )}
              
              {answers.time_suffering === 'Years - I\'ve given up hope' && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border-l-4 border-red-400">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🔥</span>
                    <div>
                      <p className="text-red-800 font-medium">You've already lost YEARS to this fog.</p>
                      <p className="text-red-700 text-sm mt-1">Every day you wait is another day of missing precious moments with family. Don't let this steal another month from your life.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {answers.urgency === 'DESPERATELY - My life depends on it' && (
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 border-l-4 border-red-400">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🆘</span>
                    <div>
                      <p className="text-red-800 font-medium">You said your LIFE depends on this working.</p>
                      <p className="text-red-700 text-sm mt-1">Then why are you still reading instead of trying it? Every day you delay is another day of suffering.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {answers.time_suffering === 'Just started and getting worse fast' && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-l-4 border-yellow-400">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">⚡</span>
                    <div>
                      <p className="text-orange-800 font-medium">You're at a CRITICAL window right now.</p>
                      <p className="text-orange-700 text-sm mt-1">Brain fog that's 'getting worse fast' means your cellular energy is collapsing. Act NOW while it's still easy to reverse.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {answers.time_suffering === 'Started during menopause' && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border-l-4 border-purple-400">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🌡️</span>
                    <div>
                      <p className="text-purple-800 font-medium">Menopause brain fog gets WORSE if you don't address the root cause.</p>
                      <p className="text-purple-700 text-sm mt-1">Your hormones aren't coming back - but your brain energy CAN.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {answers.biggest_fear === 'Getting Alzheimer\'s disease' && (
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border-l-4 border-indigo-400">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🧠</span>
                    <div>
                      <p className="text-indigo-800 font-medium">Every day of brain fog is your brain crying for help.</p>
                      <p className="text-indigo-700 text-sm mt-1">Research shows mitochondrial dysfunction comes BEFORE serious decline. Fix the energy crisis NOW = protect your future brain.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Fallback message - always shows if no other conditions match */}
              {!answers.biggest_fear?.includes('Losing my job') && 
               !answers.time_suffering?.includes('Years') && 
               !answers.urgency?.includes('DESPERATELY') && 
               !answers.time_suffering?.includes('Just started') && 
               !answers.time_suffering?.includes('menopause') && 
               !answers.biggest_fear?.includes('Alzheimer') && (
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border-l-4 border-orange-400">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">⏰</span>
                    <div>
                      <p className="text-orange-800 font-medium">Your brain fog won't fix itself.</p>
                      <p className="text-orange-700 text-sm mt-1">Every day you wait is another day of struggling. The longer you delay, the harder it gets to reverse. Don't let this steal more time from your life.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 6. HOW IT WORKS SECTION - Accordion */}
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 overflow-hidden">
              <button
                onClick={() => setAccordionOpen(prev => ({ ...prev, howItWorks: !prev.howItWorks }))}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-blue-800 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  How Your "Backup Generator" Works
                </h3>
                <svg 
                  className={`w-5 h-5 text-blue-600 transition-transform ${accordionOpen.howItWorks ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {accordionOpen.howItWorks && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">🔋</span>
                      </div>
                      <h4 className="font-medium text-gray-800 mb-2">Your Problem</h4>
                      <p className="text-sm text-gray-600">Brain's power plants are failing</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">⚡</span>
                      </div>
                      <h4 className="font-medium text-gray-800 mb-2">The Solution</h4>
                      <p className="text-sm text-gray-600">MB acts as backup generator</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">🧠</span>
                      </div>
                      <h4 className="font-medium text-gray-800 mb-2">The Result</h4>
                      <p className="text-sm text-gray-600">Brain gets energy, fog lifts</p>
                    </div>
                  </div>
                </div>
              )}
            </div>



            {/* Quality Warning */}
            <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-300">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-yellow-800">73% of Online MB is FAKE</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-red-600 mb-2 flex items-center">
                    <span className="mr-1">❌</span> Fake/Dangerous:
                  </h4>
                  <div className="space-y-1 text-sm text-red-600">
                    <p>• Industrial dye (not medical)</p>
                    <p>• Wrong concentrations</p>
                    <p>• Heavy metal contamination</p>
                    <p>• No safety testing</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-green-600 mb-2 flex items-center">
                    <span className="mr-1">✅</span> Real/Safe:
                  </h4>
                  <div className="space-y-1 text-sm text-green-600">
                    <p>• Pharmaceutical grade</p>
                    <p>• Hospital quality</p>
                    <p>• Lab tested purity</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 animate-slide-in-up border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Real People, Real Results
              </h3>

              <div className="space-y-3">
                <div className="flex items-start bg-white rounded-lg p-3 border border-green-200 animate-slide-in-left transform hover:scale-105 transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mr-3 animate-pulse">
                    <span className="text-green-600 font-bold text-sm">S</span>
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm italic">"I feel like a different person. Never knew what a normal brain felt like until now."</p>
                    <p className="text-xs text-gray-500 mt-1">- Sarah, 47</p>
                  </div>
                </div>

                <div className="flex items-start bg-white rounded-lg p-3 border border-blue-200 animate-slide-in-right transform hover:scale-105 transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-3 animate-pulse">
                    <span className="text-blue-600 font-bold text-sm">M</span>
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm italic">"Holy grail for my brain fog. Best investment in my health EVER!"</p>
                    <p className="text-xs text-gray-500 mt-1">- Mark, 52</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Warning */}
            {answers.medications?.includes('Yes, I take antidepressants') && (
              <div className="mb-8 bg-red-100 border-2 border-red-400 rounded-xl p-6 animate-shake">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-red-800 mb-2">🚨 IMPORTANT: You Take Antidepressants</h3>
                    <p className="text-red-700 text-sm mb-3">Methylene Blue can cause dangerous interactions with antidepressants.</p>
                    <div className="bg-red-200 rounded-lg p-3">
                      <p className="text-red-800 font-medium text-sm">⚠️ Do NOT use without doctor supervision</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4 mb-6 border border-yellow-300">
                <p className="text-yellow-800 font-bold text-lg">
                  🕒 {severity === 'VERY BAD' ? 'TIME IS RUNNING OUT - Your brain needs help NOW' : 'Act while this is still reversible'}
                </p>
              </div>

              {/* Product Image */}
              <div className="mb-6">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0965/1824/2645/files/gempages_576616250101203794-fe99edc8-ea27-4ae8-8ab7-13adbf0b7e85.jpg?v=1754337430"
                  alt="Pharmaceutical-Grade Methylene Blue Product"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                />
              </div>

                            <a
                              href="https://methyleneblueco.com/products/ultra-pure-methylene-blue-gummies"
                              className="block w-full"
                              onClick={() => trackEvent('cta_clicked', { button: 'yes_main', cta_text: 'Claim My 50% OFF' })}
                            >
                              <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-xl text-lg sm:text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                ✅ YES - Claim My 50% OFF (Limited Time) →
                              </button>
                            </a>
              
              {/* Low Stock Warning */}
              <div className="text-center mt-3">
                <p className="text-red-600 font-medium text-sm">
                  ⚠️ Low Stock Alert
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 sm:p-4 border border-blue-200">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-blue-700">
                  <span className="flex items-center"><span className="mr-1">✓</span> Hospital Quality</span>
                  <span className="flex items-center"><span className="mr-1">✓</span> Third-Party Tested</span>
                  <span className="flex items-center"><span className="mr-1">✓</span> Money-Back Guarantee</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  trackEvent('cta_clicked', { button: 'no_thanks', cta_text: 'No thanks' });
                  setShowNoThanksPopup(true);
                }}
                className="w-full bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-600 font-medium py-2.5 sm:py-3 px-4 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                No thanks, I'll keep suffering while Big Pharma profits
              </button>

              {/* No Thanks Popup */}
              {showNoThanksPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl">
                    <div className="text-center">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">We Get It - You Want Proof First</h3>
                      
                      <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
                        Before you spend money on ANOTHER supplement that might not work, 
                        read this breakthrough research about why your brain feels broken.
                      </p>

                      <a
                        href="https://methyleneblueco.com/pages/blogg"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 mb-4 text-sm sm:text-base"
                        onClick={() => trackEvent('popup_interaction', { action: 'blog_link_clicked', link_text: 'The Hidden Energy Crisis Destroying Your Brain' })}
                      >
                        → "The Hidden Energy Crisis Destroying Your Brain"
                      </a>
                      
                      <p className="text-blue-600 text-xs sm:text-sm mb-4 sm:mb-6">(5-minute read that explains everything)</p>

                      <div className="text-left">
                        <p className="text-gray-700 font-medium mb-2 sm:mb-3 text-sm sm:text-base">After reading, you'll understand:</p>
                        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center"><span className="mr-2 text-green-500">✓</span> Why coffee stopped working</div>
                          <div className="flex items-center"><span className="mr-2 text-green-500">✓</span> Why this isn't "just aging"</div>
                          <div className="flex items-center"><span className="mr-2 text-green-500">✓</span> Why 73% of online solutions are fake</div>
                          <div className="flex items-center"><span className="mr-2 text-green-500">✓</span> How to fix this at the cellular level</div>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowNoThanksPopup(false)}
                        className="mt-4 sm:mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 text-sm sm:text-base"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-500 mt-4">💡 Join thousands who broke free from the medical system and got their lives back</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const questions = getAllQuestions();
  const currentQuestion = questions[questionIndex];
  const progress = ((questionIndex + 1) / questions.length) * 100;

  if (currentStep === 'quiz' && currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Profile Image */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full mx-auto mb-4 overflow-hidden shadow-xl ring-4 ring-white">
              <img 
                src="https://cdn.shopify.com/s/files/1/0965/1824/2645/files/dr_chen.jpg?v=1755129328" 
                alt="Dr. Michael Chen - Brain Wellness Specialist"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-center space-x-1 mb-4 flex-wrap max-w-md mx-auto">
              {Array.from({ length: questions.length }, (_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-sm transition-all duration-300 ${
                    i <= questionIndex
                      ? 'bg-blue-600'
                      : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Question Container */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-10">
            {currentQuestion.type === 'question' ? (
              <>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">{currentQuestion.title}</h2>
                {currentQuestion.subtitle && <p className="text-gray-600 mb-6 sm:mb-8 text-center text-base sm:text-lg">{currentQuestion.subtitle}</p>}

                <div className="space-y-3 sm:space-y-4">
                  {currentQuestion.options.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer((currentQuestion as any).id, option)}
                      className="w-full text-left p-4 sm:p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 bg-white shadow-sm hover:shadow-md"
                    >
                      <span className="text-gray-800 font-medium text-base sm:text-lg">{option}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className={`${(currentQuestion as any).bgColor} rounded-2xl p-6 sm:p-8 text-center`}>
                <h2 className={`text-xl sm:text-2xl font-bold ${(currentQuestion as any).textColor} mb-4 sm:mb-6`}>
                  {(currentQuestion as any).title}
                </h2>
                <p className={`${(currentQuestion as any).textColor} text-base sm:text-lg leading-relaxed mb-6 sm:mb-8`}>
                  {(currentQuestion as any).content}
                </p>
                
                {/* Brain Energy Image */}
                {(currentQuestion as any).title === '🧠 Your Brain Uses Tons of Energy' && (
                  <div className="mb-6 sm:mb-8">
                    <img 
                      src="https://cdn.shopify.com/s/files/1/0965/1824/2645/files/20_batteri_brain.jpg?v=1755131090"
                      alt="Brain using 20% of energy - battery visualization"
                      className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                    />
                  </div>
                )}
                
                <button 
                  onClick={nextStep} 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center mx-auto"
                >
                  Continue
                  <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="text-center mt-6">
            <button
              onClick={() => {
                if (questionIndex > 0) {
                  setQuestionIndex(questionIndex - 1);
                } else {
                  setCurrentStep('hero');
                }
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 font-medium"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MethyleneBlueQuiz;