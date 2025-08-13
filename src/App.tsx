import React, { useState } from 'react';

const MethyleneBlueQuiz = () => {
  const [currentStep, setCurrentStep] = useState('hero');
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

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
        type: 'info',
        title: '🧠 Your Brain Uses Tons of Energy',
        content:
          "Your brain is tiny but uses 20% of all your energy. After age 30, your brain starts getting tired. This isn't just \"getting old\" - it's something you can fix.",
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-800'
      },
      {
        id: 'main_problem',
        type: 'question',
        title: 'How do you feel right now?',
        options: [
          'My brain feels broken',
          "I don't feel like myself anymore",
          "I used to be smart, now I'm not",
          "I feel like I'm losing my mind",
          'My thoughts feel slow and muddy',
          'I feel mentally dead most days'
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
        id: 'medications',
        type: 'question',
        title: 'Do you take antidepressants?',
        subtitle: '(Important - some things don\'t mix well)',
        options: [
          'Yes, I take antidepressants',
          "No, I don't take any",
          "I'm not sure what I take",
          'I just stopped taking them'
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
        }, 1000);
      }
    }, 1500);
  };

  if (currentStep === 'hero') {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-20 h-20 bg-gray-400 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-sm mb-2">
              Get your assessment <span className="text-green-500 font-semibold">in just 2 minutes!</span>
            </p>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Struggling with brain fog and mental fatigue?
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              Get your personalized cognitive wellness assessment and discover what's really causing your symptoms - <span className="text-green-500 font-semibold">free analysis</span>.
            </h2>

            <button
              onClick={() => setCurrentStep('quiz')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 shadow-lg flex items-center mx-auto"
            >
              Start Assessment
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your expert for <span className="text-blue-600">cognitive wellness</span>.
            </h3>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-gray-300 rounded-full flex-shrink-0"></div>

              <div className="flex-1 text-center md:text-left">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Michael Chen</h4>
                <p className="text-blue-600 font-medium mb-4">Brain Wellness Specialist</p>
                <p className="text-gray-700 leading-relaxed">
                  Helping people optimize cognitive performance for over 10 years. Whether you're struggling with brain fog, memory issues, or mental fatigue, I'm here to guide you through understanding what's really happening and find the right solution for your specific situation.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={() => setCurrentStep('quiz')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 shadow-lg flex items-center mx-auto"
            >
              Get Assessment
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
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
    const userAvatar = figureOutAvatar();
    const severity = figureOutSeverity();

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-slide-up">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-4 animate-bounce-in">
                <svg className="w-4 h-4 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                YOUR BRAIN TEST RESULTS
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 animate-fade-in">Your Personal Recovery Plan</h1>
              <p className="text-gray-600 animate-fade-in-delayed">Based on your specific situation and symptoms</p>
            </div>

            {/* Severity Indicator */}
            <div className="mb-8 animate-fade-in-delayed">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-1000 ${
                      severity === 'VERY BAD'
                        ? 'bg-red-500 animate-pulse'
                        : severity === 'BAD'
                        ? 'bg-orange-400'
                        : 'bg-yellow-400'
                    }`}
                  >
                    <svg className="w-6 h-6 text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <div className="text-center">
                    <h2
                      className={`text-xl md:text-2xl font-bold animate-pulse ${
                        severity === 'VERY BAD'
                          ? 'text-red-500'
                          : severity === 'BAD'
                          ? 'text-orange-500'
                          : 'text-yellow-600'
                      }`}
                    >
                      {severity} BRAIN PROBLEM
                    </h2>
                    <p className="text-gray-600 text-sm animate-fade-in">
                      {severity === 'VERY BAD'
                        ? 'Urgent intervention needed'
                        : severity === 'BAD'
                        ? 'Serious but fixable'
                        : 'Manageable with right approach'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 text-center transform hover:scale-105 transition-all duration-300 animate-slide-in-left border border-red-200">
                  <div className="text-3xl font-bold text-red-600 mb-1 animate-counter">
                    {severity === 'VERY BAD' ? '14-21' : severity === 'BAD' ? '21-28' : '28-35'} days
                  </div>
                  <div className="text-sm text-gray-600">Expected recovery time</div>
                  <div className="w-full bg-red-200 rounded-full h-2 mt-2">
                    <div className="bg-red-500 h-2 rounded-full animate-fill-bar" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 text-center transform hover:scale-105 transition-all duration-300 animate-slide-in-up border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-1 animate-counter-delayed">
                    {severity === 'VERY BAD' ? '67%' : severity === 'BAD' ? '45%' : '23%'}
                  </div>
                  <div className="text-sm text-gray-600">Risk if untreated</div>
                  <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full animate-fill-bar-delayed"
                      style={{ width: `${severity === 'VERY BAD' ? '67%' : severity === 'BAD' ? '45%' : '23%'}` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 text-center transform hover:scale-105 transition-all duration-300 animate-slide-in-right border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-1 animate-counter-delayed-2">94%</div>
                  <div className="text-sm text-gray-600">Success rate with treatment</div>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full animate-fill-bar-delayed-2" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 animate-slide-in-up border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                How Your "Backup Generator" Works
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center animate-fade-in-1">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <span className="text-2xl animate-bounce">🔋</span>
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Your Problem</h4>
                  <p className="text-sm text-gray-600">Brain's power plants are failing</p>
                </div>

                <div className="text-center animate-fade-in-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <span className="text-2xl animate-bounce">⚡</span>
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">The Solution</h4>
                  <p className="text-sm text-gray-600">MB acts as backup generator</p>
                </div>

                <div className="text-center animate-fade-in-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <span className="text-2xl animate-bounce">🧠</span>
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">The Result</h4>
                  <p className="text-sm text-gray-600">Brain gets energy, fog lifts</p>
                </div>
              </div>
            </div>

            {/* Cover-Up */}
            <div className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-200 animate-slide-in-left">
              <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                <span className="animate-bounce mr-2">🏴‍☠️</span>
                The 150-Year Cover-Up
              </h3>
              <div className="space-y-2">
                <div className="flex items-center animate-fade-in-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                  <p className="text-red-700 text-sm"><strong>1876:</strong> Methylene Blue discovered, cured malaria & depression</p>
                </div>
                <div className="flex items-center animate-fade-in-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                  <p className="text-red-700 text-sm"><strong>Problem:</strong> Too cheap, can't be patented</p>
                </div>
                <div className="flex items-center animate-fade-in-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                  <p className="text-red-700 text-sm"><strong>2024:</strong> UK suddenly banned it when people started using it</p>
                </div>
                <div className="flex items-center animate-fade-in-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                  <p className="text-red-700 text-sm"><strong>Result:</strong> You suffer while they profit from expensive alternatives</p>
                </div>
              </div>
            </div>

            {/* Quality Warning */}
            <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-300 animate-slide-in-right">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 text-yellow-600 mr-2 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-yellow-800">73% of Online MB is FAKE</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="animate-fade-in-1">
                  <h4 className="font-medium text-red-600 mb-2 flex items-center">
                    <span className="animate-pulse mr-1">❌</span> Fake/Dangerous:
                  </h4>
                  <div className="space-y-1 text-sm text-red-600">
                    <p>• Industrial dye (not medical)</p>
                    <p>• Wrong concentrations</p>
                    <p>• Heavy metal contamination</p>
                    <p>• No safety testing</p>
                  </div>
                </div>
                <div className="animate-fade-in-2">
                  <h4 className="font-medium text-green-600 mb-2 flex items-center">
                    <span className="animate-pulse mr-1">✅</span> Real/Safe:
                  </h4>
                  <div className="space-y-1 text-sm text-green-600">
                    <p>• Pharmaceutical grade</p>
                    <p>• Hospital quality</p>
                    <p>• Lab tested purity</p>
                    <p>• USA manufactured</p>
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
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4 mb-6 animate-pulse border border-yellow-300">
                <p className="text-yellow-800 font-bold text-lg">
                  🕒 {severity === 'VERY BAD' ? 'TIME IS RUNNING OUT - Your brain needs help NOW' : 'Act while this is still reversible'}
                </p>
              </div>

              <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-bounce-in">
                ✅ YES - Get My Pharmaceutical-Grade Methylene Blue →
              </button>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 animate-fade-in border border-blue-200">
                <div className="flex items-center justify-center gap-4 text-sm text-blue-700">
                  <span className="flex items-center"><span className="animate-pulse mr-1">✓</span> Hospital Quality</span>
                  <span className="flex items-center"><span className="animate-pulse mr-1">✓</span> Third-Party Tested</span>
                  <span className="flex items-center"><span className="animate-pulse mr-1">✓</span> USA Made</span>
                  <span className="flex items-center"><span className="animate-pulse mr-1">✓</span> Money-Back Guarantee</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-600 font-medium py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                No thanks, I'll keep suffering while Big Pharma profits
              </button>

              <p className="text-sm text-gray-500 mt-4 animate-fade-in-delayed">💡 Join thousands who broke free from the medical system and got their lives back</p>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Question {questionIndex + 1} of {questions.length}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {currentQuestion.type === 'question' ? (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentQuestion.title}</h2>
                {currentQuestion.subtitle && <p className="text-gray-600 mb-6">{currentQuestion.subtitle}</p>}

                <div className="space-y-3">
                  {currentQuestion.options.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer((currentQuestion as any).id, option)}
                      className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
                    >
                      <span className="text-gray-800 font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className={`${(currentQuestion as any).bgColor} rounded-xl p-6 text-center`}>
                <h2 className={`text-xl font-bold ${(currentQuestion as any).textColor} mb-4`}>
                  {(currentQuestion as any).title}
                </h2>
                <p className={`${(currentQuestion as any).textColor} text-lg leading-relaxed mb-6`}>
                  {(currentQuestion as any).content}
                </p>
                <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                  Continue →
                </button>
              </div>
            )}
          </div>

          <div className="text-center mt-4">
            <button
              onClick={() => {
                if (questionIndex > 0) {
                  setQuestionIndex(questionIndex - 1);
                } else {
                  setCurrentStep('hero');
                }
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
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